import React, { useRef, useMemo } from "react";
import { extent, max, scaleLinear, scaleTime } from "d3";
import { AXIS, CHART, SVG } from "../constants";
import { DrawGoals } from "./draw-goals";
import { DrawAxis } from "./draw-axis";
import { DrawChart } from "./draw-chart";
import { DrawYouHere } from "./draw-you-here";

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

  const yScaleMax = useMemo(() => {
    const yMax = max(chartData, (d) => d.value);
    return yMax + Math.round(yMax / AXIS.Y.COUNT);
  }, [chartData]);

  const yScale = useMemo(
    () => scaleLinear().domain([0, yScaleMax]).range([chartHeight, 0]),
    [yScaleMax, chartHeight]
  );

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

      <DrawYouHere
        chartWidth={chartWidth}
        chartHeight={chartHeight}
        xScale={xScale}
        yScale={yScale}
      />

      {/* <DrawTimeLine chartWidth={chartWidth} chartHeight={chartHeight} /> */}
    </svg>
  );
};
