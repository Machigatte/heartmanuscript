import { fieldMap } from '../../constants/note';
import { AutoResizeTextarea } from "./auto-resize-textarea";
import { useEditorContext } from './editor-context';

export function EditorContent() {
  const { currentNote, updateField } = useEditorContext();

  const field = fieldMap[currentNote.type];

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
      <div className="bg-white shadow rounded p-4">
        <div className="space-y-4">
          {field.sections.map(section => {
            const text = currentNote[section.field];
            if (section.optional && text === '') return null;

            return (
              <div key={section.field}>
                <h3 className="font-semibold">{section.label}</h3>
                <AutoResizeTextarea
                  value={text || ''}
                  onChange={e => {updateField(section.field, e.target.value)}}
                  readOnly={false}
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
