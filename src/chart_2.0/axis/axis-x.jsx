import React, { useContext, useEffect, useRef } from "react";
import { axisBottom, select } from "d3";
import { PropsContext } from "..";

// TODO: delete on prod
import { logger } from "../../utils/logger";

export const AxisX = () => {
  const xAxisRef = useRef(null);

  const { chart, scale, CONSTANTS } = useContext(PropsContext);
  const { AXIS } = CONSTANTS;

  useEffect(() => {
    const xAxisCall = axisBottom(scale.x)
      .tickPadding(AXIS.X.PADDING)
      .tickSize(0);

    const xAxis = select(xAxisRef.current);

    // draw x axis
    xAxis.transition().duration(500).call(xAxisCall);
  }, [scale.x, AXIS.X.PADDING]);

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
  }, [AXIS]);

  logger.render("AxisX");

  return (
    <g
      ref={xAxisRef}
      className="x"
      transform={`translate(0, ${chart.height})`}
    ></g>
  );
};
