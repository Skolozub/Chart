import React, { useEffect, useMemo, useRef, useState } from "react";
import { line, select } from "d3";
import { CHART, GOAL } from "../constants";
import { formatAmount } from "./utils";

export const DrawYGoal = ({ goal, chartWidth, chartHeight, yScale }) => {
  const path = useMemo(() => {
    const coords = [
      [0, yScale(goal.amount.value)],
      [chartWidth + CHART.MARGIN.RIGHT, yScale(goal.amount.value)]
    ];

    return line()(coords);
  }, [goal, chartWidth, yScale]);

  const textRef = useRef(null);
  const [textBBox, setTextBBox] = useState(null);

  useEffect(() => {
    if (textRef.current) {
      const text = select(textRef.current);

      setTextBBox(text.node().getBBox());
    }
  }, [goal]);

  const xText = useMemo(
    () =>
      chartWidth +
      CHART.MARGIN.RIGHT -
      (textBBox?.width || 0) -
      GOAL.AMOUNT.VALUE.PADDING.RIGHT,
    [textBBox, chartWidth]
  );

  const widthRect = useMemo(
    () =>
      (textBBox?.width || 0) +
      GOAL.AMOUNT.VALUE.PADDING.LEFT +
      GOAL.AMOUNT.VALUE.PADDING.RIGHT,
    [textBBox]
  );

  const xRect = useMemo(
    () => chartWidth + CHART.MARGIN.RIGHT - widthRect,

    [chartWidth, widthRect]
  );

  const yRect = useMemo(
    () => yScale(goal.amount.value) - GOAL.AMOUNT.VALUE.HEIGHT / 2,
    [goal, yScale]
  );

  if (
    yScale(goal.amount.value) < 0 ||
    yScale(goal.amount.value) > chartHeight
  ) {
    return null;
  }

  return (
    <>
      <path
        className="amount-line"
        d={path}
        stroke={GOAL.AMOUNT.LINE.COLOR}
        strokeDasharray={`${GOAL.AMOUNT.LINE.DASH_WIDTH}, ${GOAL.AMOUNT.LINE.DASH_GAP}`}
      />
      <g className="amount-label">
        <rect
          className="amount-rect"
          width={widthRect}
          height={GOAL.AMOUNT.VALUE.HEIGHT}
          fill={GOAL.AMOUNT.VALUE.BACKGROUND_COLOR}
          rx={GOAL.AMOUNT.VALUE.BORDER_RADIUS}
          ry={GOAL.AMOUNT.VALUE.BORDER_RADIUS}
          x={xRect}
          y={yRect}
        />
        <text
          ref={textRef}
          className="amount-text"
          fontFamily="sans-serif"
          fontSize={GOAL.AMOUNT.VALUE.FONT_SIZE}
          fill={GOAL.AMOUNT.VALUE.TEXT_COLOR}
          dy="0.32em"
          x={xText}
          y={yScale(goal.amount.value)}
        >
          {formatAmount(goal.amount.value)}
        </text>
      </g>
    </>
  );
};
