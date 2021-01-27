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

// TODO: delete on prod
import { logger } from "../../utils/logger";

export const Bubble = ({ goal }) => {
  const { chart, scale, CONSTANTS, onGoalClick } = useContext(PropsContext);
  const { BUBBLE, GOALS_TYPES, BUBBLE_SIZES, COMMON } = CONSTANTS;

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
    if (yBubbleBottom >= chart.height) {
      return {
        size,
        cx,
        cy:
          chart.height -
          BUBBLE[size].RADIUS -
          BUBBLE[size].TAIL.HEIGHT -
          BUBBLE.MARGIN.BOTTOM,
        isTailVisible: true,
        type: BUBBLE.TYPES.BOTTOM
      };
    }

    return { size, cx, cy, isTailVisible: false, type: null };
  }, [goal, scale, size, chart.height, BUBBLE]);

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
  }, [bubble, goal.date, scale, size, BUBBLE, COMMON.HALF]);

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

  logger.render("Bubble");

  return (
    <>
      <g
        className="bubble"
        ref={bubbleRef}
        onClick={() => onGoalClick(goal.code)}
        style={{ opacity: 0 }}
      >
        <path
          className="tail"
          d={tailPath}
          fill={bubbleColor}
          style={{ transition: `${BUBBLE.DURATION}ms` }}
        />

        <circle
          className="circle"
          r={BUBBLE[size].RADIUS}
          fill={bubbleColor}
          cx={bubble.cx}
          cy={bubble.cy}
          style={{ transition: `${BUBBLE.DURATION}ms` }}
        />

        {goal.icon && (
          <image
            className="icon"
            xlinkHref={goal.icon}
            width={BUBBLE[size].ICON.WIDTH}
            height={BUBBLE[size].ICON.HEIGHT}
            x={scale.x(goal.date) - BUBBLE[size].ICON.WIDTH / COMMON.HALF}
            y={bubble.cy - BUBBLE[size].ICON.HEIGHT / COMMON.HALF}
            style={{ transition: `${BUBBLE.DURATION}ms` }}
          />
        )}
      </g>

      {!goal.succeed && goal.isActive && (
        <UnsucceedTooltip goal={goal} bubble={bubble} />
      )}
    </>
  );
};
