import * as d3 from "d3";

import { CHART } from "../constants";

// draw left and right chart lines
export const drawChartBorders = (parentNode, width, height) => {
  const drawLine = d3.line();

  const drawBorder = (data, postfix) => {
    const path = parentNode
      .selectAll(`path.chart-border-${postfix}`)
      .data([data]);

    // draw
    path.attr("d", drawLine);

    // update
    path
      .enter()
      .append("path")
      .attr("d", drawLine)
      .attr("class", `chart-border-${postfix}`)
      .attr("stroke", CHART.BORDER.COLOR);

    // remove
    path.exit().remove();
  };

  const leftBorderCoords = [
    [0, 0],
    [0, height + CHART.BORDER.BOTTOM_SEGMENT]
  ];

  const rightBorderCoords = [
    [width, 0],
    [width, height + CHART.BORDER.BOTTOM_SEGMENT]
  ];

  drawBorder(leftBorderCoords, "left");
  drawBorder(rightBorderCoords, "right");
};

export const drawChartPath = (parentNode, data, x, y) => {
  const drawLine = d3
    .line()
    .x((d) => x(d.date))
    .y((d) => y(d.value))
    .curve(CHART.CURVE_TYPE.EXPONENTIAL);

  const path = parentNode.selectAll("path.chart-path").data([data]);

  // draw
  path.attr("d", drawLine);

  // update
  const updatedPath = path
    .enter()
    .append("path")
    .attr("d", drawLine)
    .attr("class", "chart-path")
    .attr("stroke", CHART.LINE_COLOR)
    .attr("fill", "none");

  // animate
  const totalLength = path.merge(updatedPath).node().getTotalLength();

  path
    .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
    .attr("stroke-dashoffset", totalLength)
    .transition()
    .duration(CHART.DURATION)
    .attr("stroke-dashoffset", 0);

  // remove
  path.exit().remove();
};
