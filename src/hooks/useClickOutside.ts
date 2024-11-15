import { useEffect, useRef } from "react";

export const useClickOutside = <T extends HTMLElement>(
  onClickOutside: () => void,
  ignoreCondition?: (element: HTMLElement) => boolean
) => {
  const $ref = useRef<T | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        $ref.current &&
        !$ref.current.contains(target) &&
        !(ignoreCondition && ignoreCondition(target))
      ) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickOutside, ignoreCondition]);

  return { $ref };
};
