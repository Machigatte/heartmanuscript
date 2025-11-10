import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useState } from "react";
import { useEditorContext } from "./EditorContext";

export function EditorFooter() {
  const {
    isArchived,
    isSaveDisabled,
    isSummarizeDisabled,
    isArchiveDisabled,
    onSave,
    onSummarize,
    onArchive,
  } = useEditorContext();
  const [ archivePopoverOpen, setArchivePopoverOpen ] = useState(false);

  const handleArchive = () => {
    onArchive();
    setArchivePopoverOpen(false);
  }

  return (
    <footer className="h-16 border-t flex items-center justify-end px-4 bg-gray-50">
      <div className="flex gap-3">
        <Button variant="outline" onClick={onSave} disabled={isArchived || isSaveDisabled}>保存</Button>
        <Button variant="outline" onClick={onSummarize} disabled={isArchived || isSummarizeDisabled}>分析</Button>
        <Popover open={archivePopoverOpen} onOpenChange={setArchivePopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="default" disabled={isArchiveDisabled}>归档</Button>
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
                  onClick={handleArchive}
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