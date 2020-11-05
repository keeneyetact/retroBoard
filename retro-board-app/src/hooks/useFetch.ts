import { useState, useEffect } from 'react';

export type FetchResponse<T> = [T, boolean, Error | null];

function useFetch<T>(url: string | null, defaultValue: T): FetchResponse<T> {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T>(defaultValue);

  useEffect(() => {
    async function fetchData() {
      if (url) {
        const response = await fetch(url);
        if (response.ok) {
          const responseData = await response.json();
          setData(responseData);
          setLoading(false);
          setError(null);
        } else {
          setLoading(false);
          setError(new Error('Unspecified error'));
        }
      }
    }
    if (url) {
      setLoading(true);
      fetchData();
    } else {
      setLoading(false);
      setError(null);
    }
  }, [url]);

  return [data, loading, error];
}

export default useFetch;
