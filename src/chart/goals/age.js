import React, { useEffect, useMemo, useRef } from "react";
import { line, select } from "d3";
import { GOAL, HALF } from "../../constants";

export const AgeTick = ({
  goal,
  chartWidth,
  chartHeight,
  xScale,
  textBBox,
  setTextBBox
}) => {
  const groupRef = useRef(null);
  const ageTextRef = useRef(null);

  useEffect(() => {
    const text = select(ageTextRef.current);
    setTextBBox(text.node().getBBox());
  }, [goal, chartWidth, chartHeight, setTextBBox]);

  const xAgeText = useMemo(
    () => xScale(goal.date) - (textBBox ? textBBox.width : 0) / HALF,

    [goal, xScale, textBBox]
  );

  const yAgeText = useMemo(
    () => chartHeight - GOAL.AGE.VALUE.MARGIN,

    [chartHeight]
  );

  useEffect(() => {
    const group = select(groupRef.current).attr("class", "age-group");

    // --------------- wrapper ---------------
    const { width: textWidth = 0, height: textHeight = 0 } = textBBox || {};

    group
      .patternify({
        tag: "rect",
        selector: "wrapper"
      })
      .attr("width", textWidth + GOAL.AGE.VALUE.PADDING * 2)
      .attr("height", textHeight)
      .attr("x", xAgeText - GOAL.AGE.VALUE.PADDING)
      .attr("y", textBBox ? textBBox.y : 0)
      .attr("fill", GOAL.AGE.VALUE.BACKGROUND_COLOR);

    const ageTicksCoords = [
      [xScale(goal.date), chartHeight - GOAL.AGE.LINE.HEIGHT.TOP],
      [xScale(goal.date), chartHeight + GOAL.AGE.LINE.HEIGHT.BOTTOM]
    ];

    // --------------- age-tick ---------------
    group
      .patternify({
        tag: "path",
        selector: "age-tick",
        data: [ageTicksCoords]
      })
      .attr("stroke", GOAL.AGE.LINE.COLOR)
      .attr("d", line());

    // --------------- age-text ---------------
    const ageText = select(ageTextRef.current).attr("class", "age-text");

    ageText
      // TODO: added to constants
      .attr("font-family", "sans-serif")
      .attr("fill", GOAL.AGE.VALUE.COLOR)
      .attr("font-size", GOAL.AGE.VALUE.FONT_SIZE)
      .attr("dy", "0.32em")
      .attr("x", xAgeText)
      .attr("y", yAgeText)
      .call(() => {
        if (!textBBox) {
          setTextBBox(ageText.node().getBBox());
        }
      });
  }, [
    chartHeight,
    goal.date,
    textBBox,
    xAgeText,
    xScale,
    yAgeText,
    setTextBBox
  ]);

  return (
    <g>
      <g ref={groupRef}></g>
      <text ref={ageTextRef}>{`${GOAL.AGE.VALUE.TEXT} ${goal.age}`}</text>
    </g>
  );
};
