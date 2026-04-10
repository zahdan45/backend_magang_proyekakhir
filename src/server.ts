import express from 'express';
import http from 'http'; 
import { Server } from 'socket.io';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { connectMqtt, setSocketIo, publishThreshold } from './core/mqtt-client'; 

const app = express();
const prisma = new PrismaClient();

app.use(cors({ origin: '*' })); 
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
  path: '/socket.io' 
});

setSocketIo(io);

io.on('connection', (socket) => {
  console.log('✅ Client Frontend Connected:', socket.id);
  socket.on('disconnect', () => console.log('❌ Client Disconnected:', socket.id));
});

app.get('/api/test', (req, res) => res.json({ message: "Backend Online & Ready!" }));

app.post('/api/set-threshold', (req, res) => {
  const { threshold } = req.body;
  if (threshold) {
    publishThreshold(parseFloat(threshold));
    res.json({ status: 'OK', threshold });
  } else {
    res.status(400).json({ error: 'Invalid threshold' });
  }
});

app.get('/api/get-threshold', (req, res) => {
    const fs = require('fs');
    const path = require('path');
    try {
        const configPath = path.join(process.cwd(), 'config.json');
        if (fs.existsSync(configPath)) {
             const data = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
             res.json({ threshold: data.threshold });
        } else {
             res.json({ threshold: 35 });
        }
    } catch(e) { res.json({ threshold: 35 }); }
});

// ==========================================================
// API HISTORY DENGAN FITUR "DETEKSI SENSOR MATI" & FULL DATA
// ==========================================================
app.get('/api/history', async (req, res) => {
    try {
        const { start, end } = req.query;
        if (!start || !end) return res.status(400).json({ error: 'Start and end dates are required' });

        const startDate = new Date(start as string);
        const endDate = new Date(end as string);

        const logs = await prisma.sensorLog.findMany({
            where: { createdAt: { gte: startDate, lte: endDate } },
            orderBy: { createdAt: 'asc' }
        });

        const MAX_POINTS = 500;
        const GAP_THRESHOLD = 5 * 60 * 1000; // 5 Menit tidak ada data = Putus!
        let downsampled = [];
        let lastTimestamp = 0;

        if (logs.length > MAX_POINTS) {
            const step = Math.ceil(logs.length / MAX_POINTS);
            for (let i = 0; i < logs.length; i += step) {
                const chunk = logs.slice(i, i + step);
                const avgTemp = chunk.reduce((sum, log) => sum + (log.temperature || 0), 0) / chunk.length;
                const avgWater = chunk.reduce((sum, log) => sum + (log.waterLevel || 0), 0) / chunk.length;
                
                // Ambil nilai cuaca dan loss dari titik tengah chunk
                const midLog = chunk[Math.floor(chunk.length / 2)];
                const currentTimestamp = new Date(midLog.createdAt).getTime();

                // JIKA ADA JARAK LEBIH DARI 5 MENIT, SELIPKAN NILAI NULL
                if (lastTimestamp > 0 && (currentTimestamp - lastTimestamp > GAP_THRESHOLD)) {
                    downsampled.push({ 
                        timestamp: lastTimestamp + 1000, 
                        temperature: null, waterLevel: null, 
                        tempMin: null, tempMax: null, aiLoss: null, weather: null 
                    });
                }

                downsampled.push({
                    timestamp: currentTimestamp,
                    temperature: parseFloat(avgTemp.toFixed(2)),
                    waterLevel: Math.round(avgWater),
                    // ==========================================
                    // DATA BARU DITAMBAHKAN KE DOWNSAMPLING
                    // ==========================================
                    tempMin: midLog.tempMin,
                    tempMax: midLog.tempMax,
                    aiLoss: midLog.aiLoss,
                    weather: midLog.weather
                });
                lastTimestamp = currentTimestamp;
            }
        } else {
            for (const log of logs) {
                const currentTimestamp = new Date(log.createdAt).getTime();
                
                // JIKA ADA JARAK LEBIH DARI 5 MENIT, SELIPKAN NILAI NULL
                if (lastTimestamp > 0 && (currentTimestamp - lastTimestamp > GAP_THRESHOLD)) {
                    downsampled.push({ 
                        timestamp: lastTimestamp + 1000, 
                        temperature: null, waterLevel: null,
                        tempMin: null, tempMax: null, aiLoss: null, weather: null
                    });
                }

                downsampled.push({
                    timestamp: currentTimestamp,
                    temperature: log.temperature,
                    waterLevel: log.waterLevel,
                    // ==========================================
                    // DATA BARU DITAMBAHKAN KE REGULAR LOOP
                    // ==========================================
                    tempMin: log.tempMin,
                    tempMax: log.tempMax,
                    aiLoss: log.aiLoss,
                    weather: log.weather
                });
                lastTimestamp = currentTimestamp;
            }
        }

        res.json(downsampled);
    } catch (error) {
        console.error("❌ Error fetching history:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

connectMqtt(prisma);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server berjalan di port ${PORT}`);
  console.log(`📡 Socket.IO siap di path /socket.io`);
});