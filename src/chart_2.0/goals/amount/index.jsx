import React, { useContext, useMemo } from "react";
import { line } from "d3";
import { PropsContext } from "../../index";
import { AmountLabel } from "./amount-label";
import { formatAmount } from "../../utils";

// TODO: delete on prod
import { logger } from "../../../utils/logger";

export const Amount = ({ goal }) => {
  const { chart, scale, CONSTANTS } = useContext(PropsContext);
  const { GOAL, CHART } = CONSTANTS;

  const yAmountCoord = useMemo(() => scale.y(goal.amount.value), [
    scale,
    goal.amount.value
  ]);

  const amountLinePath = useMemo(() => {
    const xAmountCoord =
      chart.width + CHART.MARGIN.RIGHT - GOAL.AMOUNT.VALUE.MARGIN.RIGHT;

    const coords = [
      [0, yAmountCoord],
      [xAmountCoord, yAmountCoord]
    ];

    return line()(coords);
  }, [chart.width, yAmountCoord, CHART, GOAL]);

  if (yAmountCoord < 0 || yAmountCoord > chart.height) {
    return null;
  }

  logger.render("Amount");

  return (
    <>
      <path
        className="amount-line"
        d={amountLinePath}
        stroke={GOAL.AMOUNT.LINE.COLOR}
        strokeDasharray={`${GOAL.AMOUNT.LINE.DASH_WIDTH}, ${GOAL.AMOUNT.LINE.DASH_GAP}`}
      />
      <AmountLabel goal={goal}>{formatAmount(goal.amount.value)}</AmountLabel>
    </>
  );
};
