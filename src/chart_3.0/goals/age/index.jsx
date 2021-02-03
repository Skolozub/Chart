import React, { useContext, useMemo } from "react";
import { line } from "d3";
import { AgeText } from "./age-text";
import { PropsContext } from "../../index";
import { AGE, COMMON } from "../../constants";

const AgeComponent = ({ goalDate, goalAge, chart, xScale, isActive }) => {
  console.log("rerender AgeComponent");
  const ageLinePath = useMemo(() => {
    const coords = [
      [xScale(goalDate), chart.height - AGE.LINE.HEIGHT.TOP],
      [xScale(goalDate), chart.height + AGE.LINE.HEIGHT.BOTTOM]
    ];

    return line()(coords);
  }, [goalDate, chart.height, xScale]);

  if (!isActive) {
    return null;
  }

  return (
    <>
      <path
        className="age-line"
        d={ageLinePath}
        stroke={AGE.LINE.COLOR}
        style={{
          transition: `d ${COMMON.TRANSITION_DURATION}ms`
        }}
      />
      <AgeText goalDate={goalDate}>{`${AGE.VALUE.TEXT} ${goalAge}`}</AgeText>
    </>
  );
};

const MemoizedAgeComponent = React.memo(AgeComponent);

export const Age = ({ goal }) => {
  const { chart, scale } = useContext(PropsContext);

  return (
    <MemoizedAgeComponent
      goalDate={goal.date}
      goalAge={goal.age}
      chart={chart}
      xScale={scale.x}
      isActive={goal.isActive}
    />
  );
};
