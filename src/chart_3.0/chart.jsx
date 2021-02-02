import React, { useContext } from "react";
import { PropsContext } from ".";
import { ChartLine } from "./chart-line";
import { Borders } from "./axis/borders";
import { AxisY } from "./axis/axis-y";
import { AxisX } from "./axis/axis-x";
import { Amounts } from "./amounts";
import { Goals } from "./goals";
import { CurrentAmount } from "./current-amount";
import { SVG, CHART } from "./constants";

export const ChartComponent = ({ svg, chart, className }) => {
  console.log("rerender ChartComponent");

  return (
    <svg
      className={className}
      width={svg.width}
      height={svg.height}
      style={{ background: SVG.BACKGROUND_COLOR }}
    >
      <g
        className="chart-group"
        width={chart.width}
        height={chart.height}
        transform={`translate(${CHART.MARGIN.LEFT}, ${CHART.MARGIN.TOP})`}
      >
        <g className="axis">
          <Borders />
          <AxisY />
          <AxisX />
        </g>

        <g className="chart" clipPath="url(#chart-clip)">
          <ChartLine />
        </g>

        <CurrentAmount />

        <g className="amounts">
          <Amounts />
        </g>

        <g className="goals" clipPath="url(#chart-clip)">
          <Goals />
        </g>
      </g>

      <defs>
        <clipPath id="chart-clip">
          <rect width={chart.width} height={chart.height} x={0} y={0} />
        </clipPath>
      </defs>
    </svg>
  );
};

const MemoizedChartComponent = React.memo(ChartComponent);

export const Chart = () => {
  const { svg, chart, className } = useContext(PropsContext);

  return (
    <MemoizedChartComponent svg={svg} chart={chart} className={className} />
  );
};
