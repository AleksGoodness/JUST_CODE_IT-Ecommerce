import { useEffect, useRef } from 'react';

export function useDebounceCallback(
  callback: (range: number[]) => void,
  delay: number,
): (range: number[]) => void {
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (range: number[]) => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      callback(range);
    }, delay);
  };
}
