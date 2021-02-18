import React, { useMemo } from "react";
import { range } from "lodash";
import { getTime, getYear } from "../../utils/common";
import { COMMON, RANGE_SLIDER } from "../constants";

const AxisComponent = ({
  rangeWidth,
  startPeriod,
  maxPeriod,
  xScale,
  invertX,
  xStart,
  xEnd
}) => {
  const startYear = useMemo(() => getYear(startPeriod), [startPeriod]);
  const maxYear = useMemo(() => getYear(maxPeriod), [maxPeriod]);

  const rangeAxis = useMemo(
    () =>
      range(startYear + 1, maxYear + 1).map((year) => {
        const time = getTime(`${year}-01-01`);
        return {
          year,
          cx: xScale(time),
          isActive: time >= invertX(xStart) && time <= invertX(xEnd)
        };
      }),
    [startYear, maxYear, xScale, invertX, xStart, xEnd]
  );

  const ticksCount = rangeWidth / 8;
  const tickValue = Math.ceil((maxYear - startYear) / ticksCount);

  const visibleYears = range(startYear, maxYear, tickValue);
  const everyFiveYears = range(startYear, maxYear, 5);

  return (
    <g
      transform={`translate(${RANGE_SLIDER.MARGIN.LEFT}, ${RANGE_SLIDER.MARGIN.TOP})`}
    >
      {rangeAxis.map(({ year, cx, isActive }) => (
        <g key={cx}>
          {visibleYears.includes(year) && (
            <>
              {everyFiveYears.includes(year) ? (
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
                    style={{
                      transition: `stroke ${COMMON.TRANSITION_DURATION}ms`
                    }}
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
                    style={{
                      transition: `fill ${COMMON.TRANSITION_DURATION}ms`
                    }}
                  >
                    {year}
                  </text>
                </>
              ) : (
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
              )}
            </>
          )}
        </g>
      ))}
    </g>
  );
};

export const Axis = React.memo(AxisComponent);
