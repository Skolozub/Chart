import React, { useContext, useEffect, useRef } from "react";
import { axisBottom, select, timeFormat, timeMonth, timeYear } from "d3";
import { PropsContext } from "..";
import { AXIS, COMMON } from "../constants";

const AxisXComponent = ({ chart, xScale, xDomain }) => {
  console.log("rerender AxisXComponent");
  const xAxisRef = useRef(null);

  useEffect(() => {
    function getTickFormatData() {
      const [min, max] = xDomain;
      const deltaYears =
        new Date(max).getFullYear() - new Date(min).getFullYear();
      const ticksCount = chart.width / AXIS.X.WIDTH_BETWEEN_TICKS;

      // one year difference, show months with years
      if (deltaYears === COMMON.ONE_YEAR) {
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

    const { tickTime, tickFormatter, tickWeight } = getTickFormatData();

    const xAxisCall = axisBottom(xScale)
      .tickPadding(AXIS.X.PADDING)
      .ticks(tickTime.every(tickWeight))
      .tickFormat(tickFormatter)
      .tickSize(0);

    const xAxis = select(xAxisRef.current);

    // draw x axis
    xAxis.transition().duration(COMMON.TRANSITION_DURATION).call(xAxisCall);

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
  }, [chart.width, xDomain, xScale]);

  return (
    <g
      ref={xAxisRef}
      className="x"
      transform={`translate(0, ${chart.height})`}
    ></g>
  );
};

const MemoizedAxisXComponent = React.memo(AxisXComponent);

export const AxisX = () => {
  const { chart, scale, xDomain } = useContext(PropsContext);

  return (
    <MemoizedAxisXComponent chart={chart} xScale={scale.x} xDomain={xDomain} />
  );
};
