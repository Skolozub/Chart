// import * as d3 from "d3";

// import { CHART } from "../../constants";

// export const drawChartBorders = (selection, width, height) => {
//   const drawLine = d3.line();

//   const leftBorderCoords = [
//     [0, 0],
//     [0, height + CHART.BORDER.BOTTOM_SEGMENT]
//   ];

//   selection.borderLeft
//     .data([leftBorderCoords])
//     .attr("d", drawLine)
//     .attr("stroke", CHART.BORDER.COLOR);

//   const rightBorderCoords = [
//     [width, 0],
//     [width, height + CHART.BORDER.BOTTOM_SEGMENT]
//   ];

//   selection.borderRight
//     .data([rightBorderCoords])
//     .attr("d", drawLine)
//     .attr("stroke", CHART.BORDER.COLOR);
// };

// export const drawChartPath = (chartPath, data, xScale, yScale) => {
//   // const drawLine = d3
//   //   .line()
//   //   .x((d) => xScale(d.date))
//   //   .y((d) => yScale(d.value))
//   //   .curve(CHART.CURVE_TYPE.EXPONENTIAL);

//   // const chartPathWithData = chartPath.data([data]);

//   // chartPathWithData
//   //   .attr("d", drawLine)
//   //   .attr("stroke", CHART.LINE_COLOR)
//   //   .attr("fill", "none");

//   // // animate
//   // const totalLength = chartPathWithData.node().getTotalLength();

//   // chartPathWithData
//   //   .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
//   //   .attr("stroke-dashoffset", totalLength)
//   //   .transition()
//   //   .duration(CHART.DURATION)
//   //   .attr("stroke-dashoffset", 0);
// };
