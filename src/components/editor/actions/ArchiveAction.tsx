import { Note } from "@/types";
import { useEditorContext } from "../editor-context";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ArchiveActionProps {
  onArchive: (note: Note) => Promise<void>; 
}

export const ArchiveAction: React.FC<ArchiveActionProps> = ({ onArchive }) => {
  const { currentNote, isDraft, isDirty, isArchived } = useEditorContext();
  const [isArchiving, setIsArchiving] = useState(false); 

  const disabled = isDraft || isDirty || isArchived || isArchiving;
  const handleArchive = async () => {
    setArchivePopoverOpen(false);
    if(disabled) return;

    setIsArchiving(true);
    try {
      await onArchive(currentNote); 
      console.log(isDirty);
    } catch (error) {
      alert("Saving failed!"); 
    } finally {
      setIsArchiving(false);
    }
  };

  const [ archivePopoverOpen, setArchivePopoverOpen ] = useState(false);

  return (
    <Popover open={archivePopoverOpen} onOpenChange={setArchivePopoverOpen}>
      <PopoverTrigger asChild>
        <Button variant="default" disabled={disabled}>
          {isArchiving ? "存档中" : "存档"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="center">
        <div className="flex flex-col gap-4">
          <p className="text-sm">确定要存档此记录吗？存档后将无法修改。</p>
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
              确认存档
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

