import React, { useEffect, useMemo, useRef } from "react";
import { axisBottom, extent, scaleTime, select, timeYear } from "d3";
import { AXIS, CHART, SVG } from "../constants";

const data = ["2020-10-13", "2069-10-13"];
const parsedData = data.map((d) => new Date(d).getTime());

export const DrawTimeLine = ({ chartWidth, chartHeight }) => {
  const xAxisRef = useRef(null);

  const xScale = useMemo(
    () =>
      scaleTime()
        .domain(extent(parsedData, (d) => d))
        .range([0, chartWidth]),
    [chartWidth]
  );

  useEffect(() => {
    const xAxisCall = axisBottom(xScale)
      .tickPadding(10)
      .tickSize(0)
      .ticks(timeYear);

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
      .attr("r", 1)
      .attr("fill", AXIS.X.DOTS_COLOR)
      .attr("transform", "translate(0, 15)");
    // .attr('y', )

    // change ticks text style
    xAxis
      .selectAll(".tick text")
      .attr("fill", AXIS.FONT_COLOR)
      .attr("font-size", 13);

    xAxis.selectAll(".tick text").each((date, index, node) => {
      if (index % 5 !== 0) {
        node[index].remove();
      }
    });
  }, []);

  return (
    <g
      className="time-line"
      transform={`translate(${CHART.MARGIN.LEFT}, ${
        SVG.HEIGHT - CHART.MARGIN.BOTTOM + 50
      })`}
    >
      <g ref={xAxisRef}></g>
    </g>
  );
};
