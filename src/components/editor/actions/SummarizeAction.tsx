import { Note } from "@/types";
import { useEditorContext } from "../editor-context";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ArchiveActionProps {
  onSummarize: (note: Note) => Promise<void>;
}

export const SummarizeAction: React.FC<ArchiveActionProps> = ({ onSummarize }) => {
  const { currentNote, isDirty, isDraft, isArchived } = useEditorContext();
  const [isSummarizing, setIsSummarizing] = useState(false); 

  const handleSummarize = async () => {
    if (!isDirty || isSummarizing) return;

    setIsSummarizing(true);
    try {
      await onSummarize(currentNote); 
    } catch (error) {
      alert("Saving failed!"); 
    } finally {
      setIsSummarizing(false);
    }
  };

  const disabled = isDraft || isDirty || isArchived;

  return (
    <Button variant="outline" onClick={handleSummarize} disabled={disabled}>
      {isSummarizing ? "分析中" : "分析"}
    </Button>
  );
};
