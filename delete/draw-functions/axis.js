import * as d3 from "d3";

import { AXIS } from "../../constants";
import { formatAmount } from "../utils";

export const drawXAxis = (xAxis, xScale, height) => {
  // const xAxisCall = d3
  //   .axisBottom(xScale)
  //   .tickPadding(AXIS.X.PADDING)
  //   .tickSizeOuter(0);
  // // draw axis
  // xAxis.transition().duration(500).call(xAxisCall);
  // change axis style
  // xAxis.attr("transform", `translate(0, ${height})`);
  // // add styles to domain line
  // xAxis
  //   .select(".domain")
  //   .attr("stroke", AXIS.X.DOMAIN_COLOR)
  //   .attr("stroke-width", AXIS.X.DOMAIN_STROKE_WIDTH);
  // // add dots to ticks
  // xAxis
  //   .selectAll(".tick")
  //   .append("circle")
  //   .attr("r", AXIS.X.DOTS_RADIUS)
  //   .attr("fill", AXIS.X.DOTS_COLOR);
  // // change ticks text style
  // xAxis
  //   .selectAll(".tick text")
  //   .attr("fill", AXIS.FONT_COLOR)
  //   .attr("font-size", AXIS.FONT_SIZE);
  // // remove lines from ticks
  // xAxis.selectAll(".tick line").remove();
};

export const drawYAxis = (yAxis, yScale, width) => {
  // const yAxisCall = d3
  //   .axisRight(yScale)
  //   .tickFormat((d) => formatAmount(d))
  //   .ticks(AXIS.Y.COUNT)
  //   .tickPadding(AXIS.Y.PADDING)
  //   .tickSize(-width);
  // // draw axis
  // yAxis.transition().duration(500).call(yAxisCall);
  // change axis style
  // yAxis.attr("transform", `translate(${width}, 0)`);
  // // change ticks lines style
  // yAxis
  //   .selectAll(".tick line")
  //   .attr("stroke", AXIS.Y.LINES_COLOR)
  //   .attr("transform", "translate(0, 0)")
  //   .style("stroke-dasharray", `${AXIS.Y.DASH_WIDTH}, ${AXIS.Y.DASH_GAP}`);
  // // change ticks text style
  // yAxis
  //   .selectAll(".tick text")
  //   .attr("text-anchor", "end")
  //   .attr("font-size", AXIS.FONT_SIZE)
  //   .attr("fill", AXIS.FONT_COLOR);
  // // remove domain line
  // yAxis.select(".domain").remove();
};
