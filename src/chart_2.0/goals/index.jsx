import React, { useContext } from "react";
import { PropsContext } from "../index";
import { Age } from "./age";
import { Amount } from "./amount";
import { Bubble } from "./bubble";

// TODO: delete on prod
import { logger } from "../../utils/logger";

export const Goals = () => {
  const { data, CONSTANTS } = useContext(PropsContext);
  const { BUBBLE_SIZES } = CONSTANTS;

  logger.render("Age");

  return (
    <>
      {data.goals.map((goal, index) => (
        <g key={goal.code} className="goal">
          <Amount goal={goal} />
          <Age goal={goal} isFirst={index === 0} />
          <Bubble
            goal={goal}
            size={goal.isActive ? BUBBLE_SIZES.MEDIUM : BUBBLE_SIZES.SMALL}
          />
        </g>
      ))}
    </>
  );
};
