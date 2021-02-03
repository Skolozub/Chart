import React, { useContext, useMemo, useRef } from "react";
import ReactDOM from "react-dom";
import { PropsContext } from "../..";
import { useBoundingClientRect } from "../../../useBoundingClientRect";
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
  svgWidth,
  portalRef
}) => {
  console.log("rerender UnsucceedTooltipComponent");
  const tooltipRef = useRef(null);
  const rect = useBoundingClientRect(tooltipRef);

  const top = useMemo(() => {
    if (!rect) {
      return null;
    }

    if (bubble.type === BUBBLE.TYPES.BOTTOM || bubble.type === null) {
      return (
        bubble.cy -
        BUBBLE[bubble.size].RADIUS -
        rect.height +
        CHART.MARGIN.TOP -
        TOOLTIPS[TOOLTIPS_TYPES.UNSUCCEED].MARGIN.BOTTOM
      );
    }

    if (bubble.type === BUBBLE.TYPES.TOP) {
      return (
        bubble.cy +
        BUBBLE[bubble.size].RADIUS +
        CHART.MARGIN.TOP +
        TOOLTIPS[TOOLTIPS_TYPES.UNSUCCEED].MARGIN.TOP
      );
    }
  }, [rect, bubble.type, bubble.size, bubble.cy]);

  const left = useMemo(() => {
    if (!rect) {
      return null;
    }

    const leftPosition =
      xScale(goalDate) - rect.width / COMMON.HALF + BUBBLE[bubble.size].RADIUS;
    const rightPosition = leftPosition + rect.width;

    if (leftPosition < 0) {
      return 0;
    }
    if (rightPosition > svgWidth) {
      return svgWidth - rect.width;
    }
    return leftPosition;
  }, [rect, xScale, svgWidth, bubble.size, goalDate]);

  return ReactDOM.createPortal(
    <S.Container
      ref={tooltipRef}
      className="unsucceed-tooltip"
      top={top}
      left={left}
    >
      <S.Title>Вы не достигаете цель в срок</S.Title>
      <S.Description>Попробуйте применить советы ниже</S.Description>
    </S.Container>,
    portalRef
  );
};

const MemoizedUnsucceedTooltipComponent = React.memo(UnsucceedTooltipComponent);

export const UnsucceedTooltip = ({ goal, bubble }) => {
  const { svg, scale, portalRef } = useContext(PropsContext);

  return (
    <MemoizedUnsucceedTooltipComponent
      goalDate={goal.date}
      bubble={bubble}
      xScale={scale.x}
      svgWidth={svg.width}
      portalRef={portalRef}
    />
  );
};
