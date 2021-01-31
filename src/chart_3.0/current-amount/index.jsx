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

export const CurrentAmount = ({ amount, date }) => {
  const { scale } = useContext(PropsContext);

  return (
    <MemoizedCurrentAmountComponent amount={amount} date={date} scale={scale} />
  );
};
