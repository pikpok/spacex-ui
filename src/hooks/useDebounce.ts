import { useEffect, useState } from 'react';

export const useDebounce = <T = string>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearInterval(timeout);
  }, [value, delay]);

  return debouncedValue;
};
