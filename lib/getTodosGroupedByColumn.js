import { databases } from '@/appwrite';

export const getTodosGroupedByColumn = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID
  );
  const todos = data.documents;

  const colomns = todos.reduce((acc, todo) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      });
    }

    acc.get(todo.status).todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
      image: JSON.parse(todo.image),
    });
    return acc;
  }, new Map());

  const colomnTypes = ['todo', 'inProgress', 'done'];

  for (const colomnType of colomnTypes) {
    if (!colomns.get(colomnType)) {
      colomns.set(colomnType, {
        id: colomnType,
        todos: [],
      });
    }
  }

  const sortedColomns = new Map(
    Array.from(colomns.entries()).sort(
      (a, b) => colomnTypes.indexOf(a[0]) - colomnTypes.indexOf(b[0])
    )
  );

  const board = {
    columns: sortedColomns,
  };
  
  return board;
};
