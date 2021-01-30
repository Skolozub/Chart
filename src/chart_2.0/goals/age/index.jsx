import React, { useContext, useMemo } from "react";
import { line } from "d3";
import { AgeText } from "./age-text";
import { PropsContext } from "../../index";

export const Age = ({ goal, isFirst }) => {
  const { chart, scale, CONSTANTS } = useContext(PropsContext);
  const { AGE } = CONSTANTS;

  const ageLinePath = useMemo(() => {
    const coords = [
      [scale.x(goal.date), chart.height - AGE.LINE.HEIGHT.TOP],
      [scale.x(goal.date), chart.height + AGE.LINE.HEIGHT.BOTTOM]
    ];

    return line()(coords);
  }, [goal.date, chart.height, scale, AGE]);

  return (
    <>
      <path className="age-line" d={ageLinePath} stroke={AGE.LINE.COLOR} />
      <AgeText goal={goal}>
        {`${isFirst ? AGE.VALUE.TEXT : ""} ${goal.age}`}
      </AgeText>
    </>
  );
};
