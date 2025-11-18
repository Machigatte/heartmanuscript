"use client"

import React, { createContext, useContext } from 'react';
import { useEditor } from "@/hooks/use-editor";
import { Note } from "@/types";

interface EditorContextType {
  currentNote: Note;
  isDirty: boolean;
  isDraft: boolean;
  isArchived: boolean;
  updateField: <K extends keyof Note>(key: K, newValue: Note[K]) => void;
  reset: () => void;
}

export const EditorContext = createContext<EditorContextType | undefined>(undefined);

interface EditorProviderProps {
  note: Note;
  onDirtyChange: (isDirty: boolean) => void;
  children: React.ReactNode;
}

export const EditorProvider: React.FC<EditorProviderProps> = ({ note, onDirtyChange, children }) => {
  const { currentNote, isDirty, isDraft, isArchived, updateField, reset } = useEditor(note, onDirtyChange);

  const contextValue: EditorContextType = {
    currentNote,
    isDirty,
    isDraft,
    isArchived,
    updateField,
    reset,
  };

  return (
    <EditorContext.Provider value={contextValue}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditorContext must be used within an EditorProvider');
  }
  return context;
};
