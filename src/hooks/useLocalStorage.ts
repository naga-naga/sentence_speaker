import { useState } from 'react';

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? (JSON.parse(stored) as T) : initial;
    } catch {
      return initial;
    }
  });

  function set(next: T) {
    setValue(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // localStorage が使えない環境（プライベートブラウズ容量超過など）は無視
    }
  }

  return [value, set] as const;
}
