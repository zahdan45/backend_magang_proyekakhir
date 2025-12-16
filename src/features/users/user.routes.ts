import { Router, Request, Response } from 'express';
import { User } from '@supabase/supabase-js';
import {
  getAllUsers,
  deleteUserById,
  createUser,
  updateUser,
  UserCreationData,
  UserUpdateData,
} from './user.service.js';
import { checkRole } from '../../middleware/auth.middleware.js';

const router = Router();

// Tipe kustom untuk menambahkan properti 'user' ke objek Request
interface AuthenticatedRequest extends Request {
  user?: User;
}

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: API untuk mengelola pengguna
 * paths:
 *   /api/users:
 *     get:
 *       summary: Mengambil semua pengguna terdaftar
 *       tags: [Users]
 *       description: Mengambil daftar pengguna berdasarkan peran peminta. Admin tidak dapat melihat super_admin.
 *       responses:
 *         '200':
 *           description: Daftar pengguna berhasil diambil.
 *     post:
 *       summary: Membuat pengguna baru
 *       tags: [Users]
 *       description: Hanya bisa diakses oleh admin atau super_admin. Hanya super_admin yang bisa membuat super_admin lain.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 app_metadata:
 *                   type: object
 *                   properties:
 *                     roles:
 *                       type: array
 *                       items:
 *                         type: string
 *       responses:
 *         '201':
 *           description: Pengguna berhasil dibuat.
 *         '403':
 *           description: Tidak punya izin.
 *   /api/users/{id}:
 *     delete:
 *       summary: Menghapus seorang pengguna (khusus super_admin)
 *       tags: [Users]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: UUID dari pengguna yang akan dihapus.
 *       responses:
 *         '200':
 *           description: Pengguna berhasil dihapus.
 *         '403':
 *           description: Akses ditolak, hanya super_admin yang diizinkan.
 *         '404':
 *           description: Pengguna tidak ditemukan.
 *     patch:
 *       summary: Memperbarui data pengguna
 *       tags: [Users]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: UUID dari pengguna yang akan diubah.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 app_metadata:
 *                   type: object
 *                   properties:
 *                     roles:
 *                       type: array
 *                       items:
 *                         type: string
 *       responses:
 *         '200':
 *           description: Pengguna berhasil diperbarui.
 *         '403':
 *           description: Tidak punya izin.
 *         '404':
 *           description: Pengguna target tidak ditemukan.
 */

router.get('/users', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const currentUser = req.user; // Dapatkan user dari middleware 'protect'
    if (!currentUser) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required',
      });
    }

    // Teruskan query params dari URL (untuk pagination di masa depan) dan currentUser ke service
    const users = await getAllUsers(currentUser);
    return res.status(200).json({ status: 'success', data: users });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: (error as Error).message || 'Internal Server Error',
    });
  }
});

router.post(
  '/users',
  checkRole(['admin', 'super_admin']),
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const currentUser = req.user;
      if (!currentUser) {
        res.status(401).json({
          status: 'error',
          message: 'Authentication required',
        });
        return;
      }

      const userData: UserCreationData = req.body;
      const newUser = await createUser(currentUser, userData);
      res.status(201).json({ status: 'success', data: newUser });
    } catch (error) {
      // Jika error karena 'Forbidden', kirim status 403
      if ((error as Error).message.includes('Forbidden')) {
        res
          .status(403)
          .json({ status: 'error', message: (error as Error).message });
        return;
      }
      res
        .status(400)
        .json({ status: 'error', message: (error as Error).message });
    }
  }
);

router.patch(
  '/users/:id',
  checkRole(['admin', 'super_admin']),
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const currentUser = req.user;

      if (!currentUser) {
        res.status(401).json({
          status: 'error',
          message: 'Authentication required',
        });
        return;
      }

      const updateData: UserUpdateData = req.body;
      const updatedUser = await updateUser(id, currentUser, updateData);

      res.status(200).json({ status: 'success', data: updatedUser });
    } catch (error) {
      const errorMessage = (error as Error).message;

      if (errorMessage.includes('Forbidden')) {
        res.status(403).json({ status: 'error', message: errorMessage });
        return;
      }

      if (errorMessage.includes('not found')) {
        res.status(404).json({ status: 'error', message: errorMessage });
        return;
      }

      res.status(400).json({ status: 'error', message: errorMessage });
    }
  }
);

router.delete(
  '/users/:id',
  checkRole(['super_admin']),
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { id } = req.params;
      const result = await deleteUserById(id);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) {
      // Asumsikan error dari service adalah karena user tidak ditemukan
      res
        .status(404)
        .json({ status: 'error', message: (error as Error).message });
    }
  }
);

export default router;
