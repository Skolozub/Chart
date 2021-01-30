import React, { useContext } from "react";
import { PropsContext } from "..";
import { CHART } from "../constants";

const BordersComponent = ({ chart }) => {
  console.log("rerender BordersComponent");

  return (
    <g className="borders">
      <line
        x1={0}
        y1={0}
        x2={0}
        y2={chart.height + CHART.BORDER.BOTTOM_SEGMENT}
        className="left"
        stroke={CHART.BORDER.COLOR}
      />
      <line
        x1={chart.width}
        y1={0}
        x2={chart.width}
        y2={chart.height + CHART.BORDER.BOTTOM_SEGMENT}
        className="right"
        stroke={CHART.BORDER.COLOR}
      />
    </g>
  );
};

const MemoizedBordersComponent = React.memo(BordersComponent);

export const Borders = () => {
  const { chart } = useContext(PropsContext);

  return <MemoizedBordersComponent chart={chart} />;
};
