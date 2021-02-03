import React, { useEffect, useMemo, useState } from "react";
import { scaleLinear, scaleTime } from "d3";
import { RANGE_SLIDER } from "../constants";
import { Axis } from "./axis";
import { Goals } from "./goals";
import { Range } from "./range";

const RangeSliderComponent = ({ period, goals, scenario, onChange, width }) => {
  const xScale = useMemo(
    () =>
      scaleTime()
        .domain([period.start, period.max])
        .range([
          0,
          width - RANGE_SLIDER.MARGIN.LEFT - RANGE_SLIDER.MARGIN.RIGTH
        ]),
    [width, period.start, period.max]
  );

  const invertX = useMemo(
    () =>
      scaleLinear()
        .domain([
          0,
          width - RANGE_SLIDER.MARGIN.LEFT - RANGE_SLIDER.MARGIN.RIGTH
        ])
        .range([period.start, period.max]),
    [width, period.start, period.max]
  );

  const [xStart, setXStart] = useState(xScale(period.start));
  const [xEnd, setXEnd] = useState(xScale(period.end));
  const xMin = 0;
  const xMax = useMemo(() => xScale(period.max), [xScale, period.max]);

  useEffect(() => {
    onChange(invertX(xStart), invertX(xEnd));
  }, [onChange, invertX, xStart, xEnd]);

  return (
    <svg
      width={width}
      height={RANGE_SLIDER.HEIGHT}
      style={{ background: RANGE_SLIDER.BACKGROUND_COLOR, userSelect: "none" }}
    >
      <Goals goals={goals} xScale={xScale} scenario={scenario} />

      <Axis
        startPeriod={period.start}
        maxPeriod={period.max}
        xScale={xScale}
        invertX={invertX}
        xStart={xStart}
        xEnd={xEnd}
      />

      <Range
        startPeriod={period.start}
        maxPeriod={period.max}
        invertX={invertX}
        xScale={xScale}
        xStart={xStart}
        xEnd={xEnd}
        xMax={xMax}
        xMin={xMin}
        onChangeLeft={setXStart}
        onChangeRight={setXEnd}
      />
    </svg>
  );
};

export const RangeSlider = React.memo(RangeSliderComponent);
