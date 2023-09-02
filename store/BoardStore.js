import { databases, storage, ID } from '@/appwrite';
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import uploadImage from '@/lib/uploadImage';
import { create } from 'zustand';

export const useBoardStore = create((set, get) => ({
  board: {
    columns: new Map(),
  },

  searchString: '',

  setSearchString: (searchString) => set({ searchString }),

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
  },

  deleteTask: async (taskIndex, todo, id) => {
    const newColunms = new Map(get().board.columns);

    //delete todoId from newColumns
    newColunms.get(id)?.todos.splice(taskIndex, 1);

    set({ board: { columns: newColunms } });

    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
    }

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID,
      todo.$id
    );
  },

  newTaskInput: '',
  setNewTaskInput: (newTaskInput) => set({ newTaskInput }),

  newTaskType: 'todo',
  setNewTaskType: (id) => set({ newTaskType: id }),

  image: null,
  setImage: (image) => set({ image }),

  addTask: async (todo, columnId, image) => {
    let file;

    if (image) {
      const fileUploaded = await uploadImage(image);
      if (fileUploaded) {
        file = {
          bucketId: fileUploaded.bucketId,
          fileId: fileUploaded.$id,
        };
      }
    }

    const { $id } = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID,
      ID.unique(),
      {
        title: todo,
        status: columnId,
        ...(file && { image: JSON.stringify(file) }),
      }
    );

    set((state) => {
      const newColumns = new Map(state.board.columns);

      const newTodo = {
        $id,
        $createdAt: new Date().toISOString(),
        title: todo,
        status: columnId,
        ...(file && { image: file }),
      };

      const column = newColumns.get(columnId);

      if (!column) {
        newColumns.set(columnId, {
          id: columnId,
          todos: [newTodo],
        });
      } else {
        newColumns.get(columnId)?.todos.push(newTodo);
      }

      return {
        board: {
          columns: newColumns,
        },
      };
    });
  },
}));
