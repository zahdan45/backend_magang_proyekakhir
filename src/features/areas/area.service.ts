// src/features/areas/area.service.ts
import { prisma } from '../../core/db.js';

export const getAreasStatus = async (warehouseId?: string) => {
  const deviceWhereClause = warehouseId ? { warehouse_id: warehouseId } : {};

  // 1. Ambil semua perangkat yang relevan
  const devices = await prisma.devices.findMany({
    where: deviceWhereClause,
  });

  // 2. Gunakan 'groupBy' untuk meminta database menghitung insiden aktif per perangkat
  const incidentCounts = await prisma.incidents.groupBy({
    by: ['source_device_id'], // Kelompokkan berdasarkan ID perangkat
    where: {
      is_cleared: false,
      source_device_id: { in: devices.map((d) => d.id) },
    },
    _count: {
      source_device_id: true, // Hitung berapa banyak insiden untuk setiap grup
    },
  });

  // Ubah hasil hitungan menjadi format yang mudah diakses: { deviceId: count }
  const activeIncidentMap = new Map<string, number>();
  incidentCounts.forEach((item) => {
    if (item.source_device_id) {
      activeIncidentMap.set(
        item.source_device_id,
        item._count.source_device_id
      );
    }
  });

  const areas = [...new Set(devices.map((d) => d.location_area))];

  // 3. Gabungkan hasilnya di JavaScript (proses ini sekarang sangat cepat)
  const areasWithStatus = areas.map((area) => {
    const devicesInArea = devices.filter((d) => d.location_area === area);

    // Jumlahkan total insiden di area dari map yang sudah kita buat
    const activeIncidentCount = devicesInArea.reduce((sum, device) => {
      return sum + (activeIncidentMap.get(device.id) || 0);
    }, 0);

    let status = 'normal';
    if (devicesInArea.every((d) => !isDeviceOnline(d.last_seen))) {
      status = 'offline';
    } else if (activeIncidentCount > 0) {
      status = 'incident';
    }

    return {
      name: area,
      status: status,
      deviceCount: devicesInArea.length,
      activeIncidentCount,
    };
  });

  return areasWithStatus;
};

// Fungsi helper (bisa diimpor dari file utilitas lain)
function isDeviceOnline(lastSeen: Date | null): boolean {
  if (!lastSeen) return false;
  const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
  return lastSeen.getTime() > fiveMinutesAgo;
}
