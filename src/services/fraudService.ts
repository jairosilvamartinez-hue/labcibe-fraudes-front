const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5219';

export interface Fraud {
  id?: number;
  impostorDetails: string;
  contactInfo: string;
  comments: string;
  createdAt?: string;
}

export async function createFraud(fraud: Fraud): Promise<Fraud> {
  const response = await fetch(`${API_URL}/api/Fraud`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fraud),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al guardar el reporte');
  }

  return response.json();
}

export async function getAllFrauds(): Promise<Fraud[]> {
  const response = await fetch(`${API_URL}/api/Fraud`);

  if (!response.ok) {
    throw new Error('Error al cargar los reportes');
  }

  return response.json();
}