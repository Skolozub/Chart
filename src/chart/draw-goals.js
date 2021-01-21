import React from "react";
import { CHART } from "../constants";
import { DrawXGoal } from "./draw-x-goal";
import { DrawYGoal } from "./draw-y-goal";

export const DrawGoals = ({
  data,
  chartWidth,
  chartHeight,
  xScale,
  yScale,
  onGoalClick
}) => {
  return (
    <g
      className="goals"
      width={chartWidth}
      height={chartHeight}
      transform={`translate(${CHART.MARGIN.LEFT}, ${CHART.MARGIN.TOP})`}
    >
      {data.map((goal) => (
        <g className="x-goal" key={goal.code}>
          <DrawYGoal
            goal={goal}
            chartWidth={chartWidth}
            chartHeight={chartHeight}
            yScale={yScale}
          />
        </g>
      ))}
      {data.map((goal) => (
        <g className="y-goal" key={goal.code}>
          <DrawXGoal
            goal={goal}
            chartWidth={chartWidth}
            chartHeight={chartHeight}
            xScale={xScale}
            yScale={yScale}
            onGoalClick={onGoalClick}
          />
        </g>
      ))}
    </g>
  );
};
