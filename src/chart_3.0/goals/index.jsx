import React, { useContext } from "react";
import { PropsContext } from "../provider";
import { Age } from "./age";
import { Bubble } from "./bubble";

const GoalsComponent = ({ goals }) => {
  console.log("rerender GoalsComponent");
  return (
    <>
      {Object.values(goals).map((goal, index) => (
        <g key={goal.code} className="goal">
          <Age goal={goal} />
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
