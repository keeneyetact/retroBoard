import { useState, useEffect } from 'react';
import { getGiphyUrl } from '../api';

export default function useGiphy(giphyId: string | null) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!!giphyId) {
        const result = await getGiphyUrl(giphyId);
        setUrl(result);
      }
    }
    load();
  }, [giphyId]);

  return url;
}
