import React, { useContext, useMemo } from "react";
import { PropsContext } from "../provider";
import { AmountBalloon } from "./amount-balloon";
import { CHART, CURRENT_AMOUNT } from "../constants";

const CurrentAmountComponent = ({ amount, date, xScale, yScale }) => {
  console.log("rerender CurrentAmountComponent");
  const cx = useMemo(() => xScale(date), [xScale, date]);
  const cy = useMemo(() => yScale(amount), [yScale, amount]);

  const top = useMemo(
    () => cy + CHART.MARGIN.TOP - CURRENT_AMOUNT.CIRCLE.RADIUS,
    [cy]
  );

  const left = useMemo(() => cx + CHART.MARGIN.LEFT, [cx]);

  return (
    <>
      {left >= CHART.MARGIN.LEFT && (
        <g className="current-amount">
          <circle
            fill={CURRENT_AMOUNT.CIRCLE.BACKGROUND_COLOR}
            r={CURRENT_AMOUNT.CIRCLE.RADIUS}
            stroke={CURRENT_AMOUNT.CIRCLE.STROKE}
            strokeWidth={CURRENT_AMOUNT.CIRCLE.BORDER_WIDTH}
            cx={cx}
            cy={cy}
          />
          <AmountBalloon top={top} left={left} />
        </g>
      )}
    </>
  );
};

const MemoizedCurrentAmountComponent = React.memo(CurrentAmountComponent);

export const CurrentAmount = () => {
  const { data, scale } = useContext(PropsContext);

  const amountDate = data.currentAmount.date;
  const amountValue = data.currentAmount.amounts[data.currency].value;

  return (
    <MemoizedCurrentAmountComponent
      amount={amountValue}
      date={amountDate}
      xScale={scale.x}
      yScale={scale.y}
    />
  );
};
