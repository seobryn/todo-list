import { useEffect, useState } from "preact/hooks";

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const saved = localStorage.getItem(key);
  const [value, setValue] = useState<T>(
    saved ? JSON.parse(saved) : defaultValue
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue] as const;
}
