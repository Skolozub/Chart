import React, { useCallback, useEffect, useRef, useState } from "react";

const RADIUS = 6;
const RADIUS_ACTIVE = 10;
const BORDER = 4;

const BoundaryComponent = ({ cxMin, cx, cxMax, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);

  const startDragHandler = useCallback((event) => {
    // event.preventDefault();
    setIsDragging(true);
  }, []);

  const endDragHandler = useCallback((event) => {
    // event.preventDefault();
    setIsDragging(false);
  }, []);

  const dragHandler = useCallback(
    (event) => {
      // event.preventDefault();
      if (!isDragging || event.clientX <= 0 || event.clientY <= 0) {
        return void 0;
      }

      const { pageX } =
        event.type === "touchmove" ? event.targetTouches[0] : event;
      // TODO: add constant
      const cxNext = pageX - 20 - RADIUS;

      if (cxNext <= cxMin) {
        onChange(cxMin);
      } else if (cxNext >= cxMax) {
        onChange(cxMax);
      } else {
        onChange(cxNext);
      }
    },
    [isDragging, cxMin, cxMax, onChange]
  );

  useEffect(() => {
    window.addEventListener("mouseup", endDragHandler);
    return () => window.removeEventListener("mouseup", endDragHandler);
  }, [endDragHandler]);

  useEffect(() => {
    window.addEventListener("mousemove", dragHandler);
    return () => window.removeEventListener("mousemove", dragHandler);
  }, [dragHandler]);

  return (
    <circle
      r={isDragging ? RADIUS_ACTIVE : RADIUS}
      strokeWidth={BORDER}
      stroke="#08A652"
      fill="#FFFFFF"
      cx={cx}
      cy={0}
      onMouseDown={startDragHandler}
      onMouseMove={dragHandler}
      onTouchStart={startDragHandler}
      onTouchMove={dragHandler}
      onTouchEnd={endDragHandler}
    />
  );
};

export const Boundary = React.memo(BoundaryComponent);
