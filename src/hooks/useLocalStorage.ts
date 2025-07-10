// hooks/useLocalStorage.ts
import { useEffect } from "preact/hooks";
import { signal } from "@preact/signals";

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const saved = localStorage.getItem(key);
  const initialValue = saved ? JSON.parse(saved) : defaultValue;
  const value = signal<T>(initialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value.value));
  }, [value.value]);

  const setValue = (newValue: T | ((prev: T) => T)) => {
    if (typeof newValue === "function") {
      value.value = (newValue as (prev: T) => T)(value.value);
    } else {
      value.value = newValue;
    }
  };

  return [value, setValue] as const;
}
