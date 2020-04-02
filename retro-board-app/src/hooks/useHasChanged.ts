import usePrevious from './usePrevious';

/**
 * Returns true if the provided item changed since last render
 * @param item Variable to watch
 */
export default function useHasChanged<T>(item: T): boolean {
  const previous = usePrevious(item);
  return item !== previous;
}
