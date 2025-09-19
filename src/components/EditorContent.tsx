import { useRecordEditor } from "./RecordEditorContext";
import { RecordWrapper } from "./RecordWrapper";

export function EditorContent() {
  const { record, setRecord } = useRecordEditor();
  const type = record.noteType;
  const isArchived = Boolean(record.archivedAt);
  // const date = record.date; // 如需用date可解构

  const handleFieldChange = (field: string, value: string) => {
    setRecord(r => ({ ...r, [field]: value }));
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
      <div className="bg-white shadow rounded p-4">
        <RecordWrapper 
          type={type}
          record={record}
          isArchived={isArchived}
          onChange={handleFieldChange}
        />
      </div>
    </div>
  );
}