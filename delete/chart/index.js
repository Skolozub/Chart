import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

import { CHART, SVG } from "./constants";
import { drawBottomAxis, drawRightAxis } from "./axis";
import { drawChartBorders, drawChartLine } from "./chart";

export const ChartT = ({
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
      .attr("height", svgHeight);

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

    // --------------- Chart scales ---------------
    // scale data by x
    const x = d3
      .scaleTime()
      .domain(d3.extent(chartData, (d) => d.date))
      .range([0, chart.width]);

    // scale data by y
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, (d) => d.value)])
      .range([chart.height, 0]);

    // ---------------- Chart line ----------------
    drawChartLine(chart.node, chartData, x, y);

    // ------------------- Axis -------------------
    drawRightAxis(chart.node, y, chart.width);
    drawBottomAxis(chart.node, x, chart.height);
  }, [chart, chartData]);

  return <svg ref={chartArea} style={{ background: "lightyellow" }}></svg>;
};
