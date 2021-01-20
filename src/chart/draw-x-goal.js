import React, { useEffect, useMemo, useRef, useState } from "react";
import { line, select } from "d3";
import { CHART, GOAL } from "../constants";

export const DrawXGoal = ({
  goal,
  chartWidth,
  chartHeight,
  xScale,
  yScale
}) => {
  const [textBBox, setTextBBox] = useState(null);

  return (
    <>
      <DrawAge
        goal={goal}
        chartWidth={chartWidth}
        chartHeight={chartHeight}
        xScale={xScale}
        textBBox={textBBox}
        setTextBBox={setTextBBox}
      />
      <DrawLabel
        goal={goal}
        xScale={xScale}
        yScale={yScale}
        textBBox={textBBox}
      />
    </>
  );
};

const DrawLabel = ({ goal, xScale, yScale, textBBox }) => {
  const imageRef = useRef(null);

  const labelDrawData = useMemo(() => {
    // circle y center coordinate
    const circleYCenter = yScale(goal.amount.value);
    const textYAge = textBBox?.y || 0;

    // label y bottom coordinate
    const labelYBottom =
      circleYCenter +
      GOAL.LABEL.RADIUS +
      GOAL.LABEL.TRIANGLE.HEIGHT +
      GOAL.LABEL.MARGIN;

    // label y top coordinate
    const labelYTop = circleYCenter - CHART.MARGIN.TOP;

    // if label y bottom coordinate more then text y top coordinate
    // or
    // if label y top coordinate more then chart y top coordinate
    // recalculate circle y center coordinate
    if (labelYBottom > textYAge || labelYTop < 0) {
      return {
        circleYCenter:
          textYAge -
          GOAL.LABEL.RADIUS -
          GOAL.LABEL.MARGIN -
          GOAL.LABEL.TRIANGLE.HEIGHT,
        isTriangleVisible: true
      };
    }

    return { circleYCenter, isTriangleVisible: false };
  }, [goal, textBBox, yScale]);

  const trianglePath = useMemo(() => {
    const { circleYCenter, isTriangleVisible } = labelDrawData;
    const circleYBottom = circleYCenter + GOAL.LABEL.RADIUS;
    const topTriangleY = isTriangleVisible
      ? circleYBottom + GOAL.LABEL.TRIANGLE.MARGIN
      : circleYBottom - GOAL.LABEL.TRIANGLE.HEIGHT;

    const triangleCoords = [
      [
        //centerBottom
        xScale(goal.date),
        topTriangleY + GOAL.LABEL.TRIANGLE.HEIGHT
      ],
      [
        //topLeft
        xScale(goal.date) - GOAL.LABEL.TRIANGLE.WIDTH / 2,
        topTriangleY
      ],
      [
        // topRight
        xScale(goal.date) + GOAL.LABEL.TRIANGLE.WIDTH / 2,
        topTriangleY
      ]
    ];

    return line()(triangleCoords);
  }, [goal.date, xScale, labelDrawData]);

  useEffect(() => {
    const imageSelection = select(imageRef.current);
    imageSelection.attr("xlink:href", goal.icon);
  }, [goal.icon]);

  const backgroundColor =
    GOAL.LABEL.BACKGROUNDS_COLOR[goal.succeed ? "SUCCEED" : "UNSUCCEED"];

  return (
    <g className="label">
      <path
        className="triangle"
        d={trianglePath}
        fill={backgroundColor}
        style={{ transition: GOAL.LABEL.DURATION }}
      />
      <circle
        className="circle"
        r={GOAL.LABEL.RADIUS}
        fill={backgroundColor}
        cx={xScale(goal.date)}
        cy={labelDrawData.circleYCenter}
        style={{ transition: GOAL.LABEL.DURATION }}
      />
      <image
        className="icon"
        ref={imageRef}
        width={GOAL.LABEL.ICON.WIDTH}
        height={GOAL.LABEL.ICON.WIDTH}
        x={xScale(goal.date) - GOAL.LABEL.ICON.WIDTH / 2}
        y={labelDrawData.circleYCenter - GOAL.LABEL.ICON.HEIGHT / 2}
        style={{ transition: GOAL.LABEL.DURATION }}
      />
    </g>
  );
};

const DrawAge = ({
  goal,
  chartWidth,
  chartHeight,
  xScale,
  textBBox,
  setTextBBox
}) => {
  const textRef = useRef(null);

  useEffect(() => {
    const text = select(textRef.current);
    setTextBBox(text.node().getBBox());
  }, [goal, chartWidth, chartHeight, setTextBBox]);

  const xText = useMemo(
    () => xScale(goal.date) - (textBBox?.width || 0) / 2,

    [goal, xScale, textBBox]
  );

  const yText = useMemo(
    () => chartHeight - GOAL.AGE.VALUE.MARGIN,

    [chartHeight]
  );

  const ageLinePath = useMemo(() => {
    const coords = [
      [xScale(goal.date), chartHeight - GOAL.AGE.LINE.HEIGHT.TOP],
      [xScale(goal.date), chartHeight + GOAL.AGE.LINE.HEIGHT.BOTTOM]
    ];

    return line()(coords);
  }, [goal, chartHeight, xScale]);

  return (
    <g className="age-group">
      <rect
        width={(textBBox?.width || 0) + GOAL.AGE.VALUE.PADDING * 2}
        height={textBBox?.height || 0}
        x={xText - GOAL.AGE.VALUE.PADDING}
        y={textBBox?.y || 0}
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
        {`${GOAL.AGE.VALUE.TEXT} ${goal.age}`}
      </text>
    </g>
  );
};
