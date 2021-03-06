import React, { useContext, useMemo } from "react";
import { line } from "d3";
import { PropsContext } from "..";

const BordersComponent = () => {
  const { chart, CONSTANTS } = useContext(PropsContext);
  const { CHART } = CONSTANTS;

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

export const Borders = React.memo(BordersComponent);
