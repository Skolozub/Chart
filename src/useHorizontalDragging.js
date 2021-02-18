import { useCallback, useEffect, useRef, useState } from "react";

export const useHorizontalDragging = (railsRef, onChange) => {
  const draggingElementRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const onChangeHandler = useCallback(
    (event) => {
      if (railsRef.current) {
        const marginLeft =
          railsRef.current.clientLeft +
          railsRef.current.getBoundingClientRect().left +
          window.scrollX;

        if (event instanceof TouchEvent) {
          onChange(event.changedTouches[0].pageX - marginLeft);
        } else if (event instanceof MouseEvent && event.clientX > 0) {
          onChange(event.pageX - marginLeft);
        }
      }

      return void 0;
    },
    [railsRef, onChange]
  );

  const handleStart = useCallback(
    (event) => {
      event.preventDefault();
      setIsDragging(true);
      onChangeHandler(event);
    },
    [onChangeHandler]
  );

  const handleMove = useCallback(
    (event) => {
      event.preventDefault();
      if (isDragging) {
        onChangeHandler(event);
      }
      return void 0;
    },
    [isDragging, onChangeHandler]
  );

  const handleEnd = useCallback((event) => {
    event.preventDefault();
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("touchend", handleEnd, { passive: false });
      document.addEventListener("touchmove", handleMove, { passive: false });
      return () => {
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleEnd);
        document.removeEventListener("touchmove", handleMove);
        document.removeEventListener("touchend", handleEnd);
      };
    }

    const node = draggingElementRef.current;
    if (!node) {
      return void 0;
    }

    node.addEventListener("mousedown", handleStart);
    node.addEventListener("touchstart", handleStart, { passive: false });
    return () => {
      node.removeEventListener("mousedown", handleStart);
      node.removeEventListener("touchstart", handleStart);
    };
  }, [isDragging, handleStart, handleEnd, handleMove]);

  return [draggingElementRef, isDragging];
};
