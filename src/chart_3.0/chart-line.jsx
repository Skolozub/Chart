import React, { useContext, useMemo } from "react";
import { line } from "d3";
import { PropsContext } from ".";
import { CHART, COMMON } from "./constants";

const ChartLineComponent = ({ data, scale }) => {
  console.log("rerender ChartLineComponent");

  const chartPath = useMemo(() => {
    const drawLine = line()
      .x((point) => scale.x(point.date))
      .y((point) => scale.y(point.value))
      .curve(CHART.CURVE_TYPE.EXPONENTIAL);

    return drawLine(data);
  }, [data, scale]);

  return (
    <path
      className="chart-line"
      d={chartPath}
      stroke={CHART.LINE_COLOR}
      fill="none"
      style={{ transition: `d ${COMMON.TRANSITION_DURATION}ms` }}
    />
  );
};

const MemoizedChartLineComponent = React.memo(ChartLineComponent);

export const ChartLine = () => {
  const { data, scale } = useContext(PropsContext);

  return <MemoizedChartLineComponent data={data.chart} scale={scale} />;
};
