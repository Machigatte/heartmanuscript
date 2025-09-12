import { RecordData, RecordType } from './types';

// 生成唯一ID
// export function generateId(): string {
//   return Date.now().toString(36) + Math.random().toString(36).substring(2);
// }

// 创建默认记录（草稿）
export function defaultRecord(type: RecordType = 1): RecordData {
  const now = new Date().toISOString();
  const formattedDate = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  
  return {
    id: '',
    title: '未命名 - ' + formattedDate,
    note_type: 1,
    head: '',
    body: '',
    tail: '',
    analyse: '',
    archivedAt: null,
    createdAt: '',
    updatedAt: ''
  };
}

// 格式化日期
export function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch (error) {
    console.error('Invalid date format:', error);
    return dateString;
  }
}

// 按日期排序记录（最新的在前）
export function sortRecordsByDate(records: RecordData[]): RecordData[] {
  return [...records].sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

// 按类型过滤记录
export function filterRecordsByType(records: RecordData[], type: RecordType | null): RecordData[] {
  if (!type) return records;
  return records.filter(record => record.note_type === type);
}

// 搜索记录
export function searchRecords(records: RecordData[], searchTerm: string): RecordData[] {
  if (!searchTerm.trim()) return records;
  
  const term = searchTerm.toLowerCase();
  return records.filter(record => 
    record.head.toLowerCase().includes(term) ||
    record.body.toLowerCase().includes(term) ||
    record.tail.toLowerCase().includes(term) ||
    record.analyse.toLowerCase().includes(term)
    // TODO: 
    //record.note_type.toLowerCase().includes(term)
  );
}

// 获取当前记录
export function getCurrentRecord(records: RecordData[], currentId: string | null): RecordData | null {
  if (!currentId) return null;
  return records.find(record => record.id === currentId) || null;
}