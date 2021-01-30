import React, { useContext, useMemo } from "react";
import { AgeText } from "./age-text";
import { PropsContext } from "../../index";
import { AGE } from "../../constants";

const AgeComponent = ({ goalDate, goalAge, chart, xScale, isFirst }) => {
  console.log("rerender AgeComponent");

  const x = useMemo(() => xScale(goalDate), [goalDate, xScale]);

  return (
    <>
      <line
        className="age-line"
        x1={x}
        y1={chart.height - AGE.LINE.HEIGHT.TOP}
        x2={x}
        y2={chart.height + AGE.LINE.HEIGHT.BOTTOM}
        stroke={AGE.LINE.COLOR}
      />
      <AgeText goalDate={goalDate}>
        {`${isFirst ? AGE.VALUE.TEXT : ""} ${goalAge}`}
      </AgeText>
    </>
  );
};

const MemoizedAgeComponent = React.memo(AgeComponent);

export const Age = ({ goal, isFirst }) => {
  const { chart, scale } = useContext(PropsContext);

  return (
    <MemoizedAgeComponent
      goalDate={goal.date}
      goalAge={goal.age}
      chart={chart}
      xScale={scale.x}
      isFirst={isFirst}
    />
  );
};
