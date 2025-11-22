import { useEditorContext } from "../editor-context";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useArchiveNote } from "@/hooks/use-note-mutations";
import { Hotkey } from "@/components/common/hotkey";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export const ArchiveAction: React.FC = () => {
  const { currentNote, isDraft, isDirty, isArchived } = useEditorContext();
  const { mutate: archiveNote, isPending } = useArchiveNote();

  const disabled = isDraft || isDirty || isArchived || isPending;
  const handleArchive = async () => {
    setArchivePopoverOpen(false);
    if (disabled) return;
    archiveNote(currentNote);
  };

  const [archivePopoverOpen, setArchivePopoverOpen] = useState(false);
  const handleOpenPopver = () => {
    if (disabled) return;
    setArchivePopoverOpen(true);
  }

  return (
    <Tooltip delayDuration={300}>
      <Popover open={archivePopoverOpen} onOpenChange={setArchivePopoverOpen}>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button variant="default" disabled={disabled}>
              {isPending ? "存档中" : "存档"}
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>
          Ctrl + Shift + A
        </TooltipContent>
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
      <Hotkey
        shortcuts={[
          {
            keyTrigger: "a", ctrlKey: true, shiftKey: true
          }
        ]}
        onTrigger={handleOpenPopver}
        showLabel={false}
      />
    </Tooltip>
  );
};

