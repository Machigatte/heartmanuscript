import { fieldMap } from '../../constants/note';
import { AutoResizeTextarea } from "./AutoResizeTextarea";
import { useEditorContext } from './EditorContext';

export function EditorContent() {
  const { note, isArchived, onChange } = useEditorContext();
  const field = fieldMap[note.type];

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
      <div className="bg-white shadow rounded p-4">
        <div className="space-y-4">
          {field.sections.map(section => {
            const value = note[section.field];
            if (section.optional && value === '') return null;

            return (
              <div key={section.field}>
                <h3 className="font-semibold">{section.label}</h3>
                <AutoResizeTextarea
                  value={value}
                  onChange={e => onChange({ ...note, [section.field]: e.target.value })}
                  readOnly={isArchived}
                  className="w-full border rounded p-2"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
