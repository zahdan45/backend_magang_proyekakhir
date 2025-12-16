// src/features/areas/area.routes.ts
import { Router } from 'express';
import { getAreasStatus } from './area.service.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Areas
 *   description: API untuk mengelola status area gudang
 * /api/areas/status:
 *   get:
 *     summary: Mengambil status ringkasan dari semua area
 *     tags: [Areas]
 *     responses:
 *       '200':
 *         description: Status area berhasil diambil.
 */
router.get('/areas/status', async (req, res) => {
  try {
    // Ambil warehouseId dari query parameter (contoh: /api/areas/status?warehouseId=GUDANG-JKT)
    const { warehouseId } = req.query;
    const areas = await getAreasStatus(warehouseId as string | undefined);
    res.status(200).json({ status: 'success', data: areas });
  } catch {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

export default router;
