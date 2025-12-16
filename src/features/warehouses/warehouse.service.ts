import { prisma } from '../../core/db.js';

export type WarehouseData = {
  id: string;
  name: string;
  location?: string;
};

// --- TAMBAHKAN FUNGSI BARU INI ---
export const getWarehousesSummary = async () => {
  // 1. Ambil semua data yang diperlukan secara bersamaan
  
  // FIX: prisma.warehouses -> prisma.warehouse
  const warehouses = await prisma.warehouse.findMany({
    orderBy: { name: 'asc' },
  });
  
  // FIX: prisma.devices -> prisma.device
  const devices = await prisma.device.findMany();
  
  // FIX: prisma.incidents -> prisma.incident
  const activeIncidents = await prisma.incident.findMany({
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
  // FIX: prisma.warehouses -> prisma.warehouse
  prisma.warehouse.findMany({ orderBy: { name: 'asc' } });

export const createWarehouse = (data: WarehouseData) =>
  // FIX: prisma.warehouses -> prisma.warehouse
  prisma.warehouse.create({ data });

export const updateWarehouse = (id: string, data: Partial<WarehouseData>) =>
  // FIX: prisma.warehouses -> prisma.warehouse
  prisma.warehouse.update({ where: { id }, data });

export const deleteWarehouse = (id: string) =>
  // FIX: prisma.warehouses -> prisma.warehouse
  prisma.warehouse.delete({ where: { id } });