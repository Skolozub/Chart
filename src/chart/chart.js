import * as d3 from "d3";

import { CHART } from "../constants";

// draw left and right chart lines
export const drawChartBorders = (parentNode, width, height) => {
  // added left line
  const leftLineCoords = [
    [CHART.MARGIN.LEFT, CHART.MARGIN.TOP],
    [CHART.MARGIN.LEFT, height + CHART.MARGIN.TOP + 10]
  ];

  parentNode
    .append("path")
    .attr("class", "left-chart-border")
    .attr("d", d3.line()(leftLineCoords))
    .attr("stroke", CHART.BORDER.COLOR);

  // added right line
  const rightLineCoords = [
    [width + CHART.MARGIN.LEFT, CHART.MARGIN.TOP],
    [
      width + CHART.MARGIN.LEFT,
      height + CHART.MARGIN.TOP + CHART.BORDER.BOTTOM_SEGMENT
    ]
  ];

  parentNode
    .append("path")
    .attr("class", "right-chart-border")
    .attr("d", d3.line()(rightLineCoords))
    .attr("stroke", CHART.BORDER.COLOR);
};

export const drawChartLine = (parentNode, data, x, y) => {
  const drawLine = d3
    .line()
    .x((d) => x(d.date))
    .y((d) => y(d.value))
    .curve(CHART.CURVE_TYPE.EXPONENTIAL);

  const path = parentNode
    .append("path")
    .attr("class", "chart-path")
    .data([data])
    .attr("d", drawLine)
    .attr("stroke", CHART.LINE_COLOR)
    .attr("fill", "none");

  const totalLength = path.node().getTotalLength();

  path
    .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
    .attr("stroke-dashoffset", totalLength)
    .transition()
    .duration(CHART.DURATION)
    .attr("stroke-dashoffset", 0);
};
