import { axisBottom, scaleLinear, scaleTime, select, timeYear } from "d3";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { PropsContext } from "../chart_2.0";
import { Boundary } from "./boundary";

const period = {
  startDate: "2020-10-13",
  endDate: "2028-10-13",
  maxDate: "2069-10-13"
};
const MARGINS = {
  LEFT: 20,
  RIGTH: 20
};
const startDate = new Date(period.startDate);
const endDate = new Date(period.endDate);
const maxDate = new Date(period.maxDate);

const ONE_YEAR_IN_MILLISECONDS = 31556926000;

const LINE = 4;

const ChartRangeSliderComponent = ({ onChange, width }) => {
  const axisRef = useRef(null);

  const xScale = useMemo(
    () =>
      scaleTime()
        .domain([startDate, maxDate])
        .range([0, width - MARGINS.LEFT - MARGINS.RIGTH]),
    [width]
  );

  const x = useMemo(
    () =>
      scaleLinear()
        .domain([0, width - MARGINS.LEFT - MARGINS.RIGTH])
        .range([startDate, maxDate]),
    [width]
  );

  const [xStart, setXStart] = useState(xScale(startDate));
  const [xEnd, setXEnd] = useState(xScale(endDate));
  const cxMin = 0;
  const cxMax = xScale(maxDate);

  useEffect(() => {
    // onChange(x(xStart), x(xEnd));
    onChange(x(xStart).getTime(), x(xEnd).getTime());
  }, [onChange, x, xStart, xEnd]);

  useEffect(() => {
    const axisCall = axisBottom(xScale)
      .tickPadding(30)
      .ticks(timeYear.every(5))
      .tickSize(0);

    const axis = select(axisRef.current);

    // draw x axis
    axis.transition().duration(500).call(axisCall);

    // add styles to domain line
    // axis
    //   .select(".domain")
    //   .attr("stroke", AXIS.X.DOMAIN_COLOR)
    //   .attr("stroke-width", AXIS.X.DOMAIN_STROKE_WIDTH);

    // change ticks text style
    // axis
    //   .selectAll(".tick text")
    //   .attr("fill", AXIS.FONT_COLOR)
    //   .attr("font-size", AXIS.FONT_SIZE);
  }, [xScale]);

  return (
    <svg width={width} height={80} style={{ background: "width" }}>
      <g transform={`translate(${MARGINS.LEFT}, 40)`}>
        <g ref={axisRef} className="range"></g>
        <line
          x1={xStart}
          y1={0}
          x2={xEnd}
          y2={0}
          stroke="#08A652"
          strokeWidth={LINE}
        />
        <Boundary
          cxMin={cxMin}
          cx={xStart}
          // cxMax={xScale(
          //   new Date(x(xEnd).setFullYear(new Date(x(xEnd)).getFullYear() - 1))
          // )}
          cxMax={xEnd - 20}
          onChange={setXStart}
        />
        <Boundary
          cxMin={xStart + 20}
          cx={xEnd}
          cxMax={cxMax}
          onChange={setXEnd}
        />
      </g>
    </svg>
  );
};

export const ChartRangeSlider = React.memo(ChartRangeSliderComponent);
