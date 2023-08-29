import formatTodosForAI from './formatTodosForAI';

export default async function fetchSuggestion(board) {
  const todos = formatTodosForAI(board);

  const res = await fetch('/api/generateSummary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ todos }),
  });

  const { content } = await res.json();
  return content;
}
