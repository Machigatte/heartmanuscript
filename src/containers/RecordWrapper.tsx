import { useRecordEditor } from "./RecordEditorContext";

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
  }
};

export function RecordWrapper({ type, record, isArchived, onChange }: RecordWrapperProps) {
  const config = typeConfig[type as keyof typeof typeConfig] || { sections: [] };

  return (
    <div className="space-y-4">
      {config.sections.map((section) => {
        if (section.optional && !record[section.field]) return null;
        return (
          <div key={section.field}>
            <h3 className="font-semibold">{section.label}</h3>
            <textarea
              className="w-full border rounded p-2"
              rows={3}
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