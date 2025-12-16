// src/features/warehouses/warehouse.routes.ts
import { Router } from 'express';
import {
  getAllWarehouses,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
  getWarehousesSummary,
} from './warehouse.service.js';
import { checkRole } from '../../middleware/auth.middleware.js';

const router = Router();
const adminRoles = ['admin', 'super_admin'];

/**
 * @swagger
 * tags:
 *   - name: Warehouses
 *     description: API untuk mengelola data gudang
 * paths:
 *    /api/warehouses/summary:
 *     get:
 *      summary:  Mengambil ringkasan status semua gudang
 *      tags:  [Warehouses]
 *      responses:
 *        '200':
 *          description:  Ringkasan status berhasil diambil.
 *    /api/warehouses:
 *     get:
 *       summary: Mengambil semua data gudang
 *       tags: [Warehouses]
 *       responses:
 *         '200':
 *           description: Daftar gudang berhasil diambil.
 *     post:
 *       summary: Mendaftarkan gudang baru
 *       tags: [Warehouses]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 location:
 *                   type: string
 *       responses:
 *         '201':
 *           description: Gudang berhasil dibuat.
 *         '403':
 *           description: Tidak memiliki izin yang cukup.
 *    /api/warehouses/{id}:
 *     patch:
 *       summary: Memperbarui data gudang
 *       tags: [Warehouses]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 location:
 *                   type: string
 *       responses:
 *         '200':
 *           description: Gudang berhasil diperbarui.
 *         '403':
 *           description: Tidak memiliki izin yang cukup.
 *     delete:
 *       summary: Menghapus sebuah gudang
 *       tags: [Warehouses]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Gudang berhasil dihapus.
 *         '403':
 *           description: Tidak memiliki izin yang cukup.
 */

// Endpoint GET ini bisa diakses semua pengguna yang login
router.get('/warehouses', async (_req, res) => {
  try {
    const data = await getAllWarehouses();
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

// PENTING: Definisi rute spesifik '/warehouses/summary' harus SEBELUM rute dengan parameter '/:id'
router.get('/warehouses/summary', async (_req, res) => {
  try {
    const data = await getWarehousesSummary();
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    console.error('ERROR in /api/warehouses/summary:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

// Endpoint di bawah ini HANYA untuk admin & super_admin
router.post('/warehouses', checkRole(adminRoles), async (req, res) => {
  try {
    const data = await createWarehouse(req.body);
    res.status(201).json({ status: 'success', data });
  } catch (error) {
    res
      .status(400)
      .json({ status: 'error', message: (error as Error).message });
  }
});

router.patch('/warehouses/:id', checkRole(adminRoles), async (req, res) => {
  try {
    const { id } = req.params;
    const data = await updateWarehouse(id, req.body);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res
      .status(404)
      .json({ status: 'error', message: (error as Error).message });
  }
});

router.delete('/warehouses/:id', checkRole(adminRoles), async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteWarehouse(id);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res
      .status(404)
      .json({ status: 'error', message: (error as Error).message });
  }
});

export default router;
