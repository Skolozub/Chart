import React, { useEffect, useMemo, useRef, useState } from "react";
import { line, select } from "d3";
import { CHART, GOAL } from "../constants";

export const DrawLabel = ({ goal, xScale, yScale, textBBox, onGoalClick }) => {
  const imageRef = useRef(null);
  const labelRef = useRef(null);

  const labelDrawData = (() => {
    // circle center coordinate
    const circleXCenter = xScale(goal.date);
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
  })();

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

  const bgColorActive =
    GOAL.LABEL.BACKGROUNDS_COLOR[goal.succeed ? "SUCCEED" : "UNSUCCEED"];

  const bgColor = goal.isActive
    ? bgColorActive
    : GOAL.LABEL.BACKGROUNDS_COLOR.SUCCEED;

  // if (labelRef.current) {
  //   select(labelRef.current).on("click", function (event) {
  //     onGoalClick(goal.code);
  //     select(".tooltip")
  //       .style("top", `${event.pageY}px`)
  //       .style("left", `${event.pageX}px`);
  //   });
  // }
  const getCoords = (event, f, g, h) => {
    select(".tooltip")
      .style("top", `${event.pageY}px`)
      .style("left", `${event.pageX}px`);
  };

  useEffect;

  return (
    <g className="tooltip" filter="url(#tooltip_shadows)">
      <rect
        width={266}
        height={76}
        fill="#fff"
        strokeWidth={1}
        stroke="rgba(38, 38, 38, 0.08)"
        rx="20"
        ry="20"
        x={100}
        y={100}
      />
    </g>
  );
};
