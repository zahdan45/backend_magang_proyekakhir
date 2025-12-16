import { prisma } from '../../core/db.js';
import { supabaseAdmin } from '../../core/supabase.js';
import { Prisma } from '../../generated/prisma/index.js';

// Tipe untuk data yang masuk dari request body
export type IncidentCreationData = {
  incident_type: string;
  source_device_id: string;
  data: Prisma.InputJsonValue;
};

type PredictionResponse = {
  prediction: 'IMPACT' | 'VIBRATION' | 'NORMAL';
  confidence: number;
};

type RawSensorData = {
  sensorId: string;
  type: string;
  data: {
    accX: number;
    accY: number;
    accZ: number;
    gyroX: number;
    gyroY: number;
    gyroZ: number;
    mic_level: number;
  };
};

// Interface untuk struktur data insiden yang tersimpan
interface IncidentData {
  raw_values?: {
    accX?: number;
    accY?: number;
    accZ?: number;
    gyroX?: number;
    gyroY?: number;
    gyroZ?: number;
    mic_level?: number;
  };
  confidence?: number;
  [key: string]: unknown;
}

// Interface untuk data insiden yang akan disimpan
interface IncidentDataToSave {
  incident_type: string;
  source_device_id: string;
  data: {
    confidence: number;
    raw_values: {
      accX: number;
      accY: number;
      accZ: number;
      gyroX: number;
      gyroY: number;
      gyroZ: number;
      mic_level: number;
    };
  };
}

// Fungsi untuk mengambil semua data insiden dengan filter lokasi opsional
export const getAllIncidents = async (locationArea?: string) => {
  const whereClause: Prisma.incidentsWhereInput = {};

  if (locationArea) {
    console.log(`--- Mencari insiden untuk area: "${locationArea}" ---`); // Log 1

    const devicesInArea = await prisma.devices.findMany({
      where: {
        location_area: {
          equals: locationArea,
          mode: 'insensitive',
        },
      },
      select: { id: true },
    });
    console.log(`Ditemukan perangkat di area ini: ${devicesInArea.length}`); // Log 2

    const deviceIds = devicesInArea.map((d) => d.id);
    console.log(`ID Perangkat:`, deviceIds); // Log 3

    whereClause.source_device_id = { in: deviceIds };
  }

  const incidents = await prisma.incidents.findMany({
    where: whereClause,
    orderBy: {
      created_at: 'desc',
    },
  });
  console.log(`Ditemukan insiden: ${incidents.length}`); // Log 4
  console.log(`--------------------------------------------------`);

  return incidents;
};

// Fungsi untuk membuat data insiden baru
export const createIncident = async (incidentData: IncidentCreationData) => {
  const newIncident = await prisma.incidents.create({
    data: incidentData,
  });

  try {
    if (newIncident.source_device_id) {
      await prisma.devices.update({
        where: { id: newIncident.source_device_id },
        data: { last_seen: new Date() },
      });
    }
  } catch (err) {
    console.error(
      `Failed to update last_seen for device ${newIncident.source_device_id}:`,
      err
    );
  }

  try {
    const channelName = `device-status-${newIncident.source_device_id}`;
    const channel = supabaseAdmin.channel(channelName);
    await channel.send({
      type: 'broadcast',
      event: 'sensor-reading',
      payload: { data: newIncident.data }, // Kirim data sensor mentah
    });
    console.log(`Broadcast sent on channel: ${channelName}`);
  } catch (broadcastError) {
    console.error('Supabase broadcast error:', broadcastError);
  }

  return newIncident;
};

/**
 * Memperbarui status 'is_cleared' sebuah insiden menjadi true.
 * @param id ID dari insiden yang akan diperbarui.
 */
export const clearIncident = async (id: string) => {
  const updatedIncident = await prisma.incidents.update({
    where: {
      id: BigInt(id),
    },
    data: {
      is_cleared: true,
    },
  });
  return updatedIncident;
};

export const getIncidentStatsForChart = async (locationArea?: string) => {
  const whereClause: Prisma.incidentsWhereInput = {
    created_at: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
  };

  if (locationArea) {
    const devicesInArea = await prisma.devices.findMany({
      where: { location_area: { equals: locationArea, mode: 'insensitive' } },
      select: { id: true },
    });
    whereClause.source_device_id = { in: devicesInArea.map((d) => d.id) };
  }

  const incidents = await prisma.incidents.findMany({
    where: whereClause,
    orderBy: { created_at: 'asc' },
  });

  return incidents.map((inc) => ({
    time: inc.created_at.toISOString(),
    // Diubah untuk mengakses data dari struktur nested raw_values
    vibration: (inc.data as IncidentData)?.raw_values?.accX ?? 0,
    sound: (inc.data as IncidentData)?.raw_values?.mic_level ?? 0,
  }));
};

export const getIncidentsSummary = async (locationArea?: string) => {
  let deviceIds: string[] | undefined = undefined;
  if (locationArea) {
    const devicesInArea = await prisma.devices.findMany({
      where: { location_area: { equals: locationArea, mode: 'insensitive' } },
      select: { id: true },
    });
    deviceIds = devicesInArea.map((d) => d.id);
  }

  const totalIncidents = await prisma.incidents.count({
    where: deviceIds ? { source_device_id: { in: deviceIds } } : {},
  });
  const activeIncidents = await prisma.incidents.count({
    where: deviceIds
      ? { source_device_id: { in: deviceIds }, is_cleared: false }
      : { is_cleared: false },
  });

  return { totalIncidents, activeIncidents };
};

/**
 * Menerima data sensor mentah, memanggil model ML, dan mengambil tindakan.
 * @param rawData Data mentah dari perangkat.
 */
export const processSensorDataWithML = async (rawData: RawSensorData) => {
  try {
    const response = await fetch(`${process.env.ML_MODEL_URL}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rawData.data),
    });

    if (!response.ok) {
      // Baca pesan error dari body respons jika ada
      const errorBody = await response.text();
      console.error(
        `ML API Error - Status: ${response.status}, Body: ${errorBody}`
      );
      throw new Error('ML model API returned an error');
    }

    // --- TAMBAHKAN TYPE ASSERTION 'as' DI SINI ---
    const predictionResult = (await response.json()) as PredictionResponse;

    if (predictionResult.prediction !== 'NORMAL') {
      const incidentToSave: IncidentDataToSave = {
        incident_type: predictionResult.prediction,
        source_device_id: rawData.sensorId,
        data: {
          confidence: predictionResult.confidence,
          raw_values: rawData.data,
        },
      };

      await createIncident(incidentToSave);

      console.log(
        `ML Prediction: ${predictionResult.prediction}. Incident saved.`
      );
    } else {
      console.log(`ML Prediction: NORMAL. No incident created.`);
    }
  } catch (mlError) {
    console.error('Error processing data with ML model:', mlError);
  }
};
