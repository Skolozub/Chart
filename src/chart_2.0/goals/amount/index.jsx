import React, { useContext, useMemo } from "react";
import { line } from "d3";
import { PropsContext } from "../../index";
import { AmountLabel } from "./amount-label";
import { formatAmount } from "../../utils";

export const Amount = ({ goal }) => {
  const { chart, scale, CONSTANTS } = useContext(PropsContext);
  const { CHART, AMOUNT } = CONSTANTS;

  const yAmountCoord = useMemo(() => scale.y(goal.amount.value), [
    scale,
    goal.amount.value
  ]);

  const amountLinePath = useMemo(() => {
    const xAmountCoord =
      chart.width + CHART.MARGIN.RIGHT - AMOUNT.VALUE.MARGIN.RIGHT;

    const coords = [
      [0, yAmountCoord],
      [xAmountCoord, yAmountCoord]
    ];

    return line()(coords);
  }, [chart.width, yAmountCoord, CHART, AMOUNT]);

  if (!goal.isActive || yAmountCoord < 0 || yAmountCoord > chart.height) {
    return null;
  }

  return (
    <>
      <path
        className="amount-line"
        d={amountLinePath}
        stroke={AMOUNT.LINE.COLOR}
        strokeDasharray={`${AMOUNT.LINE.DASH_WIDTH}, ${AMOUNT.LINE.DASH_GAP}`}
      />
      <AmountLabel goal={goal}>{formatAmount(goal.amount.value)}</AmountLabel>
    </>
  );
};
