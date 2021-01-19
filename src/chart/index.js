import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

import { drawBasicElements } from "./draw-functions/common";
import { drawXAxis, drawYAxis } from "./draw-functions/axis";
import { drawChartBorders, drawChartPath } from "./draw-functions/chart";
import { drawGoals } from "./draw-functions/goals";
import { AXIS, CHART, SVG } from "../constants";

export const Chart = ({
  chartData,
  goalsData,
  svgWidth = SVG.WIDTH,
  svgHeight = SVG.HEIGHT
}) => {
  const svgRef = useRef(null);
  const [selection, setSelection] = useState(null);

  const chartWidth = svgWidth - CHART.MARGIN.LEFT - CHART.MARGIN.RIGHT;
  const chartHeight = svgHeight - CHART.MARGIN.TOP - CHART.MARGIN.BOTTOM;

  useEffect(() => {
    if (!selection) {
      const svg = d3.select(svgRef.current);

      const chart = svg.append("g").attr("class", "chart");
      const yAxis = chart.append("g").attr("class", "y-axis");
      const xAxis = chart.append("g").attr("class", "x-axis");
      const chartPath = chart.append("path").attr("class", "chart-path");
      const borders = chart.append("g").attr("class", "borders");
      const borderLeft = borders.append("path").attr("class", "border-left");
      const borderRight = borders.append("path").attr("class", "border-right");

      setSelection({
        svg,
        chart,
        chartPath,
        xAxis,
        yAxis,
        borderLeft,
        borderRight
      });

      return void 0;
    }

    // set chart scales

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(chartData, (d) => d.date))
      .range([0, chartWidth]);

    const yMax = d3.max(chartData, (d) => d.value);
    const yScale = d3
      .scaleLinear()
      .domain([0, yMax + Math.round(yMax / AXIS.Y.COUNT)])
      .range([chartHeight, 0]);

    // draw chart

    drawBasicElements(selection, svgWidth, svgHeight, chartWidth, chartHeight);

    drawXAxis(selection.xAxis, xScale, chartHeight);
    drawYAxis(selection.yAxis, yScale, chartWidth);

    drawChartBorders(selection, chartWidth, chartHeight);
    drawChartPath(selection.chartPath, chartData, xScale, yScale);

    // drawGoals(chartSelection, goalsData, x, y, chartWidth, chartHeight);
  }, [
    selection,
    chartData,
    goalsData,
    svgWidth,
    svgHeight,
    chartWidth,
    chartHeight
  ]);

  return <svg ref={svgRef}></svg>;
};
