import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef
} from "react";
import { line, select } from "d3";
import { PropsContext } from "../index";

// TODO: delete on prod
import { logger } from "../../utils/logger";
// size: ["small", "medium"]
// tailPosition: ["bottom", "top"]

export const Bubble = ({ goal, size }) => {
  const { chart, scale, onGoalClick, CONSTANTS } = useContext(PropsContext);
  const { BUBBLE, GOALS_TYPES, TAIL_TYPES, HALF } = CONSTANTS;

  const bubble = useMemo(() => {
    // circle center coordinates
    const cx = scale.x(goal.date);
    const cy = scale.y(goal.amount.value);

    // bubble y top coordinate
    const yBubbleTop =
      cy - BUBBLE[size].RADIUS - BUBBLE[size].TAIL.HEIGHT + BUBBLE.MARGIN.TOP;

    // bubble y bottom coordinate
    const yBubbleBottom =
      cy +
      BUBBLE[size].RADIUS +
      BUBBLE[size].TAIL.HEIGHT +
      BUBBLE.MARGIN.BOTTOM;

    // if bubble y top coordinate less then chart y top coordinate
    // recalculate circle y center coordinate
    if (yBubbleTop <= 0) {
      return {
        cx,
        cy: BUBBLE[size].RADIUS + BUBBLE[size].TAIL.HEIGHT + BUBBLE.MARGIN.TOP,
        isTailVisible: true,
        type: TAIL_TYPES.TOP
      };
    }

    // if label y bottom coordinate more then text y top coordinate
    // recalculate circle y center coordinate
    if (yBubbleBottom >= chart.height) {
      return {
        cx,
        cy:
          chart.height -
          BUBBLE[size].RADIUS -
          BUBBLE[size].TAIL.HEIGHT -
          BUBBLE.MARGIN.BOTTOM,
        isTailVisible: true,
        type: TAIL_TYPES.BOTTOM
      };
    }

    return { cx, cy, isTailVisible: false, type: null };
  }, [goal, scale, size, chart.height, BUBBLE, TAIL_TYPES]);

  const tailPath = useMemo(() => {
    const { cy, type } = bubble;

    function getTailTypeMultiplier(tailType) {
      if (tailType === TAIL_TYPES.TOP) {
        return -1;
      }
      if (tailType === TAIL_TYPES.BOTTOM) {
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
        scale.x(goal.date) - BUBBLE[size].TAIL.WIDTH / HALF,
        yCircleBottom
      ],
      [
        // topRight
        scale.x(goal.date) + BUBBLE[size].TAIL.WIDTH / HALF,
        yCircleBottom
      ]
    ];

    return line()(tailCoords);
  }, [bubble, goal.date, scale, size, BUBBLE, HALF, TAIL_TYPES]);

  const getBubbleColor = useCallback(
    (isActive) => {
      // succeed
      if (goal.succeed) {
        if (isActive) {
          return BUBBLE.BACKGROUNDS_COLOR[GOALS_TYPES.SUCCEED][0];
        }

        return BUBBLE.BACKGROUNDS_COLOR[GOALS_TYPES.SUCCEED][1];
      }

      // unsucceed
      if (isActive) {
        return BUBBLE.BACKGROUNDS_COLOR[GOALS_TYPES.UNSUCCEED][0];
      }

      return BUBBLE.BACKGROUNDS_COLOR[GOALS_TYPES.UNSUCCEED][1];
    },
    [goal.succeed, BUBBLE, GOALS_TYPES]
  );

  const bubbleColor = getBubbleColor(goal.isActive);
  const bubbleRef = useRef(null);

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

  logger.render("Bubble");

  return (
    <>
      <g
        className="bubble"
        ref={bubbleRef}
        onClick={() => onGoalClick(goal.code)}
      >
        <path className="tail" d={tailPath} fill={bubbleColor} />

        <circle
          className="circle"
          r={BUBBLE[size].RADIUS}
          fill={bubbleColor}
          cx={bubble.cx}
          cy={bubble.cy}
        />

        {goal.icon && (
          <image
            className="icon"
            xlinkHref={goal.icon}
            width={BUBBLE[size].ICON.WIDTH}
            height={BUBBLE[size].ICON.HEIGHT}
            x={scale.x(goal.date) - BUBBLE[size].ICON.WIDTH / HALF}
            y={bubble.cy - BUBBLE[size].ICON.HEIGHT / HALF}
          />
        )}
      </g>

      {/* {!goal.succeed && goal.isActive&& (
        <DrawTooltip x={xLabel} y={yLabel}  />
      )} */}
    </>
  );
};
