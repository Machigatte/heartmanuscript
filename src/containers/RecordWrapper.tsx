import { useRecordEditor } from "./RecordEditorContext";
import { useAutoResize } from "../hooks/useAutoResize";

interface RecordWrapperProps {
  type: number;
  record: any;
  isArchived: boolean;
  onChange?: (field: string, value: string) => void;
}

const typeConfig = {
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
  placeholder 
}: {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
  className?: string;
  placeholder?: string;
}) {
  const textareaRef = useAutoResize(value, { minHeight: 60, maxHeight: 400 });

  return (
    <textarea
      ref={textareaRef}
      className={className}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      placeholder={placeholder}
      style={{ resize: 'none', overflow: 'hidden' }}
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
              value={record[section.field] || ''}
              onChange={!isArchived ? (e) => onChange?.(section.field, e.target.value) : undefined}
              readOnly={isArchived}
            />
          </div>
        );
      })}
    </div>
  );
}