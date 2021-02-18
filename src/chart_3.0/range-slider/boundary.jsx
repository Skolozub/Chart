import React, { useCallback } from "react";
import { useHorizontalDragging } from "../../useHorizontalDragging";
import { COMMON } from "../constants";

const RADIUS = 6;
const RADIUS_ACTIVE = 10;
const BORDER = 4;

const BoundaryComponent = ({ cxMin, cx, cxMax, onChange, railsRef }) => {
  const onChangeHandler = useCallback(
    (cxNext) => {
      const validCXNext = Math.min(Math.max(cxMin, cxNext), cxMax);
      onChange(validCXNext);
    },
    [cxMax, cxMin, onChange]
  );

  const [draggingRef, isDragging] = useHorizontalDragging(
    railsRef,
    onChangeHandler
  );

  return (
    <circle
      ref={draggingRef}
      r={isDragging ? RADIUS_ACTIVE : RADIUS}
      strokeWidth={BORDER}
      stroke="#08A652"
      fill="#FFFFFF"
      cx={cx}
      cy={0}
      style={{ transition: `r ${COMMON.TRANSITION_DURATION}ms` }}
    />
  );
};

export const Boundary = React.memo(BoundaryComponent);
