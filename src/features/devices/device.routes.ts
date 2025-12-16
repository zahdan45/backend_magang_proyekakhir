// src/features/devices/device.routes.ts
import { Router } from 'express';
import {
  getAllDevices,
  createDevice,
  updateDevice,
  deleteDevice,
} from './device.service.js';
import { checkRole } from '../../middleware/auth.middleware.js';

const router = Router();
const adminRoles = ['admin', 'super_admin'];

/**
 * @swagger
 * tags:
 *   - name: Devices
 *     description: API untuk mengelola data perangkat sensor
 * paths:
 *    /api/devices:
 *     get:
 *       summary: Mengambil semua data perangkat
 *       tags: [Devices]
 *       responses:
 *         '200':
 *           description: Daftar perangkat berhasil diambil.
 *     post:
 *       summary: Mendaftarkan perangkat baru
 *       tags: [Devices]
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
 *                 location_area:
 *                   type: string
 *                 warehouse_id:
 *                   type: string
 *       responses:
 *         '201':
 *           description: Perangkat berhasil dibuat.
 *         '403':
 *           description: Tidak memiliki izin yang cukup.
 *    /api/devices/{id}:
 *     patch:
 *       summary: Memperbarui data perangkat
 *       tags: [Devices]
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
 *                 location_area:
 *                   type: string
 *       responses:
 *         '200':
 *           description: Perangkat berhasil diperbarui.
 *         '403':
 *           description: Tidak memiliki izin yang cukup.
 *     delete:
 *       summary: Menghapus sebuah perangkat
 *       tags: [Devices]
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
 *           description: Perangkat berhasil dihapus.
 *         '403':
 *           description: Tidak memiliki izin yang cukup.
 */

// GET all devices - bisa diakses semua pengguna yang login
router.get('/devices', async (_req, res) => {
  try {
    const devices = await getAllDevices();
    res.status(200).json({ status: 'success', data: devices });
  } catch {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

// POST a new device - hanya untuk admin & super_admin
router.post('/devices', checkRole(adminRoles), async (req, res) => {
  try {
    const newDevice = await createDevice(req.body);
    res.status(201).json({ status: 'success', data: newDevice });
  } catch (error) {
    res
      .status(400)
      .json({ status: 'error', message: (error as Error).message });
  }
});

// PATCH an existing device - hanya untuk admin & super_admin
router.patch('/devices/:id', checkRole(adminRoles), async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDevice = await updateDevice(id, req.body);
    res.status(200).json({ status: 'success', data: updatedDevice });
  } catch (error) {
    res
      .status(404)
      .json({ status: 'error', message: (error as Error).message });
  }
});

// DELETE a device - hanya untuk admin & super_admin
router.delete('/devices/:id', checkRole(adminRoles), async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteDevice(id);
    res.status(200).json({ status: 'success', data: result });
  } catch (error) {
    res
      .status(404)
      .json({ status: 'error', message: (error as Error).message });
  }
});

export default router;
