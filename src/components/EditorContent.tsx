import { useRecordEditor } from "../containers/RecordEditorContext";

export function EditorContent() {
  const { record } = useRecordEditor();
  const mode = record.type;
  // const date = record.date; // 如需用date可解构
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
      {/* 编辑展示区 */}
      <div className="bg-white shadow rounded p-4">
        {mode === "weekly" && (
          <div className="space-y-4">
            <h3 className="font-semibold">工作安排</h3>
            <textarea className="w-full border rounded p-2" rows={3}></textarea>
            <h3 className="font-semibold">资料</h3>
            <textarea className="w-full border rounded p-2" rows={3}></textarea>
            <h3 className="font-semibold">结果</h3>
            <textarea className="w-full border rounded p-2" rows={3}></textarea>
          </div>
        )}
        {mode === "research" && (
          <div className="space-y-4">
            <h3 className="font-semibold">实验安排</h3>
            <textarea className="w-full border rounded p-2" rows={3}></textarea>
            <h3 className="font-semibold">代码</h3>
            <textarea className="w-full border rounded p-2" rows={3}></textarea>
            <h3 className="font-semibold">结果</h3>
            <textarea className="w-full border rounded p-2" rows={3}></textarea>
          </div>
        )}
      </div>
    </div>
  );
}