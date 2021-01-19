import * as d3 from "d3";

import { AXIS } from "../constants";
import { formatAmount } from "./utils";

export const drawRightAxis = (parentNode, yScale, width) => {
  const yAxisCall = d3
    .axisRight(yScale)
    .tickFormat((d) => formatAmount(d))
    .ticks(AXIS.Y.COUNT)
    .tickPadding(AXIS.Y.PADDING)
    .tickSize(-width);

  const yAxis = parentNode.selectAll("g.y.axis").data([width]);

  yAxis.transition().duration(500).call(yAxisCall);

  // update
  const updatedYAxis = yAxis
    .enter()
    .append("g")
    .attr("class", "y axis")
    .call(yAxisCall);

  parentNode
    .selectAll("g.y.axis .tick line")
    .attr("stroke", AXIS.Y.LINES_COLOR)
    .attr("transform", "translate(0, 0)")
    .style("stroke-dasharray", `${AXIS.Y.DASH_WIDTH}, ${AXIS.Y.DASH_GAP}`);

  yAxis.merge(updatedYAxis).attr("transform", `translate(${width}, 0)`);

  // remove domain line
  yAxis.merge(updatedYAxis).select(".domain").remove();

  // change ticks text style
  yAxis
    .merge(updatedYAxis)
    .selectAll(".tick text")
    .attr("text-anchor", "end")
    .attr("font-size", AXIS.FONT_SIZE)
    .attr("fill", AXIS.FONT_COLOR);
};

export const drawBottomAxis = (parentNode, x, height) => {
  // create axis group
  const axisGroup = parentNode
    .append("g")
    .attr("class", "bottomAxis")
    .attr("transform", `translate(0, ${height})`);

  // create bottom axis
  const axis = axisGroup.call(
    d3.axisBottom(x).tickPadding(AXIS.X.PADDING).tickSizeOuter(0)
  );

  // add styles to domain line
  axis
    .select(".domain")
    .attr("stroke", AXIS.X.DOMAIN_COLOR)
    .attr("stroke-width", AXIS.X.DOMAIN_STROKE_WIDTH);

  // remove lines from ticks
  axis.selectAll(".tick line").remove();

  // add dots to ticks
  axis
    .selectAll(".tick")
    .append("circle")
    .attr("r", AXIS.X.DOTS_RADIUS)
    .attr("fill", AXIS.X.DOTS_COLOR);

  // change ticks text style
  axis
    .selectAll(".tick text")
    .attr("fill", AXIS.FONT_COLOR)
    .attr("font-size", AXIS.FONT_SIZE);
};
