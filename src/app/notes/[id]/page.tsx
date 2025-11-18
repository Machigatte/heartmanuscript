"use client";
import React, { use, useEffect } from "react";
import { Editor } from "@/components/editor/editor";
import { Note } from "@/types";
import { SaveAction } from "@/components/editor/actions/SaveAction";
import { ArchiveAction } from "@/components/editor/actions/ArchiveAction";
import { SummarizeAction } from "@/components/editor/actions/SummarizeAction";
import { useSidebarStore } from "@/stores/use-sidebar-store";
import { useNote } from "@/hooks/use-note";
import EditorSkeleton from "@/components/editor/editor-skeleton";
import { useArchiveNote, useCreateNote, useSummarizeNote, useUpdateNote } from "@/hooks/use-note-mutations";
import { DRAFT_ID } from "@/constants/note";

export default function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)

  const isDraft = id === 'draft';
  const { setSelectedNoteId } = useSidebarStore();

  useEffect(() => {
    setSelectedNoteId(!isDraft ? BigInt(id) : DRAFT_ID);
  }, [id, isDraft, setSelectedNoteId]);

  let bigintId: bigint | null = null;
  if (id && id !== "draft") {
    bigintId = BigInt(id);
  }

  const { data: note, isLoading: isNoteLoading } = useNote(bigintId);

  const { mutate: createNote } = useCreateNote();
  const { mutate: updateNote } = useUpdateNote();
  const { mutate: archiveNote } = useArchiveNote();
  const { mutate: summarizeNote } = useSummarizeNote();

  const handleSaveNote = async (note: Note) => {
    if(note.id === DRAFT_ID) {
      createNote(note);
    } else {
      updateNote(note);
    }
  }

  const handleArchiveNote = async (note: Note) => {
    archiveNote(note);
  }

  const handleSummarizeNote = async (note: Note) => {
    summarizeNote(note);
  }

  return (
    <React.Fragment>
      {/* 编辑区域 */}
      {isNoteLoading && <EditorSkeleton />}
      {
        note &&
        <Editor key={note.id} note={note} onDirtyChange={(dirty) => console.log(dirty)}>
          <Editor.Header />
          <Editor.Content />
          <Editor.Actions>
            <SaveAction onSave={handleSaveNote} />
            <SummarizeAction onSummarize={handleSummarizeNote} />
            <ArchiveAction onArchive={handleArchiveNote} />
          </Editor.Actions>
        </Editor>
      }
    </React.Fragment>
  );
}
