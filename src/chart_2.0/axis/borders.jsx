import React, { useContext, useMemo } from "react";
import { line } from "d3";
import { PropsContext } from "..";

// TODO: delete on prod
import { logger } from "../../utils/logger";

export const Borders = () => {
  const { chart, CONSTANTS } = useContext(PropsContext);
  const { CHART } = CONSTANTS;

  const leftBorderPath = useMemo(() => {
    const coords = [
      [0, 0],
      [0, chart.height + CHART.BORDER.BOTTOM_SEGMENT]
    ];

    return line()(coords);
  }, [chart.height, CHART.BORDER.BOTTOM_SEGMENT]);

  const rightBorderPath = useMemo(() => {
    const coords = [
      [chart.width, 0],
      [chart.width, chart.height + CHART.BORDER.BOTTOM_SEGMENT]
    ];

    return line()(coords);
  }, [chart, CHART.BORDER.BOTTOM_SEGMENT]);

  logger.render("Borders");

  return (
    <g className="borders">
      <path d={leftBorderPath} className="left" stroke={CHART.BORDER.COLOR} />
      <path d={rightBorderPath} className="right" stroke={CHART.BORDER.COLOR} />
    </g>
  );
};
