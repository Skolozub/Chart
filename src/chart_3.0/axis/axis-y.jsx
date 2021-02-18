import React, { useContext, useEffect, useRef } from "react";
import { axisRight, format, select } from "d3";
import { PropsContext } from "../provider";
import { CHART, AXIS, COMMON } from "../constants";

const AxisYComponent = ({ chart, yScale }) => {
  console.log("rerender AxisYComponent");

  const yAxisRef = useRef(null);

  useEffect(() => {
    const yAxisCall = axisRight(yScale)
      .tickFormat((d) => format("$,")(d))
      .ticks(AXIS.Y.COUNT)
      .tickPadding(AXIS.Y.PADDING)
      .tickSize(chart.width);

    const yAxis = select(yAxisRef.current);

    // draw axis
    yAxis.transition().duration(COMMON.TRANSITION_DURATION).call(yAxisCall);

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
  }, [chart.width, yScale]);

  return <g ref={yAxisRef} className="y"></g>;
};

const MemoizedAxisYComponent = React.memo(AxisYComponent);

export const AxisY = () => {
  const { chart, scale } = useContext(PropsContext);

  return <MemoizedAxisYComponent chart={chart} yScale={scale.y} />;
};
