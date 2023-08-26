import { databases } from '@/appwrite';
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import { create } from 'zustand';

export const useBoardStore = create((set) => ({
  board: {
    columns: new Map(),
  },

  searchString : "",
  
  setSearchString: (searchString) => set({searchString}),

  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    //To affect the value to board state
    set({ board });
  },

  setBoardState: (board) => set({ board }),

  updateToDoInDB: async (todo, columnId) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    );
  }
}));
