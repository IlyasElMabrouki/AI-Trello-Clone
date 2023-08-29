export default function formatTodosForAI(board) {
  const todos = Array.from(board.columns.entries());

  const flatArray = todos.reduce((map, [key, value]) => {
    map[key] = value.todos;
    return map;
  }, {});

  const flatArrayCounted = Object.entries(flatArray).reduce(
    (map, [key, value]) => {
      map[key] = value.length;
      return map;
    },
    {}
  );
  return flatArrayCounted;
}
