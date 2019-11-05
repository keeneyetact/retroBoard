import shortid from 'shortid';
import { SessionOptions, ColumnDefinition } from 'retro-board-common';

export async function createCustomGame(
  options: SessionOptions,
  columns: ColumnDefinition[]
): Promise<string | null> {
  const id = shortid();
  const response = await fetch(`/api/create/${id}`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify({ options, columns }),
  });
  if (response.ok) {
    return id;
  }
  return null;
}
