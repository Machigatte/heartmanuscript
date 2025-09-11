import { Button } from "./ui/button";
import { useRecordEditor } from "@/containers/RecordEditorContext";
import { useData } from "@/dataManager";
import { saveRecord } from "@/services/recordService";

export function EditorFooter() {
  const { record } = useRecordEditor();
  const { state, dispatch } = useData();

  const handleSave = async () => {
    try {
      if(!state.currentRecordId) {
        // 保存草稿
        const saved = await saveRecord(record);
        dispatch({ type: 'ADD_RECORD', payload: saved });
      } else {
        // 更新已有记录
        const saved = await saveRecord(record);
        dispatch({ type: 'UPDATE_RECORD', payload: saved });
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