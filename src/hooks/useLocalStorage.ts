// hooks/useLocalStorage.ts
import { useEffect } from "preact/hooks";

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const saved = localStorage.getItem(key);
  let value = saved ? JSON.parse(saved) : defaultValue;

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  const setValue = (newValue: T | ((prev: T) => T)) => {
    if (typeof newValue === "function") {
      value = (newValue as (prev: T) => T)(value);
    } else {
      value = newValue;
    }
  };

  return [value, setValue] as const;
}
