import { useState, useEffect } from "react";

interface UseDebouncedInputInterface<T> {
  initialValue: T;
  wait?: number;
  onChange: (value: T) => void;
}

interface UseDebouncedInputReturnInterface<T> {
  localValue: T
  onChange: (value: T) => void;
}

export function useDebouncedInput<T>({ initialValue, wait, onChange }: UseDebouncedInputInterface<T>): UseDebouncedInputReturnInterface<T> {
  const [localValue, setLocalValue] = useState<T>(initialValue);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLocalValue(initialValue);
  }, [initialValue]);

  function handleChange(newValue: T): void {
    setLocalValue(newValue);

    if (!wait) {
      onChange(newValue);
      return;
    }

    if (debounceTimeout) clearTimeout(debounceTimeout);

    const timeout = setTimeout(() => {
      onChange(newValue);
    }, wait);

    setDebounceTimeout(timeout);
  }

  return {
    localValue,
    onChange: handleChange,
  }
}