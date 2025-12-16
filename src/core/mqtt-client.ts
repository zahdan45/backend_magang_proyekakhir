import mqtt from 'mqtt';
import { Server } from 'socket.io';
import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';
import path from 'path';
// Import loadImage juga untuk membaca gambar kamera
import { createCanvas, loadImage } from 'canvas'; 

// --- KONFIGURASI TELEGRAM ---
const TELEGRAM_TOKEN = '8299250751:AAEqwXknK0Q4I-sFIKK7Bj6joQpVSK6qbnE';
const TELEGRAM_CHAT_ID = '-5008875015'; 

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: false });

// --- VARIABEL GLOBAL ---
let client: mqtt.MqttClient;
let io: Server;

// Simpan Data Terakhir (Raw Buffer dari MQTT)
let latestCamBuffer: Buffer | null = null; 
let latestThermalRaw: number[] = [];
let currentThreshold = 35;

// Cooldown
let lastWaterAlertTime = 0;
let lastThermalAlertTime = 0;
const ALERT_COOLDOWN = 60 * 1000; 

// --- BACA CONFIG ---
const updateThresholdFromFile = () => {
  try {
    const configPath = path.join(process.cwd(), 'config.json');
    if (fs.existsSync(configPath)) {
      const data = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      if (data.threshold) currentThreshold = data.threshold;
    }
  } catch (e) { console.error("Gagal baca config"); }
};

// --- FUNGSI 1: GENERATE GAMBAR THERMAL (HEATMAP) ---
const generateThermalImage = (data: number[]): Buffer => {
    const w = 32;
    const h = 24;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const canvas = createCanvas(w, h);
    const ctx = canvas.getContext('2d');

    for (let i = 0; i < data.length; i++) {
        const val = data[i];
        let normalized = (val - min) / range;
        normalized = Math.max(0, Math.min(1, normalized));
        const hue = (1 - normalized) * 240; 
        
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        const x = i % w;
        const y = Math.floor(i / w);
        ctx.fillRect(x, y, 1, 1);
    }

    const scale = 20; 
    const bigCanvas = createCanvas(w * scale, h * scale);
    const bigCtx = bigCanvas.getContext('2d');
    bigCtx.imageSmoothingEnabled = false; 
    bigCtx.drawImage(canvas, 0, 0, w * scale, h * scale);

    return bigCanvas.toBuffer('image/png');
};

// --- FUNGSI 2: ROTATE & MIRROR GAMBAR KAMERA ---
const processCameraImage = async (imgBuffer: Buffer): Promise<Buffer> => {
    try {
        // 1. Load Gambar dari Buffer
        const img = await loadImage(imgBuffer);
        
        // 2. Buat Canvas Seukuran Gambar
        const canvas = createCanvas(img.width, img.height);
        const ctx = canvas.getContext('2d');

        // 3. Pindahkan titik pusat ke tengah canvas
        ctx.translate(img.width / 2, img.height / 2);

        // 4. ROTATE 180 Derajat
        ctx.rotate(Math.PI); 

        // 5. MIRROR (Flip Horizontal) -> Scale X = -1
        ctx.scale(-1, 1); 

        // 6. Gambar Image (Offset -width/2 karena titik pusat sudah digeser)
        ctx.drawImage(img, -img.width / 2, -img.height / 2);

        // 7. Kembalikan Buffer JPEG
        return canvas.toBuffer('image/jpeg');
    } catch (e) {
        console.error("Gagal memproses gambar kamera:", e);
        return imgBuffer; // Jika gagal, kirim gambar asli saja
    }
};

export const setSocketIo = (socketIoInstance: Server) => { io = socketIoInstance; };

export function connectMqtt() {
  updateThresholdFromFile();
  const brokerUrl = process.env.MQTT_BROKER_URL || 'mqtt://broker.emqx.io';
  console.log(`🔌 Connecting to MQTT Broker...`);

  client = mqtt.connect(brokerUrl);

  client.on('connect', () => {
    console.log('✅ Connected to MQTT Broker');
    client.subscribe('synergy/gudang1/cam');
    client.subscribe('synergy/gudang1/thermal');
    client.subscribe('synergy/gudang1/water');
    client.subscribe('synergy/gudang1/threshold');
  });

  client.on('message', (topic, payload) => {
    const messageStr = payload.toString();

    if (topic.includes('threshold')) {
       currentThreshold = parseFloat(messageStr);
    }

    if (topic.includes('cam')) {
      // Simpan Buffer Asli (Belum diedit) untuk efisiensi server
      // Kita edit nanti HANYA SAAT mau kirim alert
      latestCamBuffer = Buffer.from(messageStr, 'base64');
      if (io) io.emit('stream-cam', messageStr);
    }

    if (topic.includes('thermal')) {
      try {
        const thermalData = JSON.parse(messageStr);
        if (io) io.emit('stream-thermal', thermalData);
        latestThermalRaw = thermalData;

        if (Array.isArray(thermalData) && thermalData.length > 0) {
            const avg = thermalData.reduce((a: number, b: number) => a + b, 0) / thermalData.length;
            const max = Math.max(...thermalData);

            if (avg > currentThreshold && (Date.now() - lastThermalAlertTime > ALERT_COOLDOWN)) {
                sendThermalAlert(avg, max);
                lastThermalAlertTime = Date.now();
            }
        }
      } catch (e) { }
    }

    if (topic.includes('water')) {
      if (io) io.emit('stream-water', messageStr);
      const rawValue = parseInt(messageStr);
      if (rawValue > 500 && (Date.now() - lastWaterAlertTime > ALERT_COOLDOWN)) {
          const mm = ((rawValue - 500) * 48 / 3595).toFixed(1);
          sendWaterAlert(rawValue, mm);
          lastWaterAlertTime = Date.now();
      }
    }
  });
}

// --- SEND ALERT ---
async function sendThermalAlert(avg: number, max: number) {
    console.log("🔥 SUHU TINGGI! Memproses Gambar & Kirim Telegram...");

    const captionText = `
🔥 *PERINGATAN SUHU TINGGI!*

Rata-rata: *${avg.toFixed(1)}°C*
Maksimal: *${max.toFixed(1)}°C*
Batas Aman: ${currentThreshold}°C

⚠️ _Segera periksa lokasi!_
`;

    try {
        // A. PROSES GAMBAR VISUAL (Rotate & Mirror)
        let finalCamImage = latestCamBuffer;
        if (latestCamBuffer) {
            // Proses gambar (Rotate 180 + Mirror)
            finalCamImage = await processCameraImage(latestCamBuffer);
        }

        // B. KIRIM FOTO VISUAL (YANG SUDAH DI-ROTATE)
        if (finalCamImage) {
            await bot.sendPhoto(TELEGRAM_CHAT_ID, finalCamImage, { 
                caption: captionText, 
                parse_mode: 'Markdown' 
            });
        } else {
            await bot.sendMessage(TELEGRAM_CHAT_ID, captionText, { parse_mode: 'Markdown' });
        }

        // C. KIRIM FOTO HEATMAP (Generated)
        let thermalImageBuffer: Buffer | null = null;
        if (latestThermalRaw.length > 0) {
            thermalImageBuffer = generateThermalImage(latestThermalRaw);
            if (thermalImageBuffer) {
                await bot.sendPhoto(TELEGRAM_CHAT_ID, thermalImageBuffer, { 
                    caption: "🌡️ *Pencitraan Thermal (Heatmap)*", 
                    parse_mode: 'Markdown' 
                });
            }
        }

        console.log("✅ Laporan Lengkap Terkirim ke Telegram!");
        
    } catch (error: any) {
        console.error("❌ Telegram Error:", error.message);
    }
}

async function sendWaterAlert(raw: number, mm: string) {
    const message = `💧 *PERINGATAN GENANGAN AIR!* ... (Isi pesan sama) ...`;
    try {
        await bot.sendMessage(TELEGRAM_CHAT_ID, message, { parse_mode: 'Markdown' });
        console.log("📨 Telegram: Water Alert Sent");
    } catch (error) { console.error("Telegram Error:", error); }
}

export const publishThreshold = (value: number) => {
  if (client && client.connected) {
    currentThreshold = value;
    client.publish('synergy/gudang1/threshold', value.toString(), { retain: true });
    return true;
  }
  return false;
};