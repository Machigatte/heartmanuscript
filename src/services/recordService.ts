// recordService.ts
// 负责与后端API进行record相关的网络请求

import type { RecordData } from "../containers/RecordEditorContext";


// mock 数据
const mockRecord: RecordData = {
  id: "mock-id-1",
  type: "weekly",
  date: new Date(),
  title: "Mock 记录标题",
  time: new Date().toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }),
  // content: "这里是mock内容",
};

// 获取指定id的record详情（mock）
export async function fetchRecordById(id: string): Promise<RecordData> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockRecord);
    }, 300);
  });
}

// 保存（新建或更新）record（mock）
export async function saveRecord(record: RecordData): Promise<RecordData> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ ...record, id: record.id ?? `mock-id-${Math.random().toString(36).slice(2, 8)}` });
    }, 300);
  });
}

// 存档record（mock）
export async function archiveRecord(id: string): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 200);
  });
}
