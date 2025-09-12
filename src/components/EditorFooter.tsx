import { Button } from "./ui/button";
import { useRecordEditor } from "@/containers/RecordEditorContext";
import { useData } from "@/dataManager";
import { createRecord, updateRecord } from "@/services/recordService";

export function EditorFooter() {
  const { record } = useRecordEditor();
  const { state, dispatch } = useData();

  const handleSave = async () => {
    try {
      if (!state.currentRecordId) {
        // 新建
        const saved = await createRecord(record);
        dispatch({ type: 'ADD_RECORD', payload: saved });
      } else {
        // 更新
        await updateRecord(record);
        dispatch({ type: 'UPDATE_RECORD', payload: record });
      }
    } catch (e) {
      console.error('保存失败', e);
    }
  };

  return (
    <footer className="h-16 border-t flex items-center justify-between px-4 bg-gray-50">
      <div /> {/* 占位左侧 */}
      {/* 右侧三个功能按钮 */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={handleSave}>保存</Button>
        <Button variant="outline">分析</Button>
        <Button variant="default">归档</Button>
      </div>
    </footer>
  );
}