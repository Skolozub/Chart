import React, { useEffect, useMemo, useRef, useState } from "react";
import { line, select } from "d3";
import { CHART, GOAL } from "../constants";

import { DrawTooltip } from "./draw-tooltip";
import { AgeTick } from "./goals/age";

export const DrawXGoal = ({
  goal,
  chartWidth,
  chartHeight,
  xScale,
  yScale,
  onGoalClick
}) => {
  const [textBBox, setTextBBox] = useState(null);

  return (
    <>
      <AgeTick
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
        onGoalClick={onGoalClick}
      />
    </>
  );
};

const DrawLabel = ({ goal, xScale, yScale, textBBox, onGoalClick }) => {
  const labelDrawData = useMemo(() => {
    // circle center coordinate
    const circleXCenter = xScale(goal.date);
    const circleYCenter = yScale(goal.amount.value);
    const textYAge = textBBox ? textBBox.y : 0;

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
        circleXCenter,
        circleYCenter:
          textYAge -
          GOAL.LABEL.RADIUS -
          GOAL.LABEL.MARGIN -
          GOAL.LABEL.TRIANGLE.HEIGHT,
        isTriangleVisible: true
      };
    }

    return { circleXCenter, circleYCenter, isTriangleVisible: false };
  }, [goal.amount.value, goal.date, textBBox, xScale, yScale]);

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

  const bgColorActive =
    GOAL.LABEL.BACKGROUNDS_COLOR[goal.succeed ? "SUCCEED" : "UNSUCCEED"];
  const bgColor = goal.isActive
    ? bgColorActive
    : GOAL.LABEL.BACKGROUNDS_COLOR.SUCCEED;

  // ----------
  // const circleRef = useRef(null);
  // const [xTooltip, setXTooltip] = useState(null);
  // const [yTooltip, setYTooltip] = useState(null);

  // const setTooltipCoordsHandler = (event) => {
  //   const rect = event.currentTarget.getBoundingClientRect();

  //   setXTooltip(rect.x + GOAL.LABEL.RADIUS - 266 / 2);
  //   setYTooltip(rect.y - 76 - 10);
  // };

  // useEffect(() => {

  //   const rect = circleRef.current.getBoundingClientRect();

  //     setXTooltip(rect.x + GOAL.LABEL.RADIUS - 266 / 2);
  //     setYTooltip(rect.y - 76 - 10);
  // });

  // const rect = useBoundingClientRect(circleRef);

  // const x = (rect?.x || 0) + GOAL.LABEL.RADIUS - 266 / 2;
  // const y = (rect?.y || 0) - 76 - 10;

  // const resizeHandler = () => {
  //   const rect = circleRef.current.getBoundingClientRect();
  //   setXTooltip(labelDrawData.circleXCenter + GOAL.LABEL.RADIUS - 266 / 2);
  //   setYTooltip(labelDrawData.circleYCenter - 76 - 10);
  // };

  // const throttledResizeHandler = useRef(throttle(resizeHandler, 50)).current;
  // const throttledResizeHandler222 = useRef(resizeHandler).current;

  // useEffect(() => {
  //   if (!circleRef.current) {
  //     return void 0;
  //   }

  //   window.addEventListener("resize", throttledResizeHandler222);

  //   return () =>
  //     window.removeEventListener("resize", throttledResizeHandler222);
  // }, [circleRef, xTooltip, yTooltip, throttledResizeHandler222]);

  const xLabel = labelDrawData.circleXCenter - 266 / 2;
  const yLabel = labelDrawData.circleYCenter - GOAL.LABEL.RADIUS - 76 - 10;

  // -------------------------------------

  const ballonRef = useRef(null);

  // useEffect(() => {
  //   const ballon = select(ballonRef.current).attr("class", "ballon");

  //   // --------------- wrapper ---------------

  //   ballon.patternify({
  //     tag: "path",
  //     selector: "tail"
  //   });
  // });

  return (
    <g className="ballon-group" onClick={() => onGoalClick(goal.code)}>
      <g ref={ballonRef}>
        <path
          className="triangle"
          d={trianglePath}
          fill={bgColor}
          style={{ transition: GOAL.LABEL.DURATION }}
        />

        <circle
          className="circle"
          r={GOAL.LABEL.RADIUS}
          fill={bgColor}
          cx={xScale(goal.date)}
          cy={labelDrawData.circleYCenter}
          style={{ transition: GOAL.LABEL.DURATION }}
        />
        <image
          className="icon"
          xlinkHref={goal.icon}
          width={GOAL.LABEL.ICON.WIDTH}
          height={GOAL.LABEL.ICON.WIDTH}
          x={xScale(goal.date) - GOAL.LABEL.ICON.WIDTH / 2}
          y={labelDrawData.circleYCenter - GOAL.LABEL.ICON.HEIGHT / 2}
          style={{ transition: GOAL.LABEL.DURATION }}
        />
      </g>
      <DrawTooltip x={xLabel} y={yLabel} isActive={goal.isActive} />
    </g>
  );
};

// const DrawAge = ({
//   goal,
//   chartWidth,
//   chartHeight,
//   xScale,
//   textBBox,
//   setTextBBox
// }) => {
//   const textGroupRef = useRef(null);
//   const ageTextRef = useRef(null);

//   useEffect(() => {
//     console.log("draw");

//     // const text = select(ageTextRef.current);
//     // setTextBBox(text.node().getBBox());
//   });

//   // const xText = useMemo(
//   //   () => xScale(goal.date) - (textBBox?.width || 0) / 2,

//   //   [goal, xScale, textBBox]
//   // );

//   // const yText = useMemo(
//   //   () => chartHeight - GOAL.AGE.VALUE.MARGIN,

//   //   [chartHeight]
//   // );

//   // const ageLinePath = useMemo(() => {
//   //   const coords = [
//   //     [xScale(goal.date), chartHeight - GOAL.AGE.LINE.HEIGHT.TOP],
//   //     [xScale(goal.date), chartHeight + GOAL.AGE.LINE.HEIGHT.BOTTOM]
//   //   ];

//   //   return line()(coords);
//   // }, [goal, chartHeight, xScale]);

//   //  --------------------------------------------------------

//   const groupRef = useRef(null);

//   const xAgeText = useMemo(
//     () => xScale(goal.date) - (textBBox ? textBBox.width : 0) / 2,

//     [goal, xScale, textBBox]
//   );

//   const yAgeText = useMemo(
//     () => chartHeight - GOAL.AGE.VALUE.MARGIN,

//     [chartHeight]
//   );

//   useEffect(() => {
//     const group = select(groupRef.current).attr("class", "age-group");

//     // --------------- wrapper ---------------
//     const { width: textWidth = 0, height: textHeight = 0 } = textBBox || {};

//     group
//       .patternify({
//         tag: "rect",
//         selector: "wrapper"
//       })
//       .attr("width", textWidth + GOAL.AGE.VALUE.PADDING * 2)
//       .attr("height", textHeight)
//       .attr("x", xAgeText - GOAL.AGE.VALUE.PADDING)
//       .attr("y", textBBox ? textBBox.y : 0)
//       .attr("fill", GOAL.AGE.VALUE.BACKGROUND_COLOR);

//     const ageTicksCoords = [
//       [xScale(goal.date), chartHeight - GOAL.AGE.LINE.HEIGHT.TOP],
//       [xScale(goal.date), chartHeight + GOAL.AGE.LINE.HEIGHT.BOTTOM]
//     ];

//     // --------------- age-tick ---------------
//     group
//       .patternify({
//         tag: "path",
//         selector: "age-tick",
//         data: [ageTicksCoords]
//       })
//       .attr("stroke", GOAL.AGE.LINE.COLOR)
//       .attr("d", line());

//     // --------------- age-text ---------------
//     const ageText = select(ageTextRef.current).attr("class", "age-text");

//     ageText
//       // TODO: added to constants
//       .attr("font-family", "sans-serif")
//       .attr("fill", GOAL.AGE.VALUE.COLOR)
//       .attr("font-size", GOAL.AGE.VALUE.FONT_SIZE)
//       .attr("dy", "0.32em")
//       .attr("x", xAgeText)
//       .attr("y", yAgeText)
//       .call(() => {
//         if (!textBBox) {
//           setTextBBox(ageText.node().getBBox());
//         }
//       });
//   });

//   return (
//     <g>
//       <g ref={groupRef}></g>
//       <text ref={ageTextRef}>{`${GOAL.AGE.VALUE.TEXT} ${goal.age}`}</text>
//     </g>
//   );
// };
