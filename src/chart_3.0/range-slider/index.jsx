import React, { useCallback, useEffect, useMemo, useState } from "react";
import { scaleLinear, scaleTime } from "d3";
import { RANGE_SLIDER } from "../constants";
import { Axis } from "./axis";
import { Goals } from "./goals";
import { Range } from "./range";

const RangeSliderComponent = ({ period, goals, scenario, onChange, width }) => {
  const rangeWidth = useMemo(
    () => width - RANGE_SLIDER.MARGIN.LEFT - RANGE_SLIDER.MARGIN.RIGTH,
    [width]
  );

  const xScale = useMemo(
    () => scaleTime().domain([period.start, period.max]).range([0, rangeWidth]),
    [rangeWidth, period.start, period.max]
  );

  const invertX = useMemo(
    () =>
      scaleLinear().domain([0, rangeWidth]).range([period.start, period.max]),
    [rangeWidth, period.start, period.max]
  );

  const [timeStart, setTimeStart] = useState(period.start);
  const [timeEnd, setTimeEnd] = useState(period.end);

  const xStart = useMemo(() => xScale(timeStart), [xScale, timeStart]);
  const xEnd = useMemo(() => xScale(timeEnd), [xScale, timeEnd]);
  const xMin = 0;
  const xMax = useMemo(() => xScale(period.max), [xScale, period.max]);

  const onChangeLeft = useCallback(
    (next) => {
      setTimeStart(invertX(next));
    },
    [invertX]
  );

  const onChangeRight = useCallback(
    (next) => {
      setTimeEnd(invertX(next));
    },
    [invertX]
  );

  useEffect(() => {
    onChange(timeStart, timeEnd);
  }, [onChange, timeStart, timeEnd]);

  return (
    <svg
      width={width}
      height={RANGE_SLIDER.HEIGHT}
      style={{ background: RANGE_SLIDER.BACKGROUND_COLOR, userSelect: "none" }}
    >
      <Goals goals={goals} xScale={xScale} scenario={scenario} />

      <Axis
        rangeWidth={rangeWidth}
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
        onChangeLeft={onChangeLeft}
        onChangeRight={onChangeRight}
      />
    </svg>
  );
};

export const RangeSlider = React.memo(RangeSliderComponent);
