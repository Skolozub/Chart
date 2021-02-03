import React from "react";
import { BUBBLE, COMMON, RANGE_SLIDER } from "../constants";

const GoalsComponent = ({ goals, xScale, scenario }) => {
  return (
    <g
      transform={`translate(${RANGE_SLIDER.MARGIN.LEFT}, ${RANGE_SLIDER.GOALS_MARGIN_TOP})`}
    >
      {Object.values(goals).map(({ code, date, succeed }) => (
        <g
          key={code}
          transform={`translate(${xScale(date) - RANGE_SLIDER.GOAL.WIDTH}, ${
            RANGE_SLIDER.GOAL.MARGIN_TOP
          })`}
        >
          <path
            d="M10.435 5C10.435 7.20914 6.04829 11 6.04829 11C6.04829 11 1.66162 7.20914 1.66162 5C1.66162 2.79086 3.6256 1 6.04829 1C8.47098 1 10.435 2.79086 10.435 5Z"
            fill={
              succeed[scenario]
                ? BUBBLE.BACKGROUNDS_COLOR.SUCCEED_ACTIVE
                : BUBBLE.BACKGROUNDS_COLOR.UNSUCCEED_ACTIVE
            }
            stroke={
              succeed[scenario]
                ? BUBBLE.BACKGROUNDS_COLOR.SUCCEED
                : BUBBLE.BACKGROUNDS_COLOR.UNSUCCEED
            }
            strokeOpacity="0.4"
            style={{
              transition: `fill ${COMMON.TRANSITION_DURATION}ms, stroke ${COMMON.TRANSITION_DURATION}ms`
            }}
          />
        </g>
      ))}
    </g>
  );
};

export const Goals = React.memo(GoalsComponent);
