import React, { useMemo } from "react";
import { getYear } from "../../utils/common";
import { COMMON, RANGE_SLIDER } from "../constants";
import { Boundary } from "./boundary";

const RangeComponent = ({
  startPeriod,
  maxPeriod,
  invertX,
  xScale,
  xStart,
  xMax,
  xEnd,
  xMin,
  onChangeLeft,
  onChangeRight
}) => {
  const cxMax = useMemo(() => {
    const time = invertX(xEnd);
    const maxYear = getYear(time) - COMMON.ONE_YEAR;
    const date = new Date(time).setFullYear(maxYear);

    return xScale(date);
  }, [invertX, xEnd, xScale]);

  const cxMin = useMemo(() => {
    const time = invertX(xStart);
    const maxYear = getYear(time) + COMMON.ONE_YEAR;
    const date = new Date(time).setFullYear(maxYear);

    return xScale(date);
  }, [invertX, xStart, xScale]);

  return (
    <g
      transform={`translate(${RANGE_SLIDER.MARGIN.LEFT}, ${RANGE_SLIDER.RANGE.MARGIN_TOP})`}
    >
      <line
        x1={xScale(startPeriod)}
        y1={RANGE_SLIDER.RANGE.ACTIVE_LINE.Y1}
        x2={xScale(maxPeriod)}
        y2={RANGE_SLIDER.RANGE.ACTIVE_LINE.Y2}
        stroke={RANGE_SLIDER.RANGE.ACTIVE_LINE.STROKE}
        strokeWidth={RANGE_SLIDER.RANGE.ACTIVE_LINE.WIDTH}
      />
      <line
        x1={xStart}
        y1={RANGE_SLIDER.RANGE.LINE.Y1}
        x2={xEnd}
        y2={RANGE_SLIDER.RANGE.LINE.Y2}
        stroke={RANGE_SLIDER.RANGE.LINE.STROKE}
        strokeWidth={RANGE_SLIDER.RANGE.LINE.WIDTH}
      />
      <Boundary
        cxMin={xMin}
        cx={xStart}
        cxMax={cxMax}
        onChange={onChangeLeft}
      />
      <Boundary cxMin={cxMin} cx={xEnd} cxMax={xMax} onChange={onChangeRight} />
    </g>
  );
};

export const Range = React.memo(RangeComponent);
