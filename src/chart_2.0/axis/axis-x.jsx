import React, { useContext, useEffect, useRef } from "react";
import {
  axisBottom,
  formatLocale,
  select,
  timeFormat,
  timeFormatDefaultLocale,
  timeMonth,
  timeYear
} from "d3";
import { PropsContext } from "..";

// TODO: delete on prod
import { logger } from "../../utils/logger";

export const AxisX = () => {
  const xAxisRef = useRef(null);

  const { chart, scale, xDomain, CONSTANTS } = useContext(PropsContext);
  const { AXIS, COMMON } = CONSTANTS;

  useEffect(() => {
    // function format() {
    //   const [start, end] = xDomain;
    //   const delta = new Date(end).getFullYear() - new Date(start).getFullYear();

    //   if (delta === 2) {
    //     return [timeMonth, timeFormat("%b")];
    //   }
    //   return [timeYear, timeFormat("%Y")];
    // }

    function formatTicks() {
      const [min, max] = xDomain;
      const deltaYears =
        new Date(max).getFullYear() - new Date(min).getFullYear();
      const ticksCount = chart.width / AXIS.X.WIDTH_BETWEEN_TICKS;

      if (deltaYears === COMMON.ONE_YEAR) {
        return {
          tickTime: timeMonth,
          tickFormatter: timeFormat("%b"),
          tickWeight: Math.ceil(COMMON.MONTHS_IN_YEAR / ticksCount)
        };
      }

      return {
        tickTime: timeYear,
        tickFormatter: timeFormat("%Y"),
        tickWeight: Math.ceil(deltaYears / ticksCount)
      };
    }

    const { tickTime, tickFormatter, tickWeight } = formatTicks();

    const xAxisCall = axisBottom(scale.x)
      .tickPadding(AXIS.X.PADDING)
      .ticks(tickTime.every(tickWeight))
      .tickFormat(tickFormatter)
      .tickSize(0);

    const xAxis = select(xAxisRef.current);

    // draw x axis
    xAxis.transition().duration(500).call(xAxisCall);

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
  }, [xDomain, scale.x, AXIS]);

  logger.render("AxisX");

  return (
    <g
      ref={xAxisRef}
      className="x"
      transform={`translate(0, ${chart.height})`}
    ></g>
  );
};
