import React, { useMemo, useRef } from "react";
import { line } from "d3";
import { CHART } from "../constants";

export const DrawChart = ({
  data,
  chartWidth,
  chartHeight,
  xScale,
  yScale
}) => {
  const chartRef = useRef(null);

  const chartPath = useMemo(() => {
    const drawLine = line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value))
      .curve(CHART.CURVE_TYPE.EXPONENTIAL);

    return drawLine(data);
  }, [data, xScale, yScale]);

  // useEffect(() => {
  //   const chartNode = select(chartRef.current);
  //   // animate chart draw
  //   const totalLength = chartNode.node().getTotalLength();
  //   chartNode
  //     .attr("stroke-dasharray", totalLength)
  //     .attr("stroke-dashoffset", totalLength)
  //     .transition()
  //     .duration(CHART.DURATION)
  //     .attr("stroke-dashoffset", 0);
  // });

  const leftBorderPath = useMemo(() => {
    const coords = [
      [0, 0],
      [0, chartHeight + CHART.BORDER.BOTTOM_SEGMENT]
    ];

    return line()(coords);
  }, [chartHeight]);

  const rightBorderPath = useMemo(() => {
    const coords = [
      [chartWidth, 0],
      [chartWidth, chartHeight + CHART.BORDER.BOTTOM_SEGMENT]
    ];

    return line()(coords);
  }, [chartWidth, chartHeight]);

  return (
    <g className="chart">
      <path
        ref={chartRef}
        className="chart-path"
        d={chartPath}
        stroke={CHART.LINE_COLOR}
        fill="none"
      />
      <g className="borders">
        <path d={leftBorderPath} className="left" stroke={CHART.BORDER.COLOR} />
        <path
          d={rightBorderPath}
          className="right"
          stroke={CHART.BORDER.COLOR}
        />
      </g>
    </g>
  );
};
