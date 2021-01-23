import { useEffect, useRef, useState } from "react";
import { throttle } from "lodash";

export const useBoundingClientRect = (ref, throttleTime = 300) => {
  const [rect, setRect] = useState(null);

  const resizeHandler = () => {
    if (ref.current) {
      const elementRect = ref.current.getBoundingClientRect();
      setRect(elementRect);
    }
  };

  const throttledResizeHandler = useRef(throttle(resizeHandler, throttleTime))
    .current;

  useEffect(() => {
    if (!ref.current) {
      return void 0;
    }

    if (!rect) {
      throttledResizeHandler();
    }

    window.addEventListener("resize", throttledResizeHandler);

    return () => window.removeEventListener("resize", throttledResizeHandler);
  }, [ref, rect, throttledResizeHandler]);

  return rect;
};
