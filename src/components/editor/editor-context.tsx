"use client"

import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { useEditor } from "@/hooks/use-editor";
import { Note } from "@/types";

interface EditorContextType {
  currentNote: Note;
  isDirty: boolean;
  isDraft: boolean;
  isArchived: boolean;
  updateField: <K extends keyof Note>(key: K, newValue: Note[K]) => void;
  reset: () => void;

  realtimeSummary: string;
  setRealtimeSummary: Dispatch<SetStateAction<string>>;
}

export const EditorContext = createContext<EditorContextType | undefined>(undefined);

interface EditorProviderProps {
  note: Note;
  children: React.ReactNode;
}

export const EditorProvider: React.FC<EditorProviderProps> = ({ note, children }) => {
  const { currentNote, isDirty, isDraft, isArchived, updateField, reset } = useEditor(note);

  const [realtimeSummary, setRealtimeSummary] = useState('');

  const contextValue: EditorContextType = {
    currentNote,
    isDirty,
    isDraft,
    isArchived,
    updateField,
    reset,
    realtimeSummary,
    setRealtimeSummary
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
