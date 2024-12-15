import { useRef, useCallback } from "react";

export const useDebounce = (setValue, delay) => {
  const debounceTimeout = useRef(null);

  const debounceFunction = useCallback(
    (e) => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        setValue(e.target.value);
      }, delay);
    },
    [setValue, delay]
  );

  return { debounceFunction };
};
