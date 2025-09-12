import { RecordData } from '../dataManager/types';

const API_BASE_URL = 'http://us1.neptunia.net.eu.org:8080';

export async function fetchAllRecords(): Promise<RecordData[]> {
  try {
    // 添加更详细的错误处理和超时机制
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5秒超时

    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      signal: controller.signal
    }).finally(() => clearTimeout(timeoutId));

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new Error('Invalid response format: expected array');
    }

    return data.map((record: any) => ({
      id: record.id || '',
      title: record.title || '未命名记录',
      timestamp: record.createdAt ? new Date(record.createdAt).toISOString() : new Date().toISOString(),
      type: record.type || '其他',
      head: record.head || '',
      body: record.body || '',
      tail: record.tail || '',
      analyse: record.analyse || '',
      createdAt: record.createdAt ? new Date(record.createdAt).toISOString() : new Date().toISOString(),
      updatedAt: record.createdAt ? new Date(record.createdAt).toISOString() : new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error fetching records:', error);
    // 返回空数组作为回退，而不是抛出错误
    return [];
  }
}

export async function saveRecord(record: RecordData): Promise<RecordData> {
  const hasId = Boolean(record.id);
  const url = hasId
    ? `${API_BASE_URL}/records/${encodeURIComponent(record.id)}`
    : `${API_BASE_URL}/records`;
  const method = hasId ? 'PUT' : 'POST';
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(record)
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
