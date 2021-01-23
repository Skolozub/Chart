import React, { useContext, useEffect, useRef } from "react";
import { axisRight, select } from "d3";
import { formatAmount } from "../utils";
import { PropsContext } from "..";

// TODO: delete on prod
import { logger } from "../../utils/logger";

export const AxisY = () => {
  const yAxisRef = useRef(null);

  const { chart, scale, CONSTANTS } = useContext(PropsContext);
  const { CHART, AXIS } = CONSTANTS;

  useEffect(() => {
    const yAxisCall = axisRight(scale.y)
      .tickFormat((d) => formatAmount(d))
      .ticks(AXIS.Y.COUNT)
      .tickPadding(AXIS.Y.PADDING)
      .tickSize(chart.width);

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
  }, [chart.width, scale.y, AXIS, CHART]);

  logger.render("AxisY");

  return <g ref={yAxisRef} className="y"></g>;
};
