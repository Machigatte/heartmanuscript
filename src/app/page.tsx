"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useConfirmDialog } from "@/components/dialog/ConfirmDialogContext";
import { QueryProvider } from "@/components/QueryProvider";
import { NoteDetail } from "@/models/NoteDetail";
import { DRAFT_ID } from "@/constants/note";
import { NoteEditor } from "@/components/editor";
import { useNoteStore } from "@/stores/useNoteStore";
import React from "react";
import { NoteSidebar } from "@/components/sidebar";
import { Home } from "@/components/Home";

export default function NotePage() {
  const { currentNoteId, isDirty, setCurrentNoteId } = useNoteStore();
  const { show } = useConfirmDialog();

  const handleNewNote = () => {
    setCurrentNoteId(DRAFT_ID);
  }

  const handleNoteCreated = (newNote: NoteDetail) => {
    setCurrentNoteId(newNote.id);
  }

  const handleDeleteNote = (id: number) => {
    if (currentNoteId === id) setCurrentNoteId(null);
  }

  const handleNoteSelect = (id: number) => {
    if (isDirty && id !== currentNoteId) {
      show({
        title: "更改未保存",
        description: "确定要离开吗？如果您现在离开，您当前的信息不会被保存。",
        confirmText: "留下",
        cancelText: "离开",
        onCancel: () => {
          setCurrentNoteId(id)
        }
      });
    } else {
      setCurrentNoteId(id)
    }
  }

  return (
    <React.Fragment>
      <QueryProvider>
        <ResizablePanelGroup className="h-screen w-64" direction="horizontal">
          <ResizablePanel defaultSize={20} minSize={16} maxSize={30}>
            {/* 左侧历史记录 */}
            <NoteSidebar
              onSelectNote={handleNoteSelect}
              onNewNote={handleNewNote}
              onDeleteNote={handleDeleteNote}
            />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={80} className="h-screen flex-1 flex flex-col">
            {/* 右侧编辑区域 */}
            {
              currentNoteId &&
              <NoteEditor
                currentNoteId={currentNoteId}
                onNoteCreated={handleNoteCreated}
              />
            }
            {
              !currentNoteId &&
              <Home onCreateNew={handleNewNote} />
            }
          </ResizablePanel>
        </ResizablePanelGroup>
      </QueryProvider>
    </React.Fragment>
  );
}
