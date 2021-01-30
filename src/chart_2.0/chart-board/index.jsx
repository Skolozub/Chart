import React, { useRef, useContext, useEffect } from "react";
import { PropsContext } from "../index";

import { extent, interpolateBasis, max, scaleLinear, select } from "d3";

export const ChartBoard = () => {
  const { data, scale, chart } = useContext(PropsContext);

  const chartBoardRef = useRef(null);
  const circleRef = useRef(null);

  // curveMonotoneX / curveCardinal
  const interpolate = interpolateBasis(
    data.chart.map(function (p) {
      return p.value;
    })
  );

  useEffect(() => {
    const chartSelection = select(chartBoardRef.current);

    chartSelection.on("click", function (event) {
      const linearScaleX = scaleLinear()
        .domain(extent(data.chart, (d) => d.date))
        .range([0, chart.width]);

      const clickX = event.pageX - this.getBoundingClientRect().x;
      const xMax = max(data.chart, (d) => d.date);

      const y = interpolate(clickX / linearScaleX(xMax));

      select(circleRef.current).attr("cx", clickX).attr("cy", scale.y(y));
    });
  }, [data, interpolate, scale, chart.width]);

  return (
    <>
      <rect
        className="chart-board"
        ref={chartBoardRef}
        width={chart.width}
        height={chart.height}
      />
      <circle ref={circleRef} r={3} fill="red" />
    </>
  );
};
