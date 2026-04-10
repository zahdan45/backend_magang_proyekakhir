import mqtt from 'mqtt';
import { Server } from 'socket.io';
import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from 'canvas'; 
import { PrismaClient } from '@prisma/client';
import * as tf from '@tensorflow/tfjs';

const TELEGRAM_TOKEN = '8299250751:AAEqwXknK0Q4I-sFIKK7Bj6joQpVSK6qbnE';
const TELEGRAM_CHAT_ID = '-5008875015';
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY; 
const LAT = '-6.496899'; 
const LON = '106.779999'; 

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: false, request: { timeout: 20000 } });

let client: mqtt.MqttClient;
let io: Server;
let prisma: PrismaClient;

let latestCamBuffer: Buffer | null = null; 
let lastCamReceiveTime = 0;

let latestThermalRaw: number[] = [];
let latestWaterRaw: number = 0;
let currentThreshold = 35;

let lastWaterAlertTime = 0;
let lastThermalAlertTime = 0;
const ALERT_COOLDOWN = 60 * 1000; 

let pendingAlert: { avg: number, max: number, reason: string, circle: any, type: string } | null = null;
let pendingAlertTimer: NodeJS.Timeout | null = null;

let deviceId: string | null = null;
const SAVE_INTERVAL = 60 * 1000;

let aiModel: tf.LayersModel | null = null;
let aiMeta: { min_temp: number, max_temp: number, anomaly_threshold: number } | null = null;

// =======================================================
// VARIABEL ANTI-NOISE (DEBOUNCE FILTER)
// =======================================================
let consecutiveAnomaly = 0;
let consecutiveOverheat = 0;
let consecutiveWaterHigh = 0;
const REQUIRED_TICKS = 3; // Harus 3 detik berturut-turut agar valid

let latestAiLoss: number | null = null;
let latestWeatherDesc: string = "Menunggu data cuaca...";

async function loadAutoencoder() {
    try {
        const modelDir = path.join(process.cwd(), 'ai_model');
        const modelPath = path.join(modelDir, 'model.json');
        const metaPath = path.join(modelDir, 'ai_metadata.json');
        
        if (fs.existsSync(metaPath)) {
            aiMeta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
        }
        const customLoader: tf.io.IOHandler = {
            load: async () => {
                const modelJson = JSON.parse(fs.readFileSync(modelPath, 'utf-8'));
                const weightsManifest = modelJson.weightsManifest;
                let weightSpecs: tf.io.WeightsManifestEntry[] = [];
                let weightBuffers: Buffer[] = [];
                for (const manifest of weightsManifest) {
                    weightSpecs = weightSpecs.concat(manifest.weights);
                    for (const filePath of manifest.paths) {
                        weightBuffers.push(fs.readFileSync(path.join(modelDir, filePath)));
                    }
                }
                const combinedBuffer = Buffer.concat(weightBuffers);
                return {
                    modelTopology: modelJson.modelTopology,
                    format: modelJson.format,
                    generatedBy: modelJson.generatedBy,
                    convertedBy: modelJson.convertedBy,
                    weightSpecs: weightSpecs,
                    weightData: new Uint8Array(combinedBuffer).buffer
                };
            }
        };
        aiModel = await tf.loadLayersModel(customLoader);
    } catch (e) { }
}

async function checkAiAnomaly(thermalData: number[]): Promise<{ isAnomaly: boolean, loss: number, circle?: any }> {
    if (!aiModel || !aiMeta) return { isAnomaly: false, loss: 0 }; 
    let range = aiMeta.max_temp - aiMeta.min_temp;
    if (range === 0) range = 1;

    const normalized = thermalData.map(temp => Math.max(0, Math.min(1, (temp - aiMeta!.min_temp) / range)));
    const inputTensor = tf.tensor(normalized).reshape([1, 24, 32, 1]);
    const reconstructed = aiModel.predict(inputTensor) as tf.Tensor;
    const absoluteErrors = tf.abs(tf.sub(inputTensor.flatten(), reconstructed.flatten()));
    const errorArray = await absoluteErrors.data(); 
    
    let totalSquaredError = 0;
    const squaredErrorArray: {error: number, index: number}[] = [];
    for (let i = 0; i < errorArray.length; i++) {
        const sqErr = Math.pow(errorArray[i], 2); 
        totalSquaredError += sqErr;
        squaredErrorArray.push({ error: sqErr, index: i });
    }

    const globalMSE = totalSquaredError / 768;
    squaredErrorArray.sort((a, b) => b.error - a.error);
    const topAnomalies = squaredErrorArray.slice(0, 30); 
    
    let sumX = 0, sumY = 0, minX = 32, maxX = 0, minY = 24, maxY = 0;
    topAnomalies.forEach(item => {
        const x = item.index % 32; const y = Math.floor(item.index / 32); 
        sumX += x; sumY += y;
        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
    });

    const centerX = sumX / 30; const centerY = sumY / 30;
    const radius = Math.max(maxX - minX, maxY - minY) / 2 + 1.5; 
    tf.dispose([inputTensor, reconstructed, absoluteErrors]);

    const isAnomaly = globalMSE > aiMeta.anomaly_threshold;
    return { isAnomaly, loss: globalMSE, circle: isAnomaly ? { cx: centerX, cy: centerY, r: radius } : null };
}

async function updateWeatherBackground() {
    if (!OPENWEATHER_API_KEY) return;
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=id`);
        if (response.ok) {
            const w = await response.json();
            if (w && w.weather && w.weather.length > 0) {
                latestWeatherDesc = `${w.main.temp}°C • ${w.weather[0].description} • ${w.name}`;
            }
        }
    } catch (error) { }
}

const updateThresholdFromFile = () => {
  try {
    const configPath = path.join(process.cwd(), 'config.json');
    if (fs.existsSync(configPath)) {
      const data = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      if (data.threshold) currentThreshold = data.threshold;
    }
  } catch (e) { }
};

const ensureDeviceExists = async () => {
    if (!prisma) return;
    try {
        let device = await prisma.device.findFirst({ where: { name: 'ESP32-Gudang-1' } });
        if (!device) {
            const area = await prisma.area.findFirst() || await prisma.area.create({ data: { name: 'Gudang Utama' }});
            device = await prisma.device.create({ data: { name: 'ESP32-Gudang-1', type: 'Microcontroller', status: 'online', areaId: area.id }});
        }
        deviceId = device.id;
    } catch (error) {}
};

const forceLogToDatabase = async (avgTemp: number, waterLvl: number) => {
    if (!prisma || !deviceId) return;
    const tempMin = latestThermalRaw.length > 0 ? Math.min(...latestThermalRaw) : 0;
    const tempMax = latestThermalRaw.length > 0 ? Math.max(...latestThermalRaw) : 0;
    
    try { 
        await (prisma.sensorLog as any).create({ 
            data: { 
                deviceId: deviceId, 
                temperature: parseFloat(avgTemp.toFixed(2)), 
                waterLevel: waterLvl,
                tempMin: parseFloat(tempMin.toFixed(2)),
                tempMax: parseFloat(tempMax.toFixed(2)),
                aiLoss: latestAiLoss,
                weather: latestWeatherDesc
            } 
        }); 
    } 
    catch (error) {}
};

const startDatabaseLogger = () => {
    setInterval(async () => {
        if (!prisma || !deviceId) return;
        let avgTemp = latestThermalRaw.length > 0 ? latestThermalRaw.reduce((a, b) => a + b, 0) / latestThermalRaw.length : 0;
        const tempMin = latestThermalRaw.length > 0 ? Math.min(...latestThermalRaw) : 0;
        const tempMax = latestThermalRaw.length > 0 ? Math.max(...latestThermalRaw) : 0;

        try {
            if (avgTemp > 0 || latestWaterRaw > 0) {
                await (prisma.sensorLog as any).create({ 
                    data: { 
                        deviceId: deviceId, 
                        temperature: parseFloat(avgTemp.toFixed(2)), 
                        waterLevel: latestWaterRaw,
                        tempMin: parseFloat(tempMin.toFixed(2)),
                        tempMax: parseFloat(tempMax.toFixed(2)),
                        aiLoss: latestAiLoss,
                        weather: latestWeatherDesc
                    }
                });
            }
        } catch (error) { }
    }, SAVE_INTERVAL); 
};

const generateThermalImage = (data: number[], circleData: any = null): Buffer | null => {
    try {
        const w = 32; const h = 24;
        const min = Math.min(...data); const max = Math.max(...data);
        const range = max - min || 1;
        const canvas = createCanvas(w, h); const ctx = canvas.getContext('2d');
        for (let i = 0; i < data.length; i++) {
            let normalized = Math.max(0, Math.min(1, (data[i] - min) / range));
            ctx.fillStyle = `hsl(${(1 - normalized) * 240}, 100%, 50%)`;
            ctx.fillRect((w - 1) - (i % w), Math.floor(i / w), 1, 1);
        }
        const scale = 20; 
        const bigCanvas = createCanvas(w * scale, h * scale); const bigCtx = bigCanvas.getContext('2d');
        bigCtx.imageSmoothingEnabled = false; bigCtx.drawImage(canvas, 0, 0, w * scale, h * scale);

        if (circleData && circleData.cx !== undefined) {
            bigCtx.beginPath();
            bigCtx.arc((31 - circleData.cx + 0.5) * scale, (circleData.cy + 0.5) * scale, circleData.r * scale, 0, 2 * Math.PI);
            bigCtx.lineWidth = 8; bigCtx.strokeStyle = 'red'; bigCtx.shadowColor = 'red'; bigCtx.shadowBlur = 15; bigCtx.stroke();
        }
        return bigCanvas.toBuffer('image/png');
    } catch (e) { return null; }
};

const processCameraImage = async (imgBuffer: Buffer): Promise<Buffer> => {
    try {
        const img = await loadImage(imgBuffer);
        const canvas = createCanvas(img.width, img.height); const ctx = canvas.getContext('2d');
        ctx.translate(img.width / 2, img.height / 2); ctx.rotate(Math.PI); ctx.drawImage(img, -img.width / 2, -img.height / 2);
        return canvas.toBuffer('image/jpeg');
    } catch (e) { return imgBuffer; }
};

export const setSocketIo = (socketIoInstance: Server) => { io = socketIoInstance; };

export function connectMqtt(prismaInstance: PrismaClient) {
  prisma = prismaInstance;
  updateThresholdFromFile(); ensureDeviceExists(); startDatabaseLogger(); loadAutoencoder(); 
  
  updateWeatherBackground();
  setInterval(updateWeatherBackground, 5 * 60 * 1000);

  const MQTT_HOST = "broker.emqx.io"; const MQTT_PORT = 1883;             
  const brokerUrl = `${MQTT_PORT === 8883 ? 'mqtts' : 'mqtt'}://${MQTT_HOST}:${MQTT_PORT}`;

  client = mqtt.connect(brokerUrl, { clientId: 'SynergyBackend_' + Math.random().toString(16).substring(2, 8), keepalive: 60, rejectUnauthorized: false });

  client.on('connect', () => {
    client.subscribe(['synergy/gudang1/cam', 'synergy/gudang1/thermal', 'synergy/gudang1/water', 'synergy/gudang1/threshold', 'synergy/gudang1/cmd']);
  });

  client.on('message', async (topic, payload) => {
    const messageStr = payload.toString();

    if (topic.includes('threshold')) currentThreshold = parseFloat(messageStr);

    if (topic.includes('cam')) {
      latestCamBuffer = Buffer.from(messageStr, 'base64');
      lastCamReceiveTime = Date.now();
      if (io) io.emit('stream-cam', messageStr);

      if (pendingAlert) {
          if (pendingAlertTimer) clearTimeout(pendingAlertTimer);
          sendThermalAlert(pendingAlert.avg, pendingAlert.max, pendingAlert.reason, pendingAlert.circle, pendingAlert.type);
          pendingAlert = null;
      }
    }

    if (topic.includes('thermal')) {
      try {
        const thermalData = JSON.parse(messageStr);
        latestThermalRaw = thermalData;

        if (Array.isArray(thermalData) && thermalData.length === 768) {
            const avg = thermalData.reduce((a, b) => a + b, 0) / thermalData.length;
            const max = Math.max(...thermalData);
            const aiResult = await checkAiAnomaly(thermalData);
            
            latestAiLoss = aiResult.loss; 
            if (io) io.emit('stream-thermal', { data: thermalData, loss: aiResult.loss });

            // LOGIKA DEBOUNCE FILTER (MENCEGAH NOISE/SPIKE SESAAT)
            if (aiResult.isAnomaly) consecutiveAnomaly++; else consecutiveAnomaly = 0;
            if (avg > currentThreshold) consecutiveOverheat++; else consecutiveOverheat = 0;

            const isRealAnomaly = consecutiveAnomaly >= REQUIRED_TICKS;
            const isRealOverheat = consecutiveOverheat >= REQUIRED_TICKS;

            if (Date.now() - lastThermalAlertTime > ALERT_COOLDOWN) {

                if (isRealAnomaly || isRealOverheat) {
                    let alertReason = "";
                    let alertType = "none";
                    
                    if (isRealAnomaly && isRealOverheat) {
                        alertReason = `🚨 *KRITIS: ANOMALI POLA & OVERHEAT!*\n(Loss: ${aiResult.loss.toFixed(5)} | Batas Suhu Terlampaui)`;
                        alertType = "both";
                    } else if (isRealAnomaly) {
                        alertReason = `🤖 *AI DETEKSI ANOMALI POLA!*\n(Pola panas asing dikenali, Loss: ${aiResult.loss.toFixed(5)})`;
                        alertType = "anomaly";
                    } else {
                        alertReason = `⚠️ *SUHU RATA-RATA MELEBIHI BATAS AMAN!*`;
                        alertType = "overheat";
                    }

                    forceLogToDatabase(avg, latestWaterRaw);

                    if (isRealOverheat) {
                        if (Date.now() - lastCamReceiveTime < 3000) {
                            sendThermalAlert(avg, max, alertReason, aiResult.circle, alertType);
                            lastThermalAlertTime = Date.now();
                        } else {
                            pendingAlert = { avg, max, reason: alertReason, circle: aiResult.circle, type: alertType };
                            if (pendingAlertTimer) clearTimeout(pendingAlertTimer);
                            pendingAlertTimer = setTimeout(() => {
                                if (pendingAlert) {
                                    sendThermalAlert(pendingAlert.avg, pendingAlert.max, pendingAlert.reason, pendingAlert.circle, pendingAlert.type);
                                    pendingAlert = null;
                                }
                            }, 4000);
                            lastThermalAlertTime = Date.now();
                        }
                    } else {
                        latestCamBuffer = null; 
                        client.publish('synergy/gudang1/cmd', 'take_pic');
                        
                        pendingAlert = { avg, max, reason: alertReason, circle: aiResult.circle, type: alertType };
                        if (pendingAlertTimer) clearTimeout(pendingAlertTimer);
                        pendingAlertTimer = setTimeout(() => {
                            if (pendingAlert) {
                                sendThermalAlert(pendingAlert.avg, pendingAlert.max, pendingAlert.reason, pendingAlert.circle, pendingAlert.type);
                                pendingAlert = null;
                            }
                        }, 5000);
                        lastThermalAlertTime = Date.now();
                    }

                    // Reset counter setelah mengirim alarm agar butuh 3 detik lagi untuk alarm berikutnya (meski terhalang cooldown)
                    consecutiveAnomaly = 0;
                    consecutiveOverheat = 0;
                }
            }
        }
      } catch (e) { }
    }

    if (topic.includes('water')) {
      if (io) io.emit('stream-water', messageStr);
      const rawValue = parseInt(messageStr);
      latestWaterRaw = isNaN(rawValue) ? 0 : rawValue;

      // LOGIKA DEBOUNCE UNTUK AIR (MENCEGAH SPIKE ANALOG)
      if (rawValue > 550) {
          consecutiveWaterHigh++;
          if (consecutiveWaterHigh >= REQUIRED_TICKS && (Date.now() - lastWaterAlertTime > ALERT_COOLDOWN)) {
              sendWaterAlert(rawValue); 
              forceLogToDatabase(latestThermalRaw.length > 0 ? latestThermalRaw.reduce((a,b)=>a+b,0)/latestThermalRaw.length : 0, rawValue);
              lastWaterAlertTime = Date.now();
              consecutiveWaterHigh = 0; // Reset setelah terkirim
          }
      } else {
          consecutiveWaterHigh = 0; // Reset jika nilai air turun normal
      }
    }
  });
}

async function sendThermalAlert(avg: number, max: number, reason: string, circle: any = null, type: string = "none") {
    const captionText = `${reason}\n\n🌡️ *Rata-rata Suhu:* ${avg.toFixed(1)}°C\n🔥 *Suhu Maksimal:* ${max.toFixed(1)}°C\n⚙️ *Batas Suhu Maksimal:* ${currentThreshold}°C\n\n🚨 _Segera periksa lokasi untuk mencegah kerusakan aset!_`;
    
    if (io) {
        io.emit('alert-thermal', { 
            timestamp: Date.now(), 
            reason: reason.replace(/\*/g, '').replace(/\n/g, ' - '), 
            avg: avg.toFixed(1), 
            camImage: latestCamBuffer ? `data:image/jpeg;base64,${latestCamBuffer.toString('base64')}` : null, 
            thermalData: [...latestThermalRaw], 
            circle: circle,
            alertType: type 
        });
    }

    try {
        let thermalSent = false;
        if (latestThermalRaw.length > 0) {
            try {
                const thermalImg = generateThermalImage(latestThermalRaw, circle);
                if (thermalImg) {
                    await bot.sendPhoto(TELEGRAM_CHAT_ID, thermalImg, { caption: captionText, parse_mode: 'Markdown' }, { filename: 'thermal.png', contentType: 'image/png' });
                    thermalSent = true;
                }
            } catch (e) {}
        }
        if (latestCamBuffer) {
            try {
                const finalCamImage = await processCameraImage(latestCamBuffer);
                await bot.sendPhoto(TELEGRAM_CHAT_ID, finalCamImage, { caption: "📷 *Snapshot Lensa Visual OV2640*", parse_mode: 'Markdown' }, { filename: 'camera.jpg', contentType: 'image/jpeg' });
            } catch (e) {}
        }
        if (!thermalSent) await bot.sendMessage(TELEGRAM_CHAT_ID, captionText, { parse_mode: 'Markdown' });
    } catch (e) {}
}

async function sendWaterAlert(raw: number) {
    let weatherCondition = latestWeatherDesc;
    let cause = "Kebocoran Pipa / Sumber Internal";
    
    if (weatherCondition.toLowerCase().includes('hujan') || weatherCondition.toLowerCase().includes('rain')) {
        cause = "⚠️ Kebocoran Atap / Rembesan (Indikasi Cuaca Hujan)";
    }

    if (io) io.emit('alert-water', { timestamp: Date.now(), raw: raw, weatherCondition: weatherCondition, cause: cause });

    const message = `💧 *PERINGATAN GENANGAN AIR!*\n\nStatus: *Terdeteksi Basah*\nNilai Raw Sensor: *${raw}* (Aman < 550)\nKondisi Cuaca Terkini: *${weatherCondition}*\n\n🔍 *Analisis Decision Tree:*\n*${cause}*\n\n⚠️ _Periksa lantai gudang untuk mengamankan aset!_`;
    try { await bot.sendMessage(TELEGRAM_CHAT_ID, message, { parse_mode: 'Markdown' }); } catch (error) {}
}

export const publishThreshold = (value: number) => {
  if (client && client.connected) { currentThreshold = value; client.publish('synergy/gudang1/threshold', value.toString(), { retain: true }); return true; }
  return false;
};