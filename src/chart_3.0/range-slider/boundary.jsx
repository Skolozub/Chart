import React, { useCallback, useEffect, useRef, useState } from "react";
import { COMMON } from "../constants";

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
      // TODO: add to constants
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
    document.addEventListener("mouseup", endDragHandler);
    return () => document.removeEventListener("mouseup", endDragHandler);
  }, [endDragHandler]);

  useEffect(() => {
    document.addEventListener("mousemove", dragHandler);
    return () => document.removeEventListener("mousemove", dragHandler);
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
      onTouchStart={startDragHandler}
      onTouchMove={dragHandler}
      onTouchEnd={endDragHandler}
      style={{ transition: `r ${COMMON.TRANSITION_DURATION}ms` }}
    />
  );
};

export const Boundary = React.memo(BoundaryComponent);
