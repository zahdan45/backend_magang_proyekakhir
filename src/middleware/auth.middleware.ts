// src/middleware/auth.middleware.ts
import { supabaseAdmin } from '../core/supabase.js';
import type { Request, Response, NextFunction } from 'express';
import type { User } from '@supabase/supabase-js';

// Tipe kustom untuk menambahkan properti 'user' ke objek Request Express
interface AuthenticatedRequest extends Request {
  user?: User;
}

/**
 * Middleware untuk memproteksi rute.
 * Memverifikasi token JWT yang ada di header Authorization.
 * @param req Request object
 * @param res Response object
 * @param next NextFunction
 */
export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res
        .status(401)
        .json({ status: 'error', message: 'Unauthorized: No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];

    // Verifikasi token ke Supabase
    const {
      data: { user },
      error,
    } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      res
        .status(401)
        .json({ status: 'error', message: 'Unauthorized: Invalid token' });
      return;
    }

    // PENTING: Lampirkan data pengguna ke objek request agar bisa digunakan oleh middleware selanjutnya
    req.user = user;

    // Jika berhasil, lanjutkan ke rute berikutnya
    next();
  } catch (err) {
    // Menangkap error tak terduga lainnya
    console.error('Authentication error:', err);
    res.status(401).json({ status: 'error', message: 'Unauthorized' });
  }
};

/**
 * Middleware factory untuk memeriksa apakah pengguna memiliki salah satu peran yang dibutuhkan.
 * @param requiredRoles Array dari peran yang diizinkan untuk mengakses rute.
 * @returns Express middleware function
 */
export const checkRole = (requiredRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    const userRoles = user?.app_metadata?.roles || [];

    // Periksa apakah pengguna memiliki setidaknya salah satu peran yang dibutuhkan
    const hasRequiredRole = userRoles.some((role: string) =>
      requiredRoles.includes(role)
    );

    if (user && hasRequiredRole) {
      next(); // Peran cocok, lanjutkan ke rute
    } else {
      // Peran tidak cocok, kirim error 403 Forbidden
      res.status(403).json({
        status: 'error',
        message: 'Forbidden: Insufficient permissions',
      });
    }
  };
};
