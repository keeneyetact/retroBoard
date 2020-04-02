import { useState, useEffect, useCallback } from 'react';
import { getGiphyUrl } from '../api';
import useHasChanged from './useHasChanged';

/**
 * Implements logic to show or hide the Gipy Image.
 * Returns an array of:
 *  - Giphy image URL
 *  - Whether to show the Giphy image or not
 *  - A toggle to force showing the image (or force hidding it)
 * @param giphyId Giphy ID
 */
export default function useGiphy(
  giphyId: string | null
): [string | null, boolean, () => void] {
  const [url, setUrl] = useState<string | null>(null);
  const hasGiphyChanged = useHasChanged(giphyId);
  const isNewGiphy = hasGiphyChanged && !!giphyId;
  const [showImage, setShowImage] = useState(isNewGiphy);

  const toggleShowImage = useCallback(() => {
    setShowImage(prev => !prev);
  }, []);

  useEffect(() => {
    if (isNewGiphy) {
      setShowImage(true);
    }
  }, [isNewGiphy]);

  useEffect(() => {
    async function load() {
      if (!!giphyId) {
        const result = await getGiphyUrl(giphyId);
        setUrl(result);
      }
    }
    load();
  }, [giphyId]);

  return [url, showImage, toggleShowImage];
}
