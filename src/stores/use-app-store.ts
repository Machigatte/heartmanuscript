import { SearchParams } from '@/types';
import { create } from 'zustand';

interface AppState {
  isDirty: boolean;
  setDirty: (isDirty: boolean) => void;
  searchParams: SearchParams;
  setSearchParams: (params: SearchParams) => void;
};

export const useAppStore = create<AppState>((set) => ({
  isDirty: false,
  setDirty: (isDirty) => set({isDirty: isDirty}),
  searchParams: {},
  setSearchParams: (params) => set({ searchParams: params }),
}));
