// src/core/db.ts
import { PrismaClient } from '@prisma/client';

// Deklarasikan tipe 'prisma' pada scope global TypeScript
declare global {
   
  var prisma: PrismaClient | undefined;
}

// Cek jika 'prisma' sudah ada di objek global, jika tidak, buat yang baru.
// Di lingkungan produksi, ini akan selalu membuat instance baru.
// Di lingkungan development, ini akan menggunakan kembali instance dari hot reload sebelumnya.
export const prisma = global.prisma || new PrismaClient();

// Simpan instance ke objek global HANYA di lingkungan development.
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
