"use client";
import React, { use } from "react";
import { Editor } from "@/components/editor/editor";
import { SaveAction } from "@/components/editor/actions/save-action";
import { ArchiveAction } from "@/components/editor/actions/archive-action";
import { useNote } from "@/hooks/use-note";
import EditorSkeleton from "@/components/editor/editor-skeleton";
import { SummarizeStreamAction } from "@/components/editor/actions/summarize-stream-action";
import { useRequireAuth } from "@/hooks/use-require-auth";

export default function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  useRequireAuth();

  const { id } = use(params)

  let bigintId: bigint | null = null;
  if (id && id !== "draft") {
    bigintId = BigInt(id);
  }

  const { data: note, isLoading: isNoteLoading } = useNote(bigintId);

  return (
    <React.Fragment>
      {/* 编辑区域 */}
      {isNoteLoading && <EditorSkeleton />}
      {
        note &&
        <Editor key={note.id} note={note}>
          <Editor.Header />
          <Editor.Content />
          <Editor.Actions>
            <SaveAction />
            <SummarizeStreamAction />
            <ArchiveAction />
          </Editor.Actions>
        </Editor>
      }
    </React.Fragment>
  );
}
