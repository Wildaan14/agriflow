import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Commodity {
  id: string;
  farmer_id: string;
  commodity_type: string;
  quantity_kg: number;
  grade: 'A' | 'B' | 'C';
  asking_price_per_kg: number;
  available_from: string;
  status: 'available' | 'matched' | 'sold' | 'expired';
  ai_grade_confidence: number;
  photo_urls: string[];
  location?: string; // Optional for now
}

export interface Alert {
  id: string;
  severity: 'danger' | 'warning';
  title: string;
  desc: string;
  timestamp: string;
}

export const getCommodities = async (): Promise<Commodity[]> => {
  try {
    const response = await apiClient.get('/commodities');
    return response.data;
  } catch (error) {
    console.warn("Backend unreachable. Using mock commodities data.");
    return [
      { id: '1', farmer_id: 'F001', commodity_type: 'Cabai Keriting', quantity_kg: 540, grade: 'A', asking_price_per_kg: 45000, available_from: '2026-03-20', status: 'available', ai_grade_confidence: 0.98, photo_urls: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0z_G-F0uV5hX5vX8Vb9u_jY-wOqX7-x6zlw&s'] },
      { id: '2', farmer_id: 'F002', commodity_type: 'Bawang Merah', quantity_kg: 1200, grade: 'A', asking_price_per_kg: 32000, available_from: '2026-03-21', status: 'available', ai_grade_confidence: 0.92, photo_urls: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6-6j-F0uV5hX5vX8Vb9u_jY-wOqX7-x6zlw&s'] },
      { id: '3', farmer_id: 'F003', commodity_type: 'Kopi Arabika', quantity_kg: 300, grade: 'A', asking_price_per_kg: 120000, available_from: '2026-03-22', status: 'available', ai_grade_confidence: 0.99, photo_urls: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7-7j-F0uV5hX5vX8Vb9u_jY-wOqX7-x6zlw&s'] },
    ];
  }
};

export const getAlerts = async (): Promise<Alert[]> => {
  try {
    const response = await apiClient.get('/alerts');
    return response.data;
  } catch (error) {
    console.warn("Backend unreachable. Using mock alerts data.");
    return [
      { id: '1', severity: 'danger', title: 'Hama Wereng Meningkat', desc: 'Wilayah Jawa Barat terdeteksi peningkatan hama wereng 25%.', timestamp: '10 mins ago' },
      { id: '2', severity: 'warning', title: 'Curah Hujan Tinggi', desc: 'Peringatan banjir di wilayah lahan rawa Sumatra Selatan.', timestamp: '1 hour ago' },
    ];
  }
};

export const getNationalRisk = async () => {
  // Mocking national risk levels from AI service
  return {
    risk: 'Waspada',
    inflation: 'Kritis',
    subsidy: '88%',
    stocks: 'Aman',
    lastUpdate: new Date().toLocaleString()
  };
};

export const createPayment = async (commodityId: string, amount: number) => {
  try {
    const response = await apiClient.post('/payments/create', {
      transaction_id: `AF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      commodity_id: commodityId,
      amount: amount
    });
    return response.data;
  } catch (error) {
    console.warn("Backend unreachable. Simulating payment success.");
    return {
      status: 'success',
      transaction_id: `AF-MOCK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      message: 'Pembayaran berhasil disimulasi (Mode Demo)'
    };
  }
};
