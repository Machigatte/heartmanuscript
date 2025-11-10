import { create } from 'zustand';

type NoteStoreState = {
  currentNoteId: number | null;
  isDirty: boolean;

  setCurrentNoteId: (id: number | null) => void;
  setDirty: (dirty: boolean) => void;
};

export const useNoteStore = create<NoteStoreState>((set) => ({
  // --- 状态 (State) ---
  currentNoteId: null, // 当前正在编辑的笔记 ID
  isDirty: false,      // 编辑器内容是否已修改但未保存

  // --- 动作 (Actions) ---

  /**
   * 切换当前编辑的笔记。
   * @param {string | null} id - 新的笔记 ID
   */
  setCurrentNoteId: (id) => set({ currentNoteId: id }),

  /**
   * 设置编辑器的修改状态。
   * @param {boolean} dirty - true 表示已修改，false 表示已保存/干净
   */
  setDirty: (dirty) => set({ isDirty: dirty }),
}));
