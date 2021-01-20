import React, { useEffect, useMemo, useRef, useState } from "react";
import { line, select } from "d3";
import { GOAL } from "../constants";

export const DrawAge = ({ age, date, chartWidth, chartHeight, xScale }) => {
  const textRef = useRef(null);
  const [bBox, setBBox] = useState(null);

  useEffect(() => {
    const text = select(textRef.current);
    setBBox(text.node().getBBox());
  }, [age, chartWidth, chartHeight]);

  const xText = useMemo(
    () => xScale(date) - (bBox?.width || 0) / 2,

    [date, xScale, bBox]
  );

  const yText = useMemo(
    () => chartHeight - GOAL.AGE.VALUE.MARGIN,

    [chartHeight]
  );

  const ageLinePath = useMemo(() => {
    const coords = [
      [xScale(date), chartHeight - GOAL.AGE.LINE.HEIGHT.TOP],
      [xScale(date), chartHeight + GOAL.AGE.LINE.HEIGHT.BOTTOM]
    ];

    return line()(coords);
  }, [date, chartHeight, xScale]);

  return (
    <g className="age-group">
      <rect
        width={(bBox?.width || 0) + GOAL.AGE.VALUE.PADDING * 2}
        height={bBox?.height || 0}
        x={xText - GOAL.AGE.VALUE.PADDING}
        y={bBox?.y || 0}
        fill={GOAL.AGE.VALUE.BACKGROUND_COLOR}
      />
      <path className="age-line" d={ageLinePath} stroke={GOAL.AGE.LINE.COLOR} />
      <text
        ref={textRef}
        className="age-text"
        fontFamily="sans-serif"
        fill={GOAL.AGE.VALUE.COLOR}
        fontSize={GOAL.AGE.VALUE.FONT_SIZE}
        dy="0.32em"
        x={xText}
        y={yText}
      >
        {`${GOAL.AGE.VALUE.TEXT} ${age}`}
      </text>
    </g>
  );
};
