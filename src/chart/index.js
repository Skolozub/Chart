import React, { useRef, useEffect, useState, useMemo } from "react";
// import * as d3 from "d3";
import { extent, max, scaleLinear, scaleTime } from "d3";

// import { drawBasicElements } from "./draw-functions/common";
// import { drawXAxis, drawYAxis } from "./draw-functions/axis";
// import { drawChartBorders, drawChartPath } from "./draw-functions/chart";
// import { drawGoals } from "./draw-functions/goals";
import { AXIS, CHART, SVG } from "../constants";
import { DrawGoals } from "./draw-goals";
import { DrawAxis } from "./draw-axis";
import { DrawChart } from "./draw-chart";

export const Chart = ({
  chartData,
  goalsData,
  svgWidth = SVG.WIDTH,
  svgHeight = SVG.HEIGHT
}) => {
  const svgRef = useRef(null);

  const chartWidth = svgWidth - CHART.MARGIN.LEFT - CHART.MARGIN.RIGHT;
  const chartHeight = svgHeight - CHART.MARGIN.TOP - CHART.MARGIN.BOTTOM;

  const xScale = useMemo(
    () =>
      scaleTime()
        .domain(extent(chartData, (d) => d.date))
        .range([0, chartWidth]),
    [chartData, chartWidth]
  );

  const yScale = useMemo(() => {
    const yMax = max(chartData, (d) => d.value);
    return scaleLinear()
      .domain([0, yMax + Math.round(yMax / AXIS.Y.COUNT)])
      .range([chartHeight, 0]);
  }, [chartData, chartHeight]);

  // useEffect(() => {
  // if (!selection) {
  //   const svg = d3.select(svgRef.current);
  //   const chart = svg.append("g").attr("class", "chart");

  //   const yAxis = chart.append("g").attr("class", "y-axis");
  //   const xAxis = chart.append("g").attr("class", "x-axis");

  //   const chartPath = chart.append("path").attr("class", "chart-path");

  //   const borders = chart.append("g").attr("class", "borders");
  //   const borderLeft = borders.append("path").attr("class", "border-left");
  //   const borderRight = borders.append("path").attr("class", "border-right");

  //   const goals = svg.append("g").attr("class", "goals");

  //   setSelection({
  //     svg,
  //     chart,
  //     xAxis,
  //     yAxis,
  //     chartPath,
  //     borderLeft,
  //     borderRight,
  //     goals
  //   });

  //   return void 0;
  // }

  // set chart scales

  // draw chart

  //   drawBasicElements(selection, svgWidth, svgHeight, chartWidth, chartHeight);

  //   drawXAxis(selection.xAxis, xScale, chartHeight);
  //   drawYAxis(selection.yAxis, yScale, chartWidth);

  //   drawChartBorders(selection, chartWidth, chartHeight);
  //   drawChartPath(selection.chartPath, chartData, xScale, yScale);

  //   drawGoals(selection, goalsData, xScale, yScale, chartWidth, chartHeight);
  // }, [
  //   selection,
  //   chartData,
  //   goalsData,
  //   svgWidth,
  //   svgHeight,
  //   chartWidth,
  //   chartHeight
  // ]);

  return (
    <svg
      ref={svgRef}
      width={svgWidth}
      height={svgHeight}
      style={{ background: SVG.BACKGROUND_COLOR }}
    >
      <g
        className="chart-group"
        width={chartWidth}
        height={chartHeight}
        transform={`translate(${CHART.MARGIN.LEFT}, ${CHART.MARGIN.TOP})`}
      >
        <DrawAxis
          chartWidth={chartWidth}
          chartHeight={chartHeight}
          xScale={xScale}
          yScale={yScale}
        />
        <DrawChart
          data={chartData}
          chartWidth={chartWidth}
          chartHeight={chartHeight}
          xScale={xScale}
          yScale={yScale}
        />
      </g>
      <DrawGoals
        data={goalsData}
        chartWidth={chartWidth}
        chartHeight={chartHeight}
        xScale={xScale}
        yScale={yScale}
      />
    </svg>
  );
};
