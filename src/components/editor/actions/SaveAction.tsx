import { Note } from "@/types";
import { useEditorContext } from "../editor-context";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SaveActionProps {
  onSave: (note: Note) => Promise<void>; 
}

export const SaveAction: React.FC<SaveActionProps> = ({ onSave }) => {
  const { currentNote, isDirty } = useEditorContext();
  const [isSaving, setIsSaving] = useState(false); 

  const disabled = !isDirty || isSaving;
  const handleSave = async () => {
    if(disabled) return;

    setIsSaving(true);
    try {
      await onSave(currentNote); 
    } catch (error) {
      alert("Saving failed!"); 
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Button variant="outline" onClick={handleSave} disabled={disabled}>
        {isSaving ? "保存中" : "保存"}
      </Button>
    </>
  );
};
