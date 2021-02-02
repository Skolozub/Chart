import { useEffect } from "react";

export const useOutsideRefClick = (ref, fn) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        fn(event);
      }
    }

    window.addEventListener("mousedown", handleClickOutside);

    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [ref, fn]);
};
