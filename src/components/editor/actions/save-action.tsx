import { useCreateNote, useUpdateNote } from "@/hooks/use-note-mutations";
import { useEditorContext } from "../editor-context";
import { Button } from "@/components/ui/button";
import { DRAFT_ID } from "@/constants/note";
import { Hotkey } from "@/components/common/hotkey";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export const SaveAction: React.FC = () => {
  const queryClient = useQueryClient();
  const { currentNote, isDirty } = useEditorContext();
  const router = useRouter();
  const { mutate: createNote, isPending: isCreating } = useCreateNote({
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.replace(`/notes/${data.id}`);
    }
  });
  const { mutate: updateNote, isPending: isUpdating } = useUpdateNote();

  const isPending = isCreating || isUpdating;

  const disabled = !isDirty || isPending;
  const handleSave = async () => {
    if(disabled) return;
    if(currentNote.id === DRAFT_ID) {
      createNote(currentNote);
    } else {
      updateNote(currentNote);
    }
  };

  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <Button variant="outline" onClick={handleSave} disabled={disabled}>
          {isPending ? "保存中" : "保存"}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        Ctrl + S
      </TooltipContent>
      <Hotkey
        shortcuts={[
          {
            keyTrigger: "s", ctrlKey: true
          }
        ]}
        onTrigger={handleSave}
        showLabel={false}
      />
    </Tooltip>
  );
};
