import React, { useMemo } from "react";
import { range } from "lodash";
import { getTime, getYear } from "../../utils/common";
import { COMMON, RANGE_SLIDER } from "../constants";

const AxisComponent = ({
  startPeriod,
  maxPeriod,
  xScale,
  invertX,
  xStart,
  xEnd
}) => {
  const rangeAxis = useMemo(
    () =>
      range(getYear(startPeriod) + 1, getYear(maxPeriod) + 1).map((year) => {
        const time = getTime(`${year}-01-01`);
        return {
          year,
          cx: xScale(time),
          isActive: time >= invertX(xStart) && time <= invertX(xEnd)
        };
      }),
    [startPeriod, maxPeriod, xScale, invertX, xStart, xEnd]
  );

  return (
    <g
      transform={`translate(${RANGE_SLIDER.MARGIN.LEFT}, ${RANGE_SLIDER.MARGIN.TOP})`}
    >
      {rangeAxis.map(({ year, cx, isActive }) => (
        <g key={cx}>
          {year % 5 ? (
            <circle
              cy={RANGE_SLIDER.AXIS.CIRCLE.CY}
              cx={cx}
              r={RANGE_SLIDER.AXIS.CIRCLE.R}
              fill={
                isActive
                  ? RANGE_SLIDER.AXIS.ACTIVE_COLOR
                  : RANGE_SLIDER.AXIS.COLOR
              }
              style={{ transition: `fill ${COMMON.TRANSITION_DURATION}ms` }}
            />
          ) : (
            <>
              <line
                x1={cx}
                y1={RANGE_SLIDER.AXIS.LINE.Y1}
                x2={cx}
                y2={RANGE_SLIDER.AXIS.LINE.Y2}
                stroke={
                  isActive
                    ? RANGE_SLIDER.AXIS.ACTIVE_COLOR
                    : RANGE_SLIDER.AXIS.COLOR
                }
                style={{ transition: `stroke ${COMMON.TRANSITION_DURATION}ms` }}
              />
              <text
                x={cx}
                y={RANGE_SLIDER.AXIS.TEXT.Y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={
                  isActive
                    ? RANGE_SLIDER.AXIS.ACTIVE_COLOR
                    : RANGE_SLIDER.AXIS.TEXT.COLOR
                }
                fontSize={RANGE_SLIDER.AXIS.TEXT.FONT_SIZE}
                dy={RANGE_SLIDER.AXIS.TEXT.DY}
                fontFamily="sans-serif"
                style={{ transition: `fill ${COMMON.TRANSITION_DURATION}ms` }}
              >
                {year}
              </text>
            </>
          )}
        </g>
      ))}
    </g>
  );
};

export const Axis = React.memo(AxisComponent);
