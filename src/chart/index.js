import React, { useRef, useEffect, useState } from "react";
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
  const [chart, setChart] = useState(null);

  // initialize useEffect
  useEffect(() => {
    const svg = d3
      .select(chartArea.current)
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .style("background", SVG.BACKGROUND_COLOR);

    const chartWidth = svgWidth - CHART.MARGIN.LEFT - CHART.MARGIN.RIGHT;
    const chartHeight = svgHeight - CHART.MARGIN.TOP - CHART.MARGIN.BOTTOM;

    const chartNode = svg
      .append("g")
      .attr("width", chartWidth)
      .attr("height", chartHeight)
      .attr("class", "chart")
      .attr(
        "transform",
        `translate(${CHART.MARGIN.LEFT}, ${CHART.MARGIN.TOP})`
      );

    drawChartBorders(svg, chartWidth, chartHeight);

    setChart({
      node: chartNode,
      width: chartWidth,
      height: chartHeight
    });
  }, [svgWidth, svgHeight]);

  useEffect(() => {
    if (!chart) return void 0;

    // redraw chart
    chart.node.selectAll("*").remove();

    // chart.node.exit().remove()

    // --------------- Chart scales ---------------
    // scale data by x
    const x = d3
      .scaleTime()
      .domain(d3.extent(chartData, (d) => d.date))
      .range([0, chart.width]);

    // scale data by y
    const max = d3.max(chartData, (d) => d.value);
    const cd = Math.round(max / AXIS.Y.COUNT);
    const yMax = max + cd;

    const y = d3.scaleLinear().domain([0, yMax]).range([chart.height, 0]);

    // ------------------- Axis -------------------
    drawRightAxis(chart.node, y, chart.width);
    drawBottomAxis(chart.node, x, chart.height);

    // ---------------- Chart line ----------------
    drawChartLine(chart.node, chartData, x, y);

    drawGoals(chart.node, goalsData, x, y, chart.width, chart.height);
  }, [chart, chartData, goalsData]);

  return <svg ref={chartArea}></svg>;
};
