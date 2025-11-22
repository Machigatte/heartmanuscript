import React from "react";
import { EditorProvider } from './editor-context';
import { Note } from "@/types";
import { EditorActions } from "./editor-actions";
import { EditorContent } from "./editor-content";
import { EditorHeader } from "./editor-header";
import EditorSkeleton from "./editor-skeleton";

interface EditorProps {
  note: Note;
  isLoading?: boolean;
  children: React.ReactNode;
}

export const EditorBase: React.FC<EditorProps> = ({ note, isLoading, children }) => {
  if (isLoading) {
    return (
      <EditorSkeleton />
    )
  }
  return (
    <EditorProvider note={note}>
      <div className="flex flex-col h-full">
        {children}
      </div>
    </EditorProvider>
  );
};

// 将 Actions 挂载到 Editor 上
type EditorComponent = React.FC<EditorProps> & {
  Header: typeof EditorHeader;
  Content: typeof EditorContent;
  Actions: typeof EditorActions;
};

export const Editor = EditorBase as EditorComponent;

Editor.Header = EditorHeader;
Editor.Content = EditorContent;
Editor.Actions = EditorActions;
