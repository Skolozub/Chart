import React, { useContext, useMemo } from "react";
import { curveLinear, curveMonotoneX, line } from "d3";
import { PropsContext } from ".";
import { CHART, COMMON } from "./constants";

const ChartLineComponent = ({ data, scale, curveType, currency }) => {
  console.log("rerender ChartLineComponent");
  console.log("curveType", curveType);

  const chartPath = useMemo(() => {
    const drawLine = line()
      .x((point) => scale.x(point.date))
      .y((point) => scale.y(point.amounts[currency].value))
      .curve(
        CHART.CURVE_TYPE.EXPONENTIAL === curveType
          ? curveMonotoneX
          : curveLinear
      );

    return drawLine(data);
  }, [data, scale, curveType, currency]);

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

  return (
    <MemoizedChartLineComponent
      data={data.points[data.scenario]}
      scale={scale}
      curveType={data.curveType}
      currency={data.currency}
    />
  );
};
