import { axisBottom, scaleLinear, scaleTime, select, timeYear } from "d3";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { BUBBLE, COMMON, GOALS_TYPES } from "../constants";
import { Boundary } from "./boundary";

const period = {
  // startDate: "2020-10-13",
  // endDate: "2028-10-13",
  // maxDate: "2069-10-13"
  startDate: "2021-03-01",
  endDate: "2026-02-01",
  maxDate: "2100-01-01"
};
const MARGINS = {
  LEFT: 20,
  RIGTH: 20
};
const startDate = new Date(period.startDate);
const endDate = new Date(period.endDate);
const maxDate = new Date(period.maxDate);

const LINE = 4;

const RangeSliderComponent = ({ goals, scenario, onChange, width }) => {
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

  const yearS = new Date(startDate).getFullYear() + 1;
  const yearE = new Date(maxDate).getFullYear();
  let a = [];

  for (let s = yearS; s <= yearE; s++) {
    const fDate = new Date(`${s}-01-01`).getTime();
    a.push({
      year: s,
      cx: xScale(fDate),
      isA: fDate >= x(xStart).getTime() && fDate <= x(xEnd).getTime()
    });
  }

  useEffect(() => {
    // const axisCall = axisBottom(xScale)
    //   .tickPadding(18) // 7 - 18
    //   .ticks(timeYear.every(5))
    //   .tickSize(0);
    // const axis = select(axisRef.current);
    // draw x axis
    // axis.transition().duration(500).call(axisCall);
  }, [xScale]);

  return (
    <svg
      width={width}
      height={100}
      style={{ background: "#fff", userSelect: "none" }}
    >
      <g transform={`translate(${MARGINS.LEFT}, 40)`}>
        {a.map(({ cx, isA, year }, i) => (
          <g key={cx}>
            {year % 5 ? (
              <circle
                cy={10}
                cx={cx}
                r={1}
                fill={isA ? "#068441" : "rgba(38, 38, 38, 0.4)"}
              />
            ) : (
              <>
                <line
                  x1={cx}
                  y1={5}
                  x2={cx}
                  y2={14}
                  stroke={isA ? "#068441" : "rgba(38, 38, 38, 0.4)"}
                />
                <text
                  x={cx}
                  y={15}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isA ? "#068441" : "rgba(38, 38, 38, 0.55)"}
                  fontSize={10}
                  dy="0.71em"
                  fontFamily="sans-serif"
                >
                  {year}
                </text>
              </>
            )}
          </g>
        ))}
      </g>

      <g transform={`translate(${MARGINS.LEFT}, 25)`}>
        {Object.values(goals).map(({ code, date, succeed }) => (
          <g key={code} transform={`translate(${xScale(date) - 8.77}, 0)`}>
            <path
              d="M10.435 5C10.435 7.20914 6.04829 11 6.04829 11C6.04829 11 1.66162 7.20914 1.66162 5C1.66162 2.79086 3.6256 1 6.04829 1C8.47098 1 10.435 2.79086 10.435 5Z"
              fill={
                succeed[scenario]
                  ? BUBBLE.BACKGROUNDS_COLOR.SUCCEED_ACTIVE
                  : BUBBLE.BACKGROUNDS_COLOR.UNSUCCEED_ACTIVE
              }
              stroke={
                succeed[scenario]
                  ? BUBBLE.BACKGROUNDS_COLOR.SUCCEED
                  : BUBBLE.BACKGROUNDS_COLOR.UNSUCCEED
              }
              strokeOpacity="0.4"
            />
          </g>
        ))}
      </g>
      <g transform={`translate(${MARGINS.LEFT}, 40)`}>
        <line
          x1={xScale(startDate)}
          y1={1}
          x2={xScale(maxDate)}
          y2={1}
          stroke="rgba(38, 38, 38, 0.24)"
          strokeWidth={2}
        />
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

export const RangeSlider = React.memo(RangeSliderComponent);
