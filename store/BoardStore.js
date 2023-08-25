import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import { create } from 'zustand';

export const useBoardStore = create((set) => ({
  board: {
    columns: new Map(),
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    //To affect the value to board state
    set({ board });
  },
}));
