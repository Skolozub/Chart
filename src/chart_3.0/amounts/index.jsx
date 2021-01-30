import React, { useContext } from "react";
import { PropsContext } from "../index";
import { Amount } from "./amount";

const AmountsComponent = ({ goals }) => {
  console.log("rerender AmountsComponent");

  return (
    <>
      {goals.map((goal) => (
        <Amount key={goal.code} goal={goal} />
      ))}
    </>
  );
};

const MemoizedAmountsComponent = React.memo(AmountsComponent);

export const Amounts = () => {
  const { data } = useContext(PropsContext);

  return <MemoizedAmountsComponent goals={data.goals} />;
};
