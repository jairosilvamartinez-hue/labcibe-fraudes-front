const API_URL = 'https://labcibe-fraudes-back-production.up.railway.app';

console.log('🔵 fraudService cargado. API_URL =', API_URL);

export interface Fraud {
  id?: number;
  impostorDetails: string;
  contactInfo: string;
  comments: string;
  createdAt?: string;
}

function normalizeFraud(obj: any): Fraud {
  return {
    id: obj.id ?? obj.Id,
    impostorDetails: obj.impostorDetails ?? obj.ImpostorDetails ?? '',
    contactInfo: obj.contactInfo ?? obj.ContactInfo ?? '',
    comments: obj.comments ?? obj.Comments ?? '',
    createdAt: obj.createdAt ?? obj.CreatedAt,
  };
}
export async function createFraud(fraud: Fraud): Promise<Fraud> {
  console.log('🟢 createFraud llamado con:', fraud);
  console.log('🟢 URL completa:', `${API_URL}/api/Fraud`);
  
  const response = await fetch(`${API_URL}/api/Fraud`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fraud),
  });

  console.log('🟢 Respuesta de createFraud:', response.status, response.statusText);

  if (!response.ok) {
    const error = await response.json();
    console.error('🔴 Error en createFraud:', error);
    throw new Error(error.message || 'Error al guardar el reporte');
  }

  const data = await response.json();
  console.log('🟢 createFraud exitoso, datos:', data);
  return normalizeFraud(data as any);
}

export async function getAllFrauds(): Promise<Fraud[]> {
  console.log('🟡 getAllFrauds llamado');
  console.log('🟡 URL:', `${API_URL}/api/Fraud`);
  
  const response = await fetch(`${API_URL}/api/Fraud`);

  console.log('🟡 Respuesta de getAllFrauds:', response.status, response.statusText);

  if (!response.ok) {
    console.error('🔴 Error en getAllFrauds');
    throw new Error('Error al cargar los reportes');
  }

  const data = await response.json();
  console.log('🟡 getAllFrauds exitoso, reportes (raw):', data);
  if (Array.isArray(data)) {
    const normalized = data.map((d) => normalizeFraud(d));
    console.log('🟡 reportes normalizados:', normalized);
    return normalized;
  }
  // In case API returns a single object
  return [normalizeFraud(data)];
}