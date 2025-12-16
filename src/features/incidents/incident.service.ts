import { prisma } from '../../core/db.js'; // TAMBAH .js
import { supabaseAdmin } from '../../core/supabase.js'; // TAMBAH .js
import { Prisma } from '@prisma/client';

// --- Tipe Data & Interface ---

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

// --- Logic Service ---

export const getAllIncidents = async (locationArea?: string) => {
  // FIX: Ubah incidentsWhereInput jadi IncidentWhereInput (Huruf besar & Singular)
  const whereClause: Prisma.IncidentWhereInput = {};

  if (locationArea) {
    console.log(`--- Mencari insiden untuk area: "${locationArea}" ---`);

    // FIX: prisma.devices -> prisma.device
    const devicesInArea = await prisma.device.findMany({
      where: {
        location_area: {
          equals: locationArea,
          mode: 'insensitive',
        },
      },
      select: { id: true },
    });
    console.log(`Ditemukan perangkat di area ini: ${devicesInArea.length}`);

    const deviceIds = devicesInArea.map((d) => d.id);
    console.log(`ID Perangkat:`, deviceIds);

    whereClause.source_device_id = { in: deviceIds };
  }

  // FIX: prisma.incidents -> prisma.incident
  const incidents = await prisma.incident.findMany({
    where: whereClause,
    orderBy: {
      created_at: 'desc',
    },
  });

  console.log(`Ditemukan insiden: ${incidents.length}`);
  console.log(`--------------------------------------------------`);

  return incidents;
};

export const createIncident = async (incidentData: IncidentCreationData) => {
  // FIX: prisma.incidents -> prisma.incident
  const newIncident = await prisma.incident.create({
    data: incidentData,
  });

  try {
    if (newIncident.source_device_id) {
      // FIX: prisma.devices -> prisma.device
      await prisma.device.update({
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
      payload: { data: newIncident.data }, 
    });
    console.log(`Broadcast sent on channel: ${channelName}`);
  } catch (broadcastError) {
    console.error('Supabase broadcast error:', broadcastError);
  }

  return newIncident;
};

export const clearIncident = async (id: string) => {
  // FIX: prisma.incidents -> prisma.incident
  const updatedIncident = await prisma.incident.update({
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
  // FIX: incidentsWhereInput -> IncidentWhereInput
  const whereClause: Prisma.IncidentWhereInput = {
    created_at: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
  };

  if (locationArea) {
    // FIX: prisma.devices -> prisma.device
    const devicesInArea = await prisma.device.findMany({
      where: { location_area: { equals: locationArea, mode: 'insensitive' } },
      select: { id: true },
    });
    whereClause.source_device_id = { in: devicesInArea.map((d) => d.id) };
  }

  // FIX: prisma.incidents -> prisma.incident
  const incidents = await prisma.incident.findMany({
    where: whereClause,
    orderBy: { created_at: 'asc' },
  });

  return incidents.map((inc) => ({
    time: inc.created_at.toISOString(),
    vibration: (inc.data as IncidentData)?.raw_values?.accX ?? 0,
    sound: (inc.data as IncidentData)?.raw_values?.mic_level ?? 0,
  }));
};

export const getIncidentsSummary = async (locationArea?: string) => {
  let deviceIds: string[] | undefined = undefined;

  if (locationArea) {
    // FIX: prisma.devices -> prisma.device
    const devicesInArea = await prisma.device.findMany({
      where: { location_area: { equals: locationArea, mode: 'insensitive' } },
      select: { id: true },
    });
    deviceIds = devicesInArea.map((d) => d.id);
  }

  // FIX: prisma.incidents -> prisma.incident
  const totalIncidents = await prisma.incident.count({
    where: deviceIds ? { source_device_id: { in: deviceIds } } : {},
  });

  // FIX: prisma.incidents -> prisma.incident
  const activeIncidents = await prisma.incident.count({
    where: deviceIds
      ? { source_device_id: { in: deviceIds }, is_cleared: false }
      : { is_cleared: false },
  });

  return { totalIncidents, activeIncidents };
};

export const processSensorDataWithML = async (rawData: RawSensorData) => {
  try {
    const response = await fetch(`${process.env.ML_MODEL_URL}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rawData.data),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `ML API Error - Status: ${response.status}, Body: ${errorBody}`
      );
      throw new Error('ML model API returned an error');
    }

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