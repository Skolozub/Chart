import React, { useRef, useContext } from "react";
import { PropsContext } from ".";
import { ChartLine } from "./chart-line";
import { AxisX } from "./axis/axis-x";
import { AxisY } from "./axis/axis-y";
import { Borders } from "./axis/borders";
import { Goals } from "./goals";

// TODO: delete on prod
import { logger } from "../utils/logger";
import { CurrentAmount } from "./current-amount";

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
        <g className="chart" clipPath="url(#chart-clip)">
          {/* TODO: delete on prod */}
          {/* <ChartBoard /> */}
          <ChartLine />
        </g>
        <g className="axis">
          <Borders />
          <AxisY />
          <AxisX />
        </g>
        <g className="goals" clipPath="url(#chart-clip)">
          <Goals />
        </g>
        <CurrentAmount amount={200000} />
      </g>

      <defs>
        <clipPath id="chart-clip">
          <rect width={chart.width} height={chart.height} x={0} y={0} />
        </clipPath>
      </defs>
    </svg>
  );
};
