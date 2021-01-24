import React, { useContext, useMemo } from "react";
import { line } from "d3";
import { AgeText } from "./age-text";
import { PropsContext } from "../../index";

// TODO: delete on prod
import { logger } from "../../../utils/logger";

export const Age = ({ goal, isFirst }) => {
  const { chart, scale, CONSTANTS } = useContext(PropsContext);
  const { GOAL } = CONSTANTS;

  const ageLinePath = useMemo(() => {
    const coords = [
      [scale.x(goal.date), chart.height - GOAL.AGE.LINE.HEIGHT.TOP],
      [scale.x(goal.date), chart.height + GOAL.AGE.LINE.HEIGHT.BOTTOM]
    ];

    return line()(coords);
  }, [goal.date, chart.height, scale, GOAL]);

  logger.render("Age");

  return (
    <>
      <path className="age-line" d={ageLinePath} stroke={GOAL.AGE.LINE.COLOR} />
      <AgeText goal={goal}>
        {`${isFirst ? GOAL.AGE.VALUE.TEXT : ""} ${goal.age}`}
      </AgeText>
    </>
  );
};
