// src/features/warehouses/warehouse.service.ts
import { prisma } from '../../core/db.js';

export type WarehouseData = {
  id: string;
  name: string;
  location?: string;
};

// --- TAMBAHKAN FUNGSI BARU INI ---
export const getWarehousesSummary = async () => {
  // 1. Ambil semua data yang diperlukan secara bersamaan
  const warehouses = await prisma.warehouses.findMany({
    orderBy: { name: 'asc' },
  });
  const devices = await prisma.devices.findMany();
  const activeIncidents = await prisma.incidents.findMany({
    where: { is_cleared: false },
  });

  // 2. Proses data untuk membuat ringkasan
  const summary = warehouses.map((warehouse) => {
    // Cari semua perangkat yang ada di gudang ini
    const devicesInWarehouse = devices.filter(
      (d) => d.warehouse_id === warehouse.id
    );
    const deviceIdsInWarehouse = devicesInWarehouse.map((d) => d.id);

    // Hitung insiden aktif untuk perangkat di gudang ini
    const activeIncidentCount = activeIncidents.filter(
      (inc) =>
        inc.source_device_id &&
        deviceIdsInWarehouse.includes(inc.source_device_id)
    ).length;

    return {
      ...warehouse,
      status: activeIncidentCount > 0 ? 'incident' : 'normal',
      activeIncidentCount,
    };
  });

  return summary;
};
// ------------------------------------

export const getAllWarehouses = () =>
  prisma.warehouses.findMany({ orderBy: { name: 'asc' } });
export const createWarehouse = (data: WarehouseData) =>
  prisma.warehouses.create({ data });
export const updateWarehouse = (id: string, data: Partial<WarehouseData>) =>
  prisma.warehouses.update({ where: { id }, data });
export const deleteWarehouse = (id: string) =>
  prisma.warehouses.delete({ where: { id } });
