import React, { useContext, useMemo, useRef } from "react";
import ReactDOM from "react-dom";
import { PropsContext } from "../..";
import { useBoundingClientRect } from "../../../useBoundingClientRect";
import { useOutsideRefClick } from "../../../useOutsideRefClick";
import {
  CHART,
  BUBBLE,
  TOOLTIPS_TYPES,
  TOOLTIPS,
  COMMON
} from "../../constants";
import * as S from "./index.style";

const UnsucceedTooltipComponent = ({
  goalDate,
  bubble,
  xScale,
  portalRef,
  parentRef,
  onGoalClick
}) => {
  console.log("rerender UnsucceedTooltipComponent");
  useOutsideRefClick(parentRef, onGoalClick);
  const tooltipRef = useRef(null);
  const rect = useBoundingClientRect(tooltipRef);

  const top = useMemo(() => {
    if (!rect) {
      return 0;
    }
    const positionMultiplier = bubble.type === BUBBLE.TYPES.TOP ? 1 : -1;
    return (
      CHART.MARGIN.TOP +
      bubble.cy +
      (BUBBLE[bubble.size].RADIUS +
        rect.height +
        TOOLTIPS[TOOLTIPS_TYPES.UNSUCCEED].MARGIN.BOTTOM) *
        positionMultiplier
    );
  }, [rect, bubble.type, bubble.size, bubble.cy]);

  const left = useMemo(() => {
    if (!rect) {
      return 0;
    }
    const leftPosition =
      xScale(goalDate) - rect.width / COMMON.HALF + BUBBLE[bubble.size].RADIUS;
    return leftPosition < 0 ? 0 : leftPosition;
  }, [rect, xScale, bubble.size, goalDate]);

  return ReactDOM.createPortal(
    <S.Container
      ref={tooltipRef}
      className="unsucceed-tooltip"
      top={top}
      left={left}
      onClick={onGoalClick}
    >
      <S.Title>Вы не достигаете цель в срок</S.Title>
      <S.Description>Попробуйте применить советы ниже</S.Description>
    </S.Container>,
    portalRef
  );
};

const MemoizedUnsucceedTooltipComponent = React.memo(UnsucceedTooltipComponent);

export const UnsucceedTooltip = ({ goal, bubble, parentRef }) => {
  const { scale, portalRef, onGoalClick } = useContext(PropsContext);

  return (
    <MemoizedUnsucceedTooltipComponent
      goalDate={goal.date}
      bubble={bubble}
      xScale={scale.x}
      parentRef={parentRef}
      portalRef={portalRef}
      onGoalClick={onGoalClick}
    />
  );
};
