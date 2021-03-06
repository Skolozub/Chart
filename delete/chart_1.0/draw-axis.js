import React, { useEffect, useRef } from "react";
import { axisBottom, axisRight, select } from "d3";
import { AXIS, CHART } from "../constants";
import { formatAmount } from "./utils";

export const DrawAxis = ({ chartWidth, chartHeight, xScale, yScale }) => {
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);

  useEffect(() => {
    const xAxisCall = axisBottom(xScale)
      .tickPadding(AXIS.X.PADDING)
      .tickSize(0);

    const xAxis = select(xAxisRef.current);

    // draw x axis
    xAxis.transition().duration(500).call(xAxisCall);
  }, [xScale]);

  useEffect(() => {
    const xAxis = select(xAxisRef.current);

    // add styles to domain line
    xAxis
      .select(".domain")
      .attr("stroke", AXIS.X.DOMAIN_COLOR)
      .attr("stroke-width", AXIS.X.DOMAIN_STROKE_WIDTH);

    // add dots to ticks
    xAxis
      .selectAll(".tick")
      .append("circle")
      .attr("r", AXIS.X.DOTS_RADIUS)
      .attr("fill", AXIS.X.DOTS_COLOR);

    // change ticks text style
    xAxis
      .selectAll(".tick text")
      .attr("fill", AXIS.FONT_COLOR)
      .attr("font-size", AXIS.FONT_SIZE);
  }, []);

  useEffect(() => {
    const yAxisCall = axisRight(yScale)
      .tickFormat((d) => formatAmount(d))
      .ticks(AXIS.Y.COUNT)
      .tickPadding(AXIS.Y.PADDING)
      .tickSize(chartWidth);

    const yAxis = select(yAxisRef.current);

    // draw axis
    yAxis.transition().duration(500).call(yAxisCall);

    // change ticks lines style
    yAxis
      .selectAll(".tick line")
      .attr("stroke", AXIS.Y.LINES_COLOR)
      .style("stroke-dasharray", `${AXIS.Y.DASH_WIDTH}, ${AXIS.Y.DASH_GAP}`);

    // change ticks text style
    yAxis
      .selectAll(".tick text")
      .attr("text-anchor", "end")
      .attr("transform", `translate(${CHART.MARGIN.RIGHT}, 0)`)
      .attr("font-size", AXIS.FONT_SIZE)
      .attr("fill", AXIS.FONT_COLOR);

    // remove domain line
    yAxis.select(".domain").remove();
  }, [chartWidth, yScale]);

  useEffect(() => {}, []);

  return (
    <g className="axis">
      <g ref={yAxisRef} className="y"></g>
      <g
        ref={xAxisRef}
        className="x"
        transform={`translate(0, ${chartHeight})`}
      ></g>
    </g>
  );
};
