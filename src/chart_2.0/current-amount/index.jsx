import React, { useContext, useMemo } from "react";
import { PropsContext } from "../index";
import { AmountBalloon } from "./amount-balloon";

export const CurrentAmount = ({ amount }) => {
  const { scale, CONSTANTS } = useContext(PropsContext);
  const { CHART, CURRENT_AMOUNT } = CONSTANTS;

  const cx = useMemo(() => scale.x(Date.now()), [scale]);
  const cy = useMemo(() => scale.y(amount), [scale, amount]);

  const top = useMemo(
    () => cy + CHART.MARGIN.TOP - CURRENT_AMOUNT.CIRCLE.OUTER.RADIUS,
    [cy, CHART, CURRENT_AMOUNT]
  );

  const left = useMemo(() => cx + CHART.MARGIN.LEFT, [cx, CHART]);

  return (
    <>
      {left >= 0 && (
        <>
          <g className="current-amount">
            <circle
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
            />
          </g>
          <AmountBalloon top={top} left={left} />
        </>
      )}
    </>
  );
};
