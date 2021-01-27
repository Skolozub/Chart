import React, { useContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { PropsContext } from "../../index";
import * as S from "./age-text.style";

// TODO: delete on prod
import { logger } from "../../../utils/logger";

export const AgeText = ({ goal, children }) => {
  const { chart, scale, portalRef, CONSTANTS } = useContext(PropsContext);
  const { CHART, AGE, COMMON } = CONSTANTS;
  const textRef = useRef(null);
  const [top, setTop] = useState(null);
  const [left, setLeft] = useState(null);

  useEffect(() => {
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      const textTop =
        CHART.MARGIN.TOP + chart.height - rect.height - AGE.VALUE.MARGIN;
      const textLeft =
        CHART.MARGIN.LEFT + scale.x(goal.date) - rect.width / COMMON.HALF;

      setTop(textTop);
      setLeft(textLeft);
    }
  }, [scale, chart.height, goal.date, CHART, AGE, COMMON.HALF]);

  logger.render("AgeText");

  return ReactDOM.createPortal(
    <S.Container className="age-text" left={left} top={top}>
      <S.Text ref={textRef}>{children}</S.Text>
    </S.Container>,
    portalRef
  );
};
