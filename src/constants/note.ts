import { NoteType } from "@/api/types";
import { NoteDetail } from "@/models/NoteDetail";

export type NoteContentField = 'head' | 'body' | 'tail' | 'summary';

export const NoteTypeMap = {
  1: "工作周报",
  2: "科研日记",
  3: "随想"
};

type FieldMap = {
  [key in NoteType]: {
    sections: { field: NoteContentField; label: string; optional?: boolean }[];
  };
};

export const fieldMap: FieldMap = {
  1: {
    sections: [
      { field: 'head', label: '工作安排' },
      { field: 'body', label: '资料' },
      { field: 'tail', label: '结果' },
      { field: 'summary', label: '分析结果', optional: true }
    ]
  },
  2: {
    sections: [
      { field: 'head', label: '实验安排' },
      { field: 'body', label: '代码' },
      { field: 'tail', label: '结果' },
      { field: 'summary', label: '分析结果', optional: true }
    ]
  },
  3: {
    sections: [
      { field: 'head', label: '实验安排' , optional: true },
      { field: 'body', label: '小记' },
      { field: 'tail', label: '结果' , optional: true },
      { field: 'summary', label: '分析结果', optional: true }
    ]
  },
};

// 草稿临时ID
export const DRAFT_ID = -1;

export const defaultDraft: NoteDetail = {
    id: DRAFT_ID,
    title: '未命名笔记',
    type: 1,
    head: "",
    body: "",
    tail: "",
    summary: "",
    archivedAt: null,
    createdAt: new Date(),
    updatedAt: new Date()
  };