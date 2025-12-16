// src/features/incidents/incident.routes.ts
import { Router, Request, Response } from 'express';
import {
  getAllIncidents,
  createIncident,
  clearIncident,
  getIncidentStatsForChart,
  getIncidentsSummary,
} from './incident.service.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Incidents
 *   description: API untuk mengelola data insiden
 *
 * /api/incidents:
 *   get:
 *     summary: Mengambil semua data insiden
 *     description: Mengembalikan daftar semua insiden yang telah tercatat, diurutkan dari yang terbaru.
 *     tags: [Incidents]
 *     responses:
 *       '200':
 *         description: Daftar insiden berhasil diambil.
 *   post:
 *     summary: Membuat catatan insiden baru
 *     description: Menerima data sensor dan membuat catatan insiden baru di database.
 *     tags: [Incidents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               incident_type:
 *                 type: string
 *                 example: "IMPACT"
 *               source_device_id:
 *                 type: string
 *                 example: "ESP32-Warehouse-A1"
 *               data:
 *                 type: object
 *                 example: {"accX": 0.5, "mic_level": 850}
 *     responses:
 *       '201':
 *         description: Insiden berhasil dibuat.
 *
 * /api/incidents/summary:
 *   get:
 *     summary: Mengambil data ringkasan insiden
 *     tags: [Incidents]
 *     responses:
 *       '200':
 *         description: Data ringkasan berhasil diambil.
 *
 * /api/incidents/stats/chart:
 *   get:
 *     summary: Mengambil data statistik insiden untuk grafik
 *     description: Mengembalikan data insiden yang sudah diagregasi untuk 24 jam terakhir.
 *     tags: [Incidents]
 *     responses:
 *       '200':
 *         description: Data berhasil diambil.
 *
 * /api/incidents/{id}/clear:
 *   patch:
 *     summary: Menandai sebuah insiden sebagai selesai (cleared)
 *     description: Mengubah status 'is_cleared' dari sebuah insiden menjadi true.
 *     tags: [Incidents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID unik dari insiden.
 *     responses:
 *       '200':
 *         description: Insiden berhasil diperbarui.
 *       '404':
 *         description: Insiden tidak ditemukan.
 */

// Routes
router.get('/incidents', async (req, res) => {
  try {
    const { locationArea } = req.query;
    const incidents = await getAllIncidents(locationArea as string | undefined);
    res.status(200).json({ status: 'success', data: incidents });
  } catch {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

router.post('/incidents', async (req: Request, res: Response) => {
  try {
    const newIncidentData = req.body;
    if (!newIncidentData.incident_type || !newIncidentData.source_device_id) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Missing required fields' });
    }
    const createdIncident = await createIncident(newIncidentData);
    return res.status(201).json({ status: 'success', data: createdIncident });
  } catch (error) {
    console.error('ERROR creating incident:', error);
    return res
      .status(500)
      .json({ status: 'error', message: 'Internal Server Error' });
  }
});

router.get('/incidents/summary', async (req, res) => {
  try {
    const { locationArea } = req.query;
    const summary = await getIncidentsSummary(
      locationArea as string | undefined
    );
    res.status(200).json({ status: 'success', data: summary });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

router.get('/incidents/stats/chart', async (req, res) => {
  try {
    const { locationArea } = req.query;
    const chartData = await getIncidentStatsForChart(
      locationArea as string | undefined
    );
    res.status(200).json({ status: 'success', data: chartData });
  } catch (error) {
    console.error('Error fetching chart stats:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

router.patch('/incidents/:id/clear', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedIncident = await clearIncident(id);
    res.status(200).json({ status: 'success', data: updatedIncident });
  } catch (error) {
    res.status(404).json({ status: 'error', message: 'Incident not found' });
  }
});

export default router;
