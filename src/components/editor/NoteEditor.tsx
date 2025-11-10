import { EditorContent } from "./EditorContent";
import { EditorHeader } from "./EditorHeader";
import { EditorFooter } from "./EditorFooter";
import { EditorContext } from "./EditorContext";
import { useNoteEditor } from "@/hooks/useNoteEditor";
import { NoteDetail } from "@/models/NoteDetail";
import { useNote } from "@/hooks/useNote";
import { useArchiveNote, useCreateNote, useSummarizeNote, useUpdateNote } from "@/hooks/useNoteMutations";
import { defaultDraft, DRAFT_ID } from "@/constants/note";
import { usePreventWindowUnload } from "@/hooks/usePreventWindowUnload";
import { toNotePayload } from "@/api/types";
import EditorError from "./EditorError";
import EditorSkeleton from "./EditorSkeleton";

interface NoteEditorProps {
  currentNoteId: number;
  onNoteCreated: (note: NoteDetail) => void;
}

export function NoteEditor({
  currentNoteId,
  onNoteCreated,
}: NoteEditorProps) {

  const isDraft = currentNoteId === DRAFT_ID;

  /* --- 服务器状态 --- */
  const { data: note, isLoading, error, isError } = useNote(currentNoteId);

  const { mutate: createNote, isPending: isCreating } = useCreateNote({
    onSuccess: (newNote) => { 
      onNoteCreated(newNote); 
    },
  });
  const { mutate: updateNote, isPending: isUpdating } = useUpdateNote();
  const { mutate: summarizeNote, isPending: isSummarizing } = useSummarizeNote();
  const { mutate: archiveNote, isPending: isArchiving } = useArchiveNote();


  /* --- 本地状态 --- */
  const initialNote = isDraft ? defaultDraft : (note ?? defaultDraft);
  const { 
    currentNote,
    isDirty, 
    isArchived, 
    handleChange,
  } = useNoteEditor(initialNote, isDraft);
  usePreventWindowUnload(isDirty);

  const handleSave = async () => {
    const notePayload = toNotePayload(currentNote);
    if (isDraft) {
      createNote(notePayload);
    } else {
      updateNote({ id: currentNoteId, data: notePayload });
    }
  }

  const handleSummarize = async () => {
    if (!isDraft) summarizeNote(currentNoteId);
  }

  const handleArchive = async () => {
    if (!isDraft) archiveNote(currentNoteId);
  }

  const isSaveDisabled = !isDirty || isCreating || isUpdating;
  const isSummarizeDisabled = isDraft || isSummarizing;
  const isArchiveDisabled = isDraft || isArchiving || isArchived;

  const contextValue = {
    note: currentNote,
    isDraft,
    isDirty,
    isArchived,
    isSaveDisabled,
    isSummarizeDisabled,
    isArchiveDisabled,
    onChange: handleChange,
    onSave: handleSave,
    onSummarize: handleSummarize,
    onArchive: handleArchive,
  };

  if (isLoading) {
    return (
      <EditorSkeleton />
    )
  }

  if(isError) {
    return (
      <EditorError />
    )
  }

  return (
    <EditorContext.Provider value={contextValue}>
      <div className="flex flex-col h-full">
        <EditorHeader />
        <EditorContent />
        <EditorFooter />
      </div>
    </EditorContext.Provider>
  );
}
