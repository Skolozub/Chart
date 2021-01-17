import * as d3 from "d3";

import { AXIS } from "../constants";
import { formatAmount } from "./utils";

export const drawRightAxis = (parentNode, y, width) => {
  // create axis group
  const axisGroup = parentNode
    .append("g")
    .attr("class", "rightAxis")
    .attr("transform", `translate(${width}, 0)`);

  // create right axis
  const axis = axisGroup.call(
    d3
      .axisRight(y)
      .tickFormat((d) => formatAmount(d))
      .ticks(AXIS.Y.COUNT)
      .tickPadding(AXIS.Y.PADDING)
      .tickSizeOuter(0)
  );

  // remove domain line
  axis.select(".domain").remove();

  // change tick lines
  axis
    .selectAll(".tick line")
    .attr("stroke", AXIS.Y.LINES_COLOR)
    .attr("x2", `${width}`)
    .attr("transform", `translate(${-width}, 0)`)
    .style("stroke-dasharray", `${AXIS.Y.DASH_WIDTH},${AXIS.Y.DASH_GAP}`);

  // change ticks text style
  axis
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
