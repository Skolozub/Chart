import React, { useContext, useMemo } from "react";
import { PropsContext } from "../index";
// import { AmountBalloon } from "./amount-balloon";
import { CHART, CURRENT_AMOUNT } from "../constants";

const CurrentAmountComponent = ({ amount, date, scale }) => {
  console.log("rerender CurrentAmountComponent");

  const cx = useMemo(() => scale.x(date), [scale, date]);
  const cy = useMemo(() => scale.y(amount), [scale, amount]);

  const top = useMemo(
    () => cy + CHART.MARGIN.TOP - CURRENT_AMOUNT.CIRCLE.RADIUS,
    [cy]
  );

  const left = useMemo(() => cx + CHART.MARGIN.LEFT, [cx]);

  return (
    <>
      {left >= 0 && (
        <g className="current-amount">
          <circle
            fill={CURRENT_AMOUNT.CIRCLE.BACKGROUND_COLOR}
            r={CURRENT_AMOUNT.CIRCLE.RADIUS}
            stroke={CURRENT_AMOUNT.CIRCLE.STROKE}
            strokeWidth={CURRENT_AMOUNT.CIRCLE.BORDER_WIDTH}
            cx={cx}
            cy={cy}
          />
          {/* <circle
            fill={CURRENT_AMOUNT.CIRCLE.OUTER.BACKGROUND_COLOR}
            r={CURRENT_AMOUNT.CIRCLE.OUTER.RADIUS}
            cx={cx}
            cy={cy}
          />
          <circle
            fill={CURRENT_AMOUNT.CIRCLE.INNER.BACKGROUND_COLOR}
            r={CURRENT_AMOUNT.CIRCLE.INNER.RADIUS}
            cx={cx}
            cy={cy}
          /> */}
          {/* <AmountBalloon top={top} left={left} /> */}
        </g>
      )}
    </>
  );
};

const MemoizedCurrentAmountComponent = React.memo(CurrentAmountComponent);

export const CurrentAmount = () => {
  const { data, scale } = useContext(PropsContext);

  const firstPoint = data.points[data.scenario][0];
  const amountDate = data.period.start;
  const amountValue = firstPoint.amounts[data.currency].value;

  return (
    <MemoizedCurrentAmountComponent
      amount={amountValue}
      date={amountDate}
      scale={scale}
    />
  );
};
