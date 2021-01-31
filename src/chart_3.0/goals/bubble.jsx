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
import { GOALS_TYPES, BUBBLE, BUBBLE_SIZES, COMMON } from "../constants";

const BubbleComponent = ({ goal, scale, chartHeight, onGoalClick }) => {
  const size = goal.isActive ? BUBBLE_SIZES.MEDIUM : BUBBLE_SIZES.SMALL;

  const bubble = useMemo(() => {
    // circle center coordinates
    const cx = scale.x(goal.date);
    const cy = scale.y(goal.amount.value);

    // bubble y top coordinate
    const yBubbleTop =
      cy - BUBBLE[size].RADIUS - BUBBLE.MARGIN.TOP - BUBBLE[size].TAIL.HEIGHT;

    // bubble y bottom coordinate
    const yBubbleBottom =
      cy +
      BUBBLE[size].RADIUS +
      BUBBLE.MARGIN.BOTTOM +
      BUBBLE[size].TAIL.HEIGHT;

    // if bubble y top coordinate less then chart y top coordinate
    // recalculate circle y center coordinate
    if (yBubbleTop <= 0) {
      return {
        size,
        cx,
        cy: BUBBLE[size].RADIUS + BUBBLE[size].TAIL.HEIGHT + BUBBLE.MARGIN.TOP,
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
        cy:
          chartHeight -
          BUBBLE[size].RADIUS -
          BUBBLE[size].TAIL.HEIGHT -
          BUBBLE.MARGIN.BOTTOM,
        isTailVisible: true,
        type: BUBBLE.TYPES.BOTTOM
      };
    }

    return { size, cx, cy, isTailVisible: false, type: null };
  }, [goal, scale, size, chartHeight]);

  const tailPath = useMemo(() => {
    const { cy, type } = bubble;

    function getTailTypeMultiplier(tailType) {
      if (tailType === BUBBLE.TYPES.TOP) {
        return -1;
      }
      if (tailType === BUBBLE.TYPES.BOTTOM) {
        return 1;
      }
      return 0;
    }

    const tailTypeMultiplier = getTailTypeMultiplier(type);

    const yCircleBottom =
      cy +
      (BUBBLE[size].RADIUS + BUBBLE[size].TAIL.MARGIN) * tailTypeMultiplier;

    const tailCoords = [
      [
        //centerBottom
        scale.x(goal.date),
        yCircleBottom + BUBBLE[size].TAIL.HEIGHT * tailTypeMultiplier
      ],
      [
        //topLeft
        scale.x(goal.date) - BUBBLE[size].TAIL.WIDTH / COMMON.HALF,
        yCircleBottom
      ],
      [
        // topRight
        scale.x(goal.date) + BUBBLE[size].TAIL.WIDTH / COMMON.HALF,
        yCircleBottom
      ]
    ];

    return line()(tailCoords);
  }, [bubble, goal.date, scale, size]);

  const getBubbleColor = useCallback(
    (isActive) => {
      // succeed
      if (goal.succeed) {
        if (goal.isActive) {
          return BUBBLE.BACKGROUNDS_COLOR[GOALS_TYPES.SUCCEED][0];
        }

        return BUBBLE.BACKGROUNDS_COLOR[GOALS_TYPES.SUCCEED][1];
      }

      // unsucceed
      if (goal.isActive) {
        return BUBBLE.BACKGROUNDS_COLOR[GOALS_TYPES.UNSUCCEED][0];
      }

      return BUBBLE.BACKGROUNDS_COLOR[GOALS_TYPES.UNSUCCEED][1];
    },
    [goal.succeed, goal.isActive]
  );

  const bubbleRef = useRef(null);
  const bubbleColor = getBubbleColor(goal.isActive);

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
        circleSelection.attr("fill", getBubbleColor(goal.isActive));
        tailSelection.attr("fill", getBubbleColor(goal.isActive));
      });
  }, [goal.isActive, getBubbleColor]);

  const onClickHandler = useCallback(() => onGoalClick(goal.code), [
    onGoalClick,
    goal.code
  ]);

  return (
    <>
      <g
        className="bubble"
        ref={bubbleRef}
        onClick={onClickHandler}
        style={{ textAlign: "center", opacity: 0 }}
      >
        <path
          className="tail"
          d={tailPath}
          fill={bubbleColor}
          style={{
            transition: `d ${COMMON.TRANSITION_DURATION}ms, fill ${COMMON.TRANSITION_DURATION}ms`
          }}
        />

        <circle
          className="circle"
          r={BUBBLE[size].RADIUS}
          fill={bubbleColor}
          cx={bubble.cx}
          cy={bubble.cy}
          style={{
            transition: `r ${COMMON.TRANSITION_DURATION}ms, cx ${COMMON.TRANSITION_DURATION}ms, cy ${COMMON.TRANSITION_DURATION}ms, fill ${COMMON.TRANSITION_DURATION}ms`
          }}
        />

        {goal.icon && (
          <image
            className="icon"
            xlinkHref={goal.icon}
            width={BUBBLE[size].ICON.WIDTH}
            height={BUBBLE[size].ICON.HEIGHT}
            x={scale.x(goal.date) - BUBBLE[size].ICON.WIDTH / COMMON.HALF}
            y={bubble.cy - BUBBLE[size].ICON.HEIGHT / COMMON.HALF}
            style={{
              transition: `width ${COMMON.TRANSITION_DURATION}ms, height ${COMMON.TRANSITION_DURATION}ms, x ${COMMON.TRANSITION_DURATION}ms, y ${COMMON.TRANSITION_DURATION}ms`
            }}
          />
        )}
      </g>

      {!goal.succeed && goal.isActive && (
        <UnsucceedTooltip goal={goal} bubble={bubble} />
      )}
    </>
  );
};

const MemoizedBubbleComponent = React.memo(BubbleComponent);

export const Bubble = ({ goal }) => {
  const { chart, scale, onGoalClick } = useContext(PropsContext);

  return (
    <MemoizedBubbleComponent
      goal={goal}
      scale={scale}
      chartHeight={chart.height}
      onGoalClick={onGoalClick}
    />
  );
};
