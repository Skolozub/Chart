import * as d3 from "d3";

import { CHART } from "../constants";

export const drawChartBorders = (parentNode, width, height) => {
  // draw left and right lines
  const drawLine = d3.line();

  // added left line
  const leftLineCoords = [
    [CHART.MARGIN.LEFT, CHART.MARGIN.TOP],
    [CHART.MARGIN.LEFT, height + CHART.MARGIN.TOP + 10]
  ];

  parentNode
    .append("path")
    .attr("class", "left-chart-border")
    .attr("d", drawLine(leftLineCoords))
    .attr("stroke", CHART.BORDERS_COLOR);

  // added right line
  const rightLineCoords = [
    [width + CHART.MARGIN.LEFT, CHART.MARGIN.TOP],
    [width + CHART.MARGIN.LEFT, height + CHART.MARGIN.TOP + 10]
  ];

  parentNode
    .append("path")
    .attr("class", "right-chart-border")
    .attr("d", drawLine(rightLineCoords))
    .attr("stroke", CHART.BORDERS_COLOR);
};

export const drawChartLine = (parentNode, data, x, y) => {
  const drawLine = d3
    .line()
    .x((d) => x(d.date))
    .y((d) => y(d.value))
    .curve(CHART.CURVE_TYPE.EXPONENTIAL);

  parentNode
    .append("path")
    .data([data])
    .attr("d", drawLine)
    .attr("stroke", CHART.LINE_COLOR)
    .attr("fill", "none");
};
