import { useState, useEffect, useCallback } from 'react';
import _ from 'lodash'; // 用于深度比较
import { useNoteStore } from '@/stores/useNoteStore';
import { isNoteArchived } from '@/components/editor/utils';
import { NoteDetail } from '@/models/NoteDetail';


export const useNoteEditor = (note: NoteDetail, isDraft: boolean) => {
  // --- 1. 内部状态 ---
  const [currentNote, setCurrentNote] = useState(note);
  const [savedNote, setSavedNote] = useState(note);

  // --- 2. 全局状态同步 (Zustand) ---
  const setDirty = useNoteStore(state => state.setDirty);

  // --- 3. 派生状态 (Derived State) ---
  const isArchived = isNoteArchived(savedNote);
  const isDirty = isDraft || !_.isEqual(currentNote, savedNote);

  // --- 4. 生命周期管理：同步 Props 变化 ---
  useEffect(() => {
    // 当外部 initialNote 变化时，重置内部状态
    setCurrentNote(note);
    setSavedNote(note);
    // 重置后，全局 isDirty 也应该被清空
    setDirty(false); 
  }, [note, setDirty]);

  // --- 5. 关键集成：同步局部 isDirty 到全局 Store ---
  useEffect(() => {
    setDirty(isDirty);
  }, [isDirty, setDirty]);


  // --- 6. 状态操作函数 (Actions) ---
  const handleChange = useCallback((newNote: NoteDetail) => {
    setCurrentNote(newNote);
  }, []);

  return {
    currentNote,
    isDirty,
    isArchived,
    handleChange,
  };
};
