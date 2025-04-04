import { RefObject, useEffect } from "react";

export const useOutsideClick = (refs: RefObject<any>[], fn: () => void) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        refs.every((ref) => {
          return ref.current && !ref.current.contains(event.target);
        })
      ) {
        fn();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs]);
};
