import { Button } from "./ui/button";
import { useRecordEditor } from "@/containers/RecordEditorContext";
import { useData } from "@/dataManager";
import { createRecord, updateRecord } from "@/services/recordService";
import { toast } from "sonner"

export function EditorFooter() {
  const { record } = useRecordEditor();
  const { state, dispatch } = useData();

  const handleSave = async () => {
    try {
      if (!state.currentRecordId) {
        // 新建
        const saved = await createRecord(record);
        dispatch({ type: 'ADD_RECORD', payload: saved });
        toast("新建成功")
      } else {
        // 更新
        await updateRecord(record);
        dispatch({ type: 'UPDATE_RECORD', payload: record });
        toast("更新成功")
      }
    } catch (e) {
      toast("发生错误，保存失败")
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