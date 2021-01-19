import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

import { AXIS, CHART, SVG } from "../constants";
import { drawBottomAxis, drawRightAxis } from "./axis";
import { drawChartBorders, drawChartPath } from "./chart";
import { drawGoals } from "./goals";

export const Chart = ({
  chartData,
  goalsData,
  svgWidth = SVG.WIDTH,
  svgHeight = SVG.HEIGHT
}) => {
  const svgRef = useRef(null);
  const chartWidth = svgWidth - CHART.MARGIN.LEFT - CHART.MARGIN.RIGHT;
  const chartHeight = svgHeight - CHART.MARGIN.TOP - CHART.MARGIN.BOTTOM;
  const chartTransform = `translate(${CHART.MARGIN.LEFT}, ${CHART.MARGIN.TOP})`;

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const chartNode = svg.select(".chart");

    // --------------- Chart scales ---------------
    // scale data by x
    const x = d3
      .scaleTime()
      .domain(d3.extent(chartData, (d) => d.date))
      .range([0, chartWidth]);

    // scale data by y
    const max = d3.max(chartData, (d) => d.value);
    const cd = Math.round(max / AXIS.Y.COUNT);
    const yMax = max + cd;

    const y = d3.scaleLinear().domain([0, yMax]).range([chartHeight, 0]);

    drawRightAxis(chartNode, y, chartWidth);
    // drawBottomAxis(chartNode, x, chartHeight);

    drawChartBorders(chartNode, chartWidth, chartHeight);
    drawChartPath(chartNode, chartData, x, y);

    // drawGoals(chartNode, goalsData, x, y, chartWidth, chartHeight);
  }, [chartData, goalsData, chartWidth, chartHeight]);

  return (
    <svg
      ref={svgRef}
      width={svgWidth}
      height={svgHeight}
      style={{ background: SVG.BACKGROUND_COLOR }}
    >
      <g
        className="chart"
        width={chartWidth}
        height={chartHeight}
        transform={chartTransform}
      ></g>
      <g className="goals"></g>
    </svg>
  );
};
