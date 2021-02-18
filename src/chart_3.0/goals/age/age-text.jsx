import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { PropsContext } from "../../provider";
import { CHART, AGE, COMMON } from "../../constants";
import * as S from "./age-text.style";

const AgeTextComponent = ({ goalDate, chart, xScale, portalRef, children }) => {
  console.log("rerender AgeTextComponent");
  const textRef = useRef(null);
  const [rect, setRect] = useState(null);

  useEffect(() => {
    const nextRect = textRef.current.getBoundingClientRect();
    setRect(nextRect);
  }, [children]);

  const top = useMemo(() => {
    if (!rect) {
      return 0;
    }
    return CHART.MARGIN.TOP + chart.height - rect.height - AGE.VALUE.MARGIN;
  }, [rect, chart.height]);

  const left = useMemo(() => {
    if (!rect) {
      return 0;
    }
    return CHART.MARGIN.LEFT + xScale(goalDate) - rect.width / COMMON.HALF;
  }, [rect, goalDate, xScale]);

  const opacity = useMemo(() => {
    if (!rect || left <= 0 || left >= chart.width) {
      return 0;
    }
    return 1;
  }, [rect, left, chart.width]);

  return ReactDOM.createPortal(
    <S.Container
      className="age-text"
      left={left}
      top={top}
      transparent={opacity}
    >
      <S.Text ref={textRef}>{children}</S.Text>
    </S.Container>,
    portalRef
  );
};

const MemoizedAgeTextComponent = React.memo(AgeTextComponent);

export const AgeText = ({ goalDate, children }) => {
  const { chart, scale, portalRef } = useContext(PropsContext);

  return (
    <MemoizedAgeTextComponent
      goalDate={goalDate}
      chart={chart}
      xScale={scale.x}
      portalRef={portalRef}
    >
      {children}
    </MemoizedAgeTextComponent>
  );
};
