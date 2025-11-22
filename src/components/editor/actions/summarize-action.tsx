import { Hotkey } from "@/components/common/hotkey";
import { useEditorContext } from "../editor-context";
import { Button } from "@/components/ui/button";
import { useSummarizeNote } from "@/hooks/use-note-mutations";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export const SummarizeAction: React.FC = () => {
  const { currentNote, isDirty, isDraft, isArchived } = useEditorContext();
  const { mutate: summarizeNote, isPending } = useSummarizeNote();

  const handleSummarize = async () => {
    if (disabled) return;
    summarizeNote(currentNote);
  };

  const disabled = isDraft || isDirty || isArchived || isPending;

  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <Button variant="outline" onClick={handleSummarize} disabled={disabled}>
          {isPending ? "分析中" : "分析"}
        </Button>
      </TooltipTrigger>
      <TooltipContent >
          Alt + A
      </TooltipContent>
      <Hotkey
        shortcuts={[
          {
            keyTrigger: "a", altKey: true
          }
        ]}
        onTrigger={handleSummarize}
        showLabel={false}
      />
    </Tooltip>
  );
};
