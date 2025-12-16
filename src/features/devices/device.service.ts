import { prisma } from '../../core/db.js';

// Tipe untuk data saat membuat atau memperbarui perangkat
export type DeviceData = {
  id: string;
  name: string;
  location_area: string;
  warehouse_id: string;
};

/**
 * Mengambil semua perangkat yang terdaftar.
 */
export const getAllDevices = async () => {
  // FIX: prisma.devices -> prisma.device
  const devices = await prisma.device.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  return devices;
};

/**
 * Mendaftarkan satu perangkat baru.
 * @param data Detail perangkat yang akan dibuat.
 */
export const createDevice = async (data: DeviceData) => {
  // FIX: prisma.devices -> prisma.device
  const newDevice = await prisma.device.create({
    data: {
      ...data,
      status: 'offline', // Status awal selalu offline
      last_seen: null,
    },
  });
  return newDevice;
};

/**
 * Memperbarui detail perangkat yang ada.
 * @param id ID perangkat yang akan diperbarui.
 * @param data Detail baru untuk perangkat.
 */
export const updateDevice = async (id: string, data: Partial<DeviceData>) => {
  // FIX: prisma.devices -> prisma.device
  const updatedDevice = await prisma.device.update({
    where: { id },
    data,
  });
  return updatedDevice;
};

/**
 * Menghapus perangkat dari sistem.
 * @param id ID perangkat yang akan dihapus.
 */
export const deleteDevice = async (id: string) => {
  // FIX: prisma.devices -> prisma.device
  await prisma.device.delete({
    where: { id },
  });
  return { message: `Device ${id} deleted successfully.` };
};