import { create } from 'zustand';

interface SidebarState {
  selectedNoteType: number;
  selectedNoteId: bigint | null;
  setSelectedNoteType: (type: number) => void,
  setSelectedNoteId: (id: bigint | null) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  selectedNoteType: 0,
  selectedNoteId: null,
  setSelectedNoteType: (type) => set({ selectedNoteType: type }),
  setSelectedNoteId: (id) => set({ selectedNoteId: id }),
}));
