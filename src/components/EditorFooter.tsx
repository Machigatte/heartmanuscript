import { Button } from "./ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { useRecordEditor } from "@/containers/RecordEditorContext";
import { useData } from "@/dataManager";
import { createRecord, updateRecord, archiveRecord, analyseRecord} from "@/services/recordService";
import { toast } from "sonner"
import { useState } from "react";

export function EditorFooter() {
  const { record } = useRecordEditor();
  const { state, dispatch, loadRecords } = useData();
  const isArchived = Boolean(record.archivedAt);

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

  const handleAnalyse = async () => {
    try {
      if (!state.currentRecordId || state.isModified) {
        toast("请先保存记录再进行分析");
        return;
      }

      const result = await analyseRecord(record);
      dispatch({ type: 'UPDATE_RECORD', payload: result });
      // loadRecords();
      toast("分析成功");
    } catch (e) {
      toast("分析失败");
    }
  };

  const [archivePopoverOpen, setArchivePopoverOpen] = useState(false);

  const confirmArchive = async () => {
    setArchivePopoverOpen(false);
    
    if (!state.currentRecordId || state.isModified) {
      toast("请先保存记录再进行归档");
      return;
    }

    try {
      const isArchived = Boolean(record.archivedAt);
      if (isArchived) {
        toast("记录已归档，无需重复操作");
        return;
      }
      const archived = await archiveRecord(record);
      dispatch({ type: 'UPDATE_RECORD', payload: archived });
      toast("归档成功");
    } catch (e) {
      toast("归档失败");
    }
  };

  return (
    <footer className="h-16 border-t flex items-center justify-between px-4 bg-gray-50">
      <div /> {/* 占位左侧 */}
      {/* 右侧三个功能按钮 */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={handleSave} disabled={isArchived}>保存</Button>
        <Button variant="outline" onClick={handleAnalyse} disabled={isArchived}>分析</Button>
        <Popover open={archivePopoverOpen} onOpenChange={setArchivePopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="default">归档</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="center">
            <div className="flex flex-col gap-4">
              <p className="text-sm">确定要归档此记录吗？归档后将无法修改。</p>
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setArchivePopoverOpen(false)}
                >
                  取消
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={confirmArchive}
                >
                  确认归档
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </footer>
  );
}