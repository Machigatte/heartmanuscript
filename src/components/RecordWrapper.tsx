import React, { useRef, useEffect } from "react";
import { RecordData, RecordType } from "@/dataManager/types";

// 内容字段的明确类型（只包括文本字段）
type ContentField = 'head' | 'body' | 'tail' | 'summary';

interface RecordWrapperProps {
  type: RecordType;
  // 使用 Partial<RecordData> 以允许某些字段缺失（例如 optional 字段）
  record: Partial<RecordData>;
  isArchived: boolean;
  onChange?: (field: ContentField, value: string) => void;
}

const typeConfig: Record<RecordType, { sections: { field: ContentField; label: string; optional?: boolean }[] }> = {
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

// Auto-resizing textarea component
function AutoResizeTextarea({
  value,
  onChange,
  readOnly,
  className,
  placeholder,
  minHeight = 60,
  maxHeight
}: {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
  className?: string;
  placeholder?: string;
  minHeight?: number;
  maxHeight?: number;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const prevLineCount = useRef(0);
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const lineCount = value.split('\n').length;
    if (lineCount !== prevLineCount.current) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      let newHeight = Math.max(minHeight, scrollHeight + 10); // +10 for padding
      if (typeof maxHeight === 'number') {
        newHeight = Math.min(newHeight, maxHeight);
      }
      textarea.style.height = `${newHeight}px`;
      prevLineCount.current = lineCount;
    }
  }, [value, minHeight, maxHeight]);

  return (
    <textarea
      ref={textareaRef}
      className={className}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      placeholder={placeholder}
      style={{
        resize: 'vertical',
        overflow: 'auto',
        minHeight: '60px',
        maxHeight: '70vh'
      }}
    />
  );
}

export function RecordWrapper({ type, record, isArchived, onChange }: RecordWrapperProps) {
  const config = typeConfig[type as keyof typeof typeConfig] || { sections: [] };

  return (
    <div className="space-y-4">
      {config.sections.map((section) => {
        if (section.optional && !record[section.field]) return null;
        return (
          <div key={section.field}>
            <h3 className="font-semibold">{section.label}</h3>
            <AutoResizeTextarea
              className="w-full border rounded p-2"
              value={(record[section.field as ContentField] as string) ?? ''}
              onChange={!isArchived ? (e) => onChange?.(section.field as ContentField, e.target.value) : undefined}
              readOnly={isArchived}
            />
          </div>
        );
      })}
    </div>
  );
}