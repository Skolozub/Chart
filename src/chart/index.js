import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

import { AXIS, CHART, SVG } from "../constants";
import { drawBottomAxis, drawRightAxis } from "./axis";
import { drawChartBorders, drawChartLine } from "./chart";
import { drawGoals } from "./goals";

export const Chart = ({
  chartData,
  goalsData,
  svgWidth = SVG.WIDTH,
  svgHeight = SVG.HEIGHT
}) => {
  const chartArea = useRef(null);

  useEffect(() => {
    const svg = d3
      .select(chartArea.current)
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .style("background", SVG.BACKGROUND_COLOR);

    // redraw chart
    svg.selectAll("*").remove();

    const chartWidth = svgWidth - CHART.MARGIN.LEFT - CHART.MARGIN.RIGHT;
    const chartHeight = svgHeight - CHART.MARGIN.TOP - CHART.MARGIN.BOTTOM;

    const chartNode = svg
      .append("g")
      .attr("class", "chart")
      .attr("width", chartWidth)
      .attr("height", chartHeight)
      .attr(
        "transform",
        `translate(${CHART.MARGIN.LEFT}, ${CHART.MARGIN.TOP})`
      );

    drawChartBorders(svg, chartWidth, chartHeight);

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

    // ------------------- Axis -------------------
    drawRightAxis(chartNode, y, chartWidth);
    drawBottomAxis(chartNode, x, chartHeight);

    // ---------------- Chart line ----------------
    drawChartLine(chartNode, chartData, x, y);

    drawGoals(chartNode, goalsData, x, y, chartWidth, chartHeight);
  }, [chartData, goalsData, svgWidth, svgHeight]);

  return <svg ref={chartArea}></svg>;
};
