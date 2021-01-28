import React, { useContext, useEffect, useRef } from "react";
import { axisBottom, select, timeFormat, timeMonth, timeYear } from "d3";
import { PropsContext } from "..";

// TODO: delete on prod
import { logger } from "../../utils/logger";

export const AxisX = () => {
  const xAxisRef = useRef(null);

  const { chart, scale, xDomain, CONSTANTS } = useContext(PropsContext);
  const { AXIS, COMMON } = CONSTANTS;

  useEffect(() => {
    function formatTicks() {
      const [min, max] = xDomain;
      const deltaYears =
        new Date(max).getFullYear() - new Date(min).getFullYear();
      const ticksCount = chart.width / AXIS.X.WIDTH_BETWEEN_TICKS;

      // one year difference, show months with years
      if (deltaYears === COMMON.TWO_YEARS) {
        return {
          tickTime: timeMonth,
          tickFormatter: (date) => {
            if (timeYear(date) < date) {
              return timeFormat("%b")(date);
            }
            return timeFormat("%Y")(date);
          },
          tickWeight: Math.ceil(COMMON.MONTHS_IN_YEAR / ticksCount)
        };
      }

      // show only years, without months
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
  }, [chart.width, xDomain, scale.x, AXIS, COMMON]);

  logger.render("AxisX");

  return (
    <g
      ref={xAxisRef}
      className="x"
      transform={`translate(0, ${chart.height})`}
    ></g>
  );
};
