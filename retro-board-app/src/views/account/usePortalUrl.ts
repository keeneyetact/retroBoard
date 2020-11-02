import { getPortalUrl } from './api';
import { useEffect, useState } from 'react';

export default function usePortalUrl(): string | null {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    async function fetchUrl() {
      const url = await getPortalUrl();
      setUrl(url);
    }
    fetchUrl();
  }, []);

  return url;
}
