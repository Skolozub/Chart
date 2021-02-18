import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { PropsContext } from "../../provider";
import { CHART, AMOUNT, COMMON } from "../../constants";
import * as S from "./amount-label.style";

const AmountLabelComponent = ({
  amount,
  chartWidth,
  yScale,
  opacity,
  portalRef,
  children
}) => {
  console.log("rerender AmountLabelComponent");

  const amountRef = useRef(null);
  const [rect, setRect] = useState(null);

  useEffect(() => {
    const nextRect = amountRef.current.getBoundingClientRect();
    setRect(nextRect);
  }, [children]);

  const top = useMemo(() => {
    if (!rect) {
      return 0;
    }
    return CHART.MARGIN.TOP + yScale(amount) - rect.height / COMMON.HALF;
  }, [rect, yScale, amount]);

  const left = useMemo(() => {
    if (!rect) {
      return 0;
    }
    return (
      CHART.MARGIN.LEFT +
      chartWidth +
      CHART.MARGIN.RIGHT -
      rect.width -
      AMOUNT.VALUE.MARGIN.RIGHT
    );
  }, [rect, chartWidth]);

  return ReactDOM.createPortal(
    <S.Container
      ref={amountRef}
      className="amount-label"
      left={left}
      top={top}
      transparent={opacity}
    >
      <S.Text>{children}</S.Text>
    </S.Container>,
    portalRef
  );
};

const MemoizedAmountLabelComponent = React.memo(AmountLabelComponent);

export const AmountLabel = ({ amount, opacity, children }) => {
  const { chart, scale, portalRef } = useContext(PropsContext);

  return (
    <MemoizedAmountLabelComponent
      amount={amount}
      chartWidth={chart.width}
      yScale={scale.y}
      opacity={opacity}
      portalRef={portalRef}
    >
      {children}
    </MemoizedAmountLabelComponent>
  );
};
