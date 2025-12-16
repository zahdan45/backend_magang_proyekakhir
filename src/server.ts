import 'dotenv/config'; 
import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';

// Fix Import
import { PrismaClient } from '@prisma/client';

// Import Routes
import incidentRoutes from './features/incidents/incident.routes.js';
import deviceRoutes from './features/devices/device.routes.js';
import areaRoutes from './features/areas/area.routes.js';

// Core
import { connectMqtt, setSocketIo, publishThreshold } from './core/mqtt-client.js';

const prisma = new PrismaClient();

// Fix BigInt JSON
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(BigInt.prototype as any).toJSON = function () { return this.toString(); };

const app = express();
const port = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: { 
    origin: process.env.CLIENT_URL || "http://localhost:3000", 
    methods: ["GET", "POST"] 
  }
});

setSocketIo(io); 

app.use(cors()); 
app.use(express.json());
app.use(morgan('dev'));

// --- LOGIKA PENYIMPANAN FILE (PERSISTENCE) ---
const CONFIG_FILE = path.join(process.cwd(), 'config.json');

const getStoredThreshold = (): number => {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
      const json = JSON.parse(data);
      return json.threshold !== undefined ? json.threshold : 35;
    }
  } catch (err) {
    console.error("Gagal baca config, default 35.");
  }
  return 35;
};

const saveThresholdToFile = (val: number) => {
  try {
    const currentConfig = fs.existsSync(CONFIG_FILE) ? JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8')) : {};
    currentConfig.threshold = val;
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(currentConfig, null, 2));
    console.log(`💾 Config saved: Threshold = ${val}`);
  } catch (err) {
    console.error("Gagal simpan config:", err);
  }
};

const swaggerDefinition = {
  openapi: '3.0.0',
  info: { title: 'Synergy API', version: '1.0.0' },
};
const options = { swaggerDefinition, apis: ['./src/features/**/*.routes.ts'] };
const swaggerSpec = swaggerJSDoc(options);

// ================= ROUTES =================

app.get('/api/health', async (_req, res) => {
  return res.status(200).json({ status: 'ok', message: 'Backend Ready' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- API THRESHOLD ---
app.get('/api/get-threshold', (_req, res) => {
  const current = getStoredThreshold();
  return res.json({ threshold: current });
});

// KITA HAPUS MIDDLEWARE 'protect' AGAR TIDAK ERROR 'prisma.user'
app.post('/api/set-threshold', async (req: Request, res: Response) => {
  const { threshold } = req.body;
  if (!threshold && threshold !== 0) return res.status(400).json({ message: 'Value required' });

  try {
    const val = parseFloat(threshold);
    publishThreshold(val);    
    saveThresholdToFile(val); 
    return res.json({ success: true, message: `Threshold: ${val}°C` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// --- STANDARD ROUTES ---
// Hapus 'protect' dari sini juga jika Anda tidak pakai tabel User lagi
app.use('/api', deviceRoutes);
app.use('/api', incidentRoutes);
app.use('/api', areaRoutes);

app.get('/', (_req, res) => {
  return res.json({ message: 'Synergy Backend Running' });
});

server.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
  connectMqtt();
  
  const lastThreshold = getStoredThreshold();
  setTimeout(() => {
    console.log(`🔄 Restore Threshold: ${lastThreshold}°C`);
    publishThreshold(lastThreshold);
  }, 3000);
});