import React, { useContext, useState } from "react";
import { PropsContext } from "../index";
import { Age } from "./age";
import { Amount } from "./amount";
import { Bubble } from "./bubble";

// TODO: delete on prod
import { logger } from "../../utils/logger";

export const Goals = () => {
  const { data } = useContext(PropsContext);

  logger.render("Age");

  return (
    <>
      {data.goals.map((goal, index) => (
        <Amount key={goal.code} goal={goal} />
      ))}
      {data.goals.map((goal, index) => (
        <g key={goal.code} className="goal">
          <Age goal={goal} isFirst={index === 0} />
          <Bubble goal={goal} />
        </g>
      ))}
    </>
  );
};
