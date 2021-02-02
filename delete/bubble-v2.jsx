import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef
} from "react";
import { line, select } from "d3";
import { PropsContext } from "../index";
import { UnsucceedTooltip } from "../tooltips/unsucceed-tooltip";
import { CHART, BUBBLE, BUBBLE_SIZES, COMMON } from "../constants";
import { useOutsideRefClick } from "../../useOutsideRefClick";

const BubbleComponent = ({
  goal,
  scale,
  currency,
  chartHeight,
  onGoalClick,
  isSucceed,
  isActive
}) => {
  console.log("rerender BubbleComponent");
  const size = isActive ? BUBBLE_SIZES.MEDIUM : BUBBLE_SIZES.SMALL;

  const bubble = useMemo(() => {
    const cx = scale.x(goal.date);
    const cy = scale.y(goal.amounts[currency].value);

    // bubble y top coordinate
    const yBubbleTop =
      cy - CHART.MARGIN.TOP - BUBBLE.MARGIN.TOP - BUBBLE[size].TAIL.HEIGHT;

    // bubble y bottom coordinate
    const yBubbleBottom =
      cy +
      BUBBLE.MARGIN.BOTTOM +
      BUBBLE[size].RADIUS * 2 +
      BUBBLE[size].TAIL.HEIGHT -
      CHART.MARGIN.TOP;

    const bH = BUBBLE[size].RADIUS + BUBBLE[size].TAIL.HEIGHT;

    // if bubble y top coordinate less then chart y top coordinate
    // recalculate circle y center coordinate
    if (yBubbleTop <= 0) {
      return {
        size,
        cx,
        cy: bH + BUBBLE.MARGIN.TOP + BUBBLE.MARGIN.TOP,
        isTailVisible: true,
        type: BUBBLE.TYPES.TOP
      };
    }

    // if label y bottom coordinate more then text y top coordinate
    // recalculate circle y center coordinate
    if (yBubbleBottom >= chartHeight) {
      return {
        size,
        cx,
        cy: chartHeight - bH - BUBBLE.MARGIN.BOTTOM,
        isTailVisible: true,
        type: BUBBLE.TYPES.BOTTOM
      };
    }

    return { size, cx, cy, isTailVisible: false, type: null };
  }, [goal.amounts, goal.date, scale, size, currency, chartHeight]);

  // const bubble = useMemo(() => {
  //   // circle center coordinates
  //   const cx = scale.x(goal.date);
  //   const cy = scale.y(goal.amounts[currency].value);

  //   // bubble y top coordinate
  //   const yBubbleTop =
  //     cy - BUBBLE[size].RADIUS - BUBBLE.MARGIN.TOP - BUBBLE[size].TAIL.HEIGHT;

  //   // bubble y bottom coordinate
  //   const yBubbleBottom =
  //     cy +
  //     BUBBLE[size].RADIUS +
  //     BUBBLE.MARGIN.BOTTOM +
  //     BUBBLE[size].TAIL.HEIGHT;

  //   // if bubble y top coordinate less then chart y top coordinate
  //   // recalculate circle y center coordinate
  //   if (yBubbleTop <= 0) {
  //     return {
  //       size,
  //       cx,
  //       cy: BUBBLE[size].RADIUS + BUBBLE[size].TAIL.HEIGHT + BUBBLE.MARGIN.TOP,
  //       isTailVisible: true,
  //       type: BUBBLE.TYPES.TOP
  //     };
  //   }

  //   // if label y bottom coordinate more then text y top coordinate
  //   // recalculate circle y center coordinate
  //   if (yBubbleBottom >= chartHeight) {
  //     return {
  //       size,
  //       cx,
  //       cy:
  //         chartHeight -
  //         BUBBLE[size].RADIUS -
  //         BUBBLE[size].TAIL.HEIGHT -
  //         BUBBLE.MARGIN.BOTTOM,
  //       isTailVisible: true,
  //       type: BUBBLE.TYPES.BOTTOM
  //     };
  //   }

  //   return { size, cx, cy, isTailVisible: false, type: null };
  // }, [goal.date, goal.amounts, currency, scale, size, chartHeight]);

  // const tailPath = useMemo(() => {
  //   const { cy, type } = bubble;

  //   function getTailTypeMultiplier(tailType) {
  //     if (tailType === BUBBLE.TYPES.TOP) {
  //       return -1;
  //     }
  //     if (tailType === BUBBLE.TYPES.BOTTOM) {
  //       return 1;
  //     }
  //     return 0;
  //   }

  //   const tailTypeMultiplier = getTailTypeMultiplier(type);

  //   const yCircleBottom =
  //     cy +
  //     (BUBBLE[size].RADIUS + BUBBLE[size].TAIL.MARGIN) * tailTypeMultiplier;

  const tailCoordsBottom = [
    [0, 0],
    [BUBBLE[size].TAIL.WIDTH, 0],
    [BUBBLE[size].TAIL.WIDTH / 2, BUBBLE[size].TAIL.HEIGHT]
  ];

  const tailCoordsTop = [
    [0, BUBBLE[size].TAIL.HEIGHT],
    [BUBBLE[size].TAIL.WIDTH, BUBBLE[size].TAIL.HEIGHT],
    [BUBBLE[size].TAIL.WIDTH / 2, 0]
  ];

  const path = line()(
    bubble.type === BUBBLE.TYPES.TOP ? tailCoordsTop : tailCoordsBottom
  );

  const getBubbleColor = useCallback(
    (isActive) => {
      // succeed
      if (isSucceed) {
        return isActive
          ? BUBBLE.BACKGROUNDS_COLOR.SUCCEED_ACTIVE
          : BUBBLE.BACKGROUNDS_COLOR.SUCCEED;
      }

      // unsucceed
      return isActive
        ? BUBBLE.BACKGROUNDS_COLOR.UNSUCCEED_ACTIVE
        : BUBBLE.BACKGROUNDS_COLOR.UNSUCCEED;
    },
    [isSucceed]
  );

  const bubbleRef = useRef(null);
  const bubbleColor = getBubbleColor(isActive);

  useEffect(() => {
    const bubbleSelection = select(bubbleRef.current);

    bubbleSelection.transition().duration(1000).style("opacity", 1);
  }, []);

  useEffect(() => {
    const bubbleSelection = select(bubbleRef.current);
    const circleSelection = bubbleSelection.select(".circle");
    const tailSelection = bubbleSelection.select(".tail");

    bubbleSelection
      .on("mouseover", () => {
        circleSelection.attr("fill", getBubbleColor(true));
        tailSelection.attr("fill", getBubbleColor(true));
      })
      .on("mouseout", () => {
        circleSelection.attr("fill", getBubbleColor(isActive));
        tailSelection.attr("fill", getBubbleColor(isActive));
      });
  }, [isActive, getBubbleColor]);

  const toggleHandler = useCallback(() => onGoalClick(goal.code), [
    onGoalClick,
    goal.code
  ]);

  const closeHandler = useCallback(() => onGoalClick(goal.code, false), [
    onGoalClick,
    goal.code
  ]);

  useOutsideRefClick(bubbleRef, closeHandler);

  return (
    <>
      <g
        className="bubble"
        ref={bubbleRef}
        onClick={toggleHandler}
        style={{ opacity: 0, transition: `${COMMON.TRANSITION_DURATION}ms` }}
        transform={`translate(${bubble.cx}, ${bubble.cy})`}
      >
        {bubble.isTailVisible && (
          <path
            className="tail"
            d={path}
            fill={bubbleColor}
            style={{
              transition: `transform ${COMMON.TRANSITION_DURATION}ms, fill ${COMMON.TRANSITION_DURATION}ms`
            }}
            transform={`translate(${-BUBBLE[size].TAIL.WIDTH / 2}, ${
              bubble.type === BUBBLE.TYPES.TOP
                ? -BUBBLE[size].RADIUS -
                  BUBBLE[size].TAIL.HEIGHT -
                  BUBBLE[size].TAIL.MARGIN
                : BUBBLE[size].RADIUS + BUBBLE[size].TAIL.MARGIN
            })`}
          />
        )}

        <circle
          className="circle"
          r={BUBBLE[size].RADIUS}
          fill={bubbleColor}
          cx={0}
          cy={0}
          style={{
            transition: `r ${COMMON.TRANSITION_DURATION}ms, fill ${COMMON.TRANSITION_DURATION}ms`
          }}
        />

        {goal.icon && (
          <image
            className="icon"
            xlinkHref={goal.icon}
            width={BUBBLE[size].ICON.WIDTH}
            height={BUBBLE[size].ICON.HEIGHT}
            x={-BUBBLE[size].ICON.WIDTH / 2}
            y={-BUBBLE[size].ICON.HEIGHT / 2}
            style={{
              transition: `width ${COMMON.TRANSITION_DURATION}ms, height ${COMMON.TRANSITION_DURATION}ms, x ${COMMON.TRANSITION_DURATION}ms, y ${COMMON.TRANSITION_DURATION}ms`
            }}
          />
        )}
      </g>

      {/* {!isSucceed && isActive && (
        <UnsucceedTooltip goal={goal} bubble={bubble} />
      )} */}
    </>
  );
};

const MemoizedBubbleComponent = React.memo(BubbleComponent);

export const Bubble = ({ goal }) => {
  const { data, chart, scale, onGoalClick } = useContext(PropsContext);

  return (
    <MemoizedBubbleComponent
      goal={goal}
      scale={scale}
      currency={data.currency}
      chartHeight={chart.height}
      isSucceed={goal.succeed[data.scenario]}
      isActive={goal.isActive}
      onGoalClick={onGoalClick}
    />
  );
};
