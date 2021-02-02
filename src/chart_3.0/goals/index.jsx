import React, { useContext } from "react";
import { PropsContext } from "../index";
import { Age } from "./age";
import { Bubble } from "./bubble";

const GoalsComponent = ({ goals }) => {
  console.log("rerender GoalsComponent");
  return (
    <>
      {Object.values(goals).map((goal, index) => (
        <g key={goal.code} className="goal">
          <Age goal={goal} isFirst={index === 0} />
          <Bubble goal={goal} />
        </g>
      ))}
    </>
  );
};

const MemoizedGoalsComponent = React.memo(GoalsComponent);

export const Goals = () => {
  const { data } = useContext(PropsContext);

  return <MemoizedGoalsComponent goals={data.goals} />;
};
