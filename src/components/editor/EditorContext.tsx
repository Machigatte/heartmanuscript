import { NoteDetail } from '@/models/NoteDetail';
import { createContext, useContext } from 'react';

interface EditorContextType {
  note: NoteDetail;
  isDraft: boolean
  isDirty: boolean;
  isArchived: boolean;
  isSaveDisabled: boolean;
  isSummarizeDisabled: boolean;
  isArchiveDisabled: boolean;
  onChange: (value: NoteDetail) => void;
  onSave: () => void;
  onSummarize: () => void;
  onArchive: () => void;
}

export const EditorContext = createContext<EditorContextType | null>(null);

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditorContext must be used within an EditorProvider');
  }
  return context;
};
