import { RecordData } from '../dataManager/types';

// const API_BASE_URL = 'http://jp3.neptunia.net.eu.org:8080';
const API_BASE_URL = 'http://localhost:8080';

// 获取所有记录
export async function fetchAllRecords(): Promise<RecordData[]> {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

// 新建记录
export async function createRecord(record: RecordData): Promise<RecordData> {
  const response = await fetch(`${API_BASE_URL}/notes`, {
    method: 'POST',
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

// 更新记录
export async function updateRecord(record: RecordData): Promise<void> {
  if (!record.id) throw new Error('Record id is required for update');
  const response = await fetch(`${API_BASE_URL}/notes/${encodeURIComponent(record.id)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(record)
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  // 204 No Content，无需返回内容
  return;
}

// 删除记录
export async function deleteRecord(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/notes/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // 204 No Content, no need to return anything
  return;
}

export async function archiveRecord(record: RecordData): Promise<void> {
  if (!record.id) throw new Error('Record id is required for archive');
  const response = await fetch(`${API_BASE_URL}/notes/${encodeURIComponent(record.id)}/archive`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(record)
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  // 204 No Content，无需返回内容
  return;
}

export async function analyseRecord(record: RecordData): Promise<void> {
  if (!record.id) throw new Error('Record id is required for analys');
  const response = await fetch(`${API_BASE_URL}/notes/${encodeURIComponent(record.id)}/analysis`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(record)
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  // 204 No Content，无需返回内容
  return;
}