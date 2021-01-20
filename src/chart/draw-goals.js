import React, { useMemo } from "react";
import { line } from "d3";
import { CHART, GOAL } from "../constants";
import { DrawAmountLabel } from "./draw-amount-label";
import { DrawAge } from "./draw-age";

export const DrawGoals = ({
  data,
  chartWidth,
  chartHeight,
  xScale,
  yScale
}) => {
  const goals = useMemo(() => {
    return data.map((it) => {
      const coords = [
        [0, yScale(it.amount.value)],
        [chartWidth + CHART.MARGIN.RIGHT, yScale(it.amount.value)]
      ];

      return {
        ...it,
        path: line()(coords)
      };
    });
  }, [data, chartWidth, yScale]);

  return (
    <g
      className="goals"
      width={chartWidth}
      height={chartHeight}
      transform={`translate(${CHART.MARGIN.LEFT}, ${CHART.MARGIN.TOP})`}
    >
      {goals.map(({ code, path, amount, age, date }) => (
        <g className="goal" key={code}>
          <path
            className="amount-line"
            d={path}
            stroke={GOAL.AMOUNT.LINE.COLOR}
            strokeDasharray={`${GOAL.AMOUNT.LINE.DASH_WIDTH}, ${GOAL.AMOUNT.LINE.DASH_GAP}`}
          />
          <DrawAmountLabel
            amount={amount}
            chartWidth={chartWidth}
            yScale={yScale}
          />
          <DrawAge
            age={age}
            date={date}
            chartWidth={chartWidth}
            chartHeight={chartHeight}
            xScale={xScale}
          />
        </g>
      ))}
    </g>
  );
};
