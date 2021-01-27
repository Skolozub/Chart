import React, { useContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { PropsContext } from "../..";
import * as S from "./index.style";

export const UnsucceedTooltip = ({ goal, bubble }) => {
  const { portalRef, chart, scale, onGoalClick, CONSTANTS } = useContext(
    PropsContext
  );
  const { CHART, BUBBLE, TOOLTIPS_TYPES, TOOLTIPS, COMMON } = CONSTANTS;

  const tooltipRef = useRef(null);
  const [top, setTop] = useState(null);
  const [left, setLeft] = useState(null);

  useEffect(() => {
    if (!tooltipRef.current) {
      return void 0;
    }

    const rect = tooltipRef.current.getBoundingClientRect();

    function getTooltipTop() {
      switch (bubble.type) {
        case BUBBLE.TYPES.TOP: {
          return (
            CHART.MARGIN.TOP +
            bubble.cy +
            BUBBLE[bubble.size].RADIUS +
            TOOLTIPS[TOOLTIPS_TYPES.UNSUCCEED].MARGIN.TOP
          );
        }
        case BUBBLE.TYPES.BOTTOM: {
          return (
            CHART.MARGIN.TOP +
            bubble.cy -
            BUBBLE[bubble.size].RADIUS -
            rect.height -
            TOOLTIPS[TOOLTIPS_TYPES.UNSUCCEED].MARGIN.BOTTOM
          );
        }
        default: {
          return (
            CHART.MARGIN.TOP +
            bubble.cy -
            BUBBLE[bubble.size].RADIUS -
            rect.height -
            TOOLTIPS[TOOLTIPS_TYPES.UNSUCCEED].MARGIN.BOTTOM
          );
        }
      }
    }

    const tooltipTop = getTooltipTop();
    const tooltipLeft =
      CHART.MARGIN.LEFT + scale.x(goal.date) - rect.width / COMMON.HALF;

    setTop(tooltipTop);
    setLeft(tooltipLeft);
  }, [
    scale,
    chart.width,
    goal,
    bubble,
    CHART,
    BUBBLE,
    TOOLTIPS_TYPES,
    TOOLTIPS,
    COMMON.HALF
  ]);

  return ReactDOM.createPortal(
    <S.Container
      ref={tooltipRef}
      className="unsucceed-tooltip"
      left={left}
      top={top}
      onClick={onGoalClick}
    >
      <S.Title>Вы не достигаете цель в срок</S.Title>
      <S.Description>Попробуйте применить советы ниже</S.Description>
    </S.Container>,
    portalRef
  );
};
