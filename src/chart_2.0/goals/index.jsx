import React, { useContext } from "react";
import { PropsContext } from "../index";
import { Age } from "./age";

// TODO: delete on prod
import { logger } from "../../utils/logger";
import { Amount } from "./amount";

export const Goals = () => {
  const { data } = useContext(PropsContext);

  logger.render("Age");

  return (
    <>
      {data.goals.map((goal, index) => (
        <g key={goal.code} className="goal">
          <Amount goal={goal} />
          <Age goal={goal} isFirst={index === 0} />
        </g>
      ))}
    </>
  );
};
