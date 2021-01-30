import React, { useRef, useContext, useMemo } from "react";
import { line } from "d3";
import { PropsContext } from ".";

const ChartLineComponent = () => {
  const { data, scale, CONSTANTS } = useContext(PropsContext);
  const { CHART } = CONSTANTS;

  const chartRef = useRef(null);

  const chartPath = useMemo(() => {
    const drawLine = line()
      .x((point) => scale.x(point.date))
      .y((point) => scale.y(point.value))
      .curve(CHART.CURVE_TYPE.EXPONENTIAL);

    return drawLine(data.chart);
  }, [data.chart, scale, CHART]);

  return (
    <path
      ref={chartRef}
      className="chart-line"
      d={chartPath}
      stroke={CHART.LINE_COLOR}
      fill="none"
      style={{ transition: "300ms" }}
    />
  );
};

export const ChartLine = React.memo(ChartLineComponent);
