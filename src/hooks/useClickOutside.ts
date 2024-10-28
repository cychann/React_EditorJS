import { useEffect, useRef } from "react";

export const useClickOutside = <T extends HTMLElement>(
  onClickOutside: () => void
) => {
  const $ref = useRef<T | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if ($ref.current && !$ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickOutside]);

  return { $ref };
};
