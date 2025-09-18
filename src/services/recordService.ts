import { RecordData } from '../dataManager/types';
import { camelSnake } from '@/utils/camel';
import { config } from '@/config';

const API_BASE_URL = config.backendUrl;

// 获取所有记录
export const fetchAllRecords = camelSnake(
  async (): Promise<RecordData[]> => {
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
)

// 新建记录
export const createRecord = camelSnake(
  async (record: RecordData): Promise<RecordData> => {
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
)

// 更新记录
export const updateRecord = camelSnake(
  async (record: RecordData): Promise<void> => {
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
)

// 删除记录
export const deleteRecord = camelSnake(
  async (id: string): Promise<void> => {
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
)

// 归档记录
export const archiveRecord = camelSnake(
  async (record: RecordData): Promise<RecordData> => {
    if (!record.id) throw new Error('Record id is required for archive');
    const response = await fetch(`${API_BASE_URL}/notes/${encodeURIComponent(record.id)}/archive`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
)

// 分析记录
export const analyseRecord = camelSnake(
  async (record: RecordData): Promise<RecordData> => {
    if (!record.id) throw new Error('Record id is required for analysis');
    const response = await fetch(`${API_BASE_URL}/notes/${encodeURIComponent(record.id)}/analyse`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
)

export const searchRecords = camelSnake(
  async (params: {
    from?: Date;
    to?: Date;
    noteType?: string;
    keyword?: string;
  }): Promise<RecordData[]> => {
    const response = await fetch(`${API_BASE_URL}/notes/search`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(params)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }
)