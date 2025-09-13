// 定义数据类型

// 记录类型：1=周报，2=科研日记
export type RecordType = 1 | 2;

// 记录数据结构
export interface RecordData {
  id: string;           // 唯一ID
  title: string;        // 标题
  noteType: RecordType;     // 信息属性（1=周报，2=科研日记）
  head: string;         // 头部文本
  body: string;         // 主体文本
  tail: string;         // 尾部文本
  summary: string;      // 分析文本
  archivedAt: string | null; // 存档时间，null表示未存档
  createdAt: string;    // 创建时间
  updatedAt: string;    // 更新时间
}

// 应用设置
export interface AppSettings {
  model: string;        // 选择的大模型
  apiKey: string;       // API密钥
  theme: "light" | "dark"; // 主题设置
}

// 应用状态
export interface AppState {
  records: RecordData[];           // 所有记录
  currentRecordId: string | null;  // 当前选中的记录ID
  settings: AppSettings;           // 应用设置
  isLoading: boolean;              // 加载状态
  error: string | null;            // 错误信息
  isModified: boolean;             // 当前记录是否有未保存的修改
}
