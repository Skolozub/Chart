import React, { useContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { PropsContext } from "../../index";
import * as S from "./amount-label.style";

// TODO: delete on prod
import { logger } from "../../../utils/logger";

export const AmountLabel = ({ goal, className, children }) => {
  const { chart, scale, portalRef, CONSTANTS } = useContext(PropsContext);
  const { CHART, GOAL } = CONSTANTS;
  const amountRef = useRef(null);
  const [top, setTop] = useState(null);
  const [left, setLeft] = useState(null);

  useEffect(() => {
    if (amountRef.current) {
      const rect = amountRef.current.getBoundingClientRect();
      const textTop =
        CHART.MARGIN.TOP + scale.y(goal.amount.value) - rect.height / 2;
      const textLeft =
        CHART.MARGIN.LEFT +
        chart.width +
        CHART.MARGIN.RIGHT -
        rect.width -
        GOAL.AMOUNT.VALUE.MARGIN.RIGHT;

      setTop(textTop);
      setLeft(textLeft);
    }
  }, [scale, chart.width, goal.amount.value, CHART, GOAL]);

  logger.render("AmountLabel");

  return ReactDOM.createPortal(
    <S.Container ref={amountRef} className="amount-label" left={left} top={top}>
      <S.Text>{children}</S.Text>
    </S.Container>,
    portalRef
  );
};
