const requestConfig: Partial<RequestInit> = {
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
  redirect: 'follow',
  referrer: 'no-referrer',
};

export async function getPortalUrl(): Promise<string | null> {
  const response = await fetch(`/api/stripe/portal`, {
    method: 'GET',
    ...requestConfig,
  });
  if (response.ok) {
    const session: { url: string } = await response.json();
    return session.url;
  }
  return null;
}
