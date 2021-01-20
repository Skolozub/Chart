import React, { useEffect, useMemo, useRef, useState } from "react";
import { select } from "d3";
import { CHART, GOAL } from "../constants";
import { formatAmount } from "./utils";

export const DrawAmountLabel = ({ amount, chartWidth, yScale }) => {
  const textRef = useRef(null);
  const [textBBox, setTextBBox] = useState(null);

  useEffect(() => {
    const text = select(textRef.current);
    setTextBBox(text.node().getBBox());
  }, [amount]);

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
    () => yScale(amount.value) - GOAL.AMOUNT.VALUE.HEIGHT / 2,
    [amount.value, yScale]
  );

  return (
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
        y={yScale(amount.value)}
      >
        {formatAmount(amount.value)}
      </text>
    </g>
  );
};
