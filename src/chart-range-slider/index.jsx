import { axisBottom, scaleTime, select, timeYear } from "d3";
import React, { useContext, useEffect, useMemo, useRef } from "react";
import { PropsContext } from "../chart_2.0";
import { logger } from "../utils/logger";

const period = {
  startDate: "2020-10-13",
  endDate: "2028-10-13",
  maxDate: "2069-10-13"
};

const startDate = new Date(period.startDate);
const endDate = new Date(period.endDate);
const maxDate = new Date(period.maxDate);

export const ChartRangeSlider = () => {
  const axisRef = useRef(null);

  const { svg, chart, CONSTANTS } = useContext(PropsContext);
  const { SVG, AXIS, COMMON } = CONSTANTS;

  const xScale = useMemo(
    () => scaleTime().domain([startDate, maxDate]).range([0, svg.width]),
    [svg.width]
  );

  useEffect(() => {
    const axisCall = axisBottom(xScale)
      .tickPadding(AXIS.X.PADDING)
      .ticks(timeYear.every(5))
      .tickSize(0);

    const axis = select(axisRef.current);

    // draw x axis
    axis.transition().duration(500).call(axisCall);

    // add styles to domain line
    axis
      .select(".domain")
      .attr("stroke", AXIS.X.DOMAIN_COLOR)
      .attr("stroke-width", AXIS.X.DOMAIN_STROKE_WIDTH);

    // change ticks text style
    axis
      .selectAll(".tick text")
      .attr("fill", AXIS.FONT_COLOR)
      .attr("font-size", AXIS.FONT_SIZE);
  }, [xScale, chart.width, AXIS, COMMON]);

  logger.render("ChartRangeSlider");

  return (
    <svg
      width={svg.width}
      height={80}
      style={{ background: SVG.BACKGROUND_COLOR }}
    >
      <g ref={axisRef} className="range" transform={`translate(0, 40)`}></g>
    </svg>
  );
};
