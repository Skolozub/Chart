import React, { useContext, useMemo } from "react";
import { format } from "d3";
import { PropsContext } from "../../index";
import { AmountLabel } from "./amount-label";
import { CHART, AMOUNT } from "../../constants";
import * as S from "./index.style";

const AmountComponent = ({ amount, chart, yScale, isActive }) => {
  console.log("rerender AmountComponent");

  const y = useMemo(() => yScale(amount), [yScale, amount]);

  const x = useMemo(
    () => chart.width + CHART.MARGIN.RIGHT - AMOUNT.VALUE.MARGIN.RIGHT,
    [chart.width]
  );

  const opacity = useMemo(() => {
    if (!isActive || y <= 0 || y > chart.height) {
      return 0;
    }
    return 1;
  }, [isActive, y, chart.height]);

  return (
    <S.Container transparent={opacity}>
      <line
        className="amount-line"
        x1={0}
        y1={y}
        x2={x}
        y2={y}
        stroke={AMOUNT.LINE.COLOR}
        strokeDasharray={`${AMOUNT.LINE.DASH_WIDTH}, ${AMOUNT.LINE.DASH_GAP}`}
      />
      <AmountLabel amount={amount} opacity={opacity}>
        {format("$,")(amount)}
      </AmountLabel>
    </S.Container>
  );
};

const MemoizedAmountComponent = React.memo(AmountComponent);

export const Amount = ({ goal }) => {
  const { chart, scale } = useContext(PropsContext);

  return (
    <MemoizedAmountComponent
      amount={goal.amount.value}
      chart={chart}
      yScale={scale.y}
      isActive={goal.isActive}
    />
  );
};
