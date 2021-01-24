import React, { useRef, useContext } from "react";
import { PropsContext } from ".";
import { AxisX } from "./axis/axis-x";
import { AxisY } from "./axis/axis-y";
import { Borders } from "./axis/borders";
import { Goals } from "./goals";

// TODO: delete on prod
import { logger } from "../utils/logger";
import { ChartLine } from "./chart-line";

export const Chart = () => {
  const { svg, chart, className, CONSTANTS } = useContext(PropsContext);
  const { SVG, CHART } = CONSTANTS;

  const svgRef = useRef(null);

  logger.render("Chart");

  return (
    <svg
      ref={svgRef}
      className={className}
      width={svg.width}
      height={svg.height}
      style={{ background: SVG.BACKGROUND_COLOR }}
    >
      <g
        className="chart-group"
        width={chart.width}
        height={chart.height}
        transform={`translate(${CHART.MARGIN.LEFT}, ${CHART.MARGIN.TOP})`}
      >
        <g className="chart">
          <ChartLine />
        </g>
        <g className="axis">
          <Borders />
          <AxisY />
          <AxisX />
        </g>
        <g className="goals">
          <Goals />
        </g>
      </g>
    </svg>
  );
};
