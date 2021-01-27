import { throttle } from "lodash";
import React, { useEffect, useRef, useState } from "react";

const MIN = "2020";
const MAX = "2066";

export const RangeSlider = ({ onChange }) => {
  const [startRange, setStartRange] = useState("2022");
  const [endRange, setEndRange] = useState("2028");

  const trottledChangeHandler = useRef(throttle(onChange, 100)).current;

  useEffect(() => {
    trottledChangeHandler(Number(startRange), Number(endRange));
  }, [startRange, endRange, onChange, trottledChangeHandler]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label>
        {startRange}
        <input
          type="range"
          value={startRange}
          onChange={(e) => {
            if (e.target.value < endRange) {
              setStartRange(e.target.value);
            }
          }}
          min={MIN}
          max={MAX}
        />
      </label>
      <label>
        {endRange}
        <input
          type="range"
          value={endRange}
          onChange={(e) => {
            if (e.target.value > startRange) {
              setEndRange(e.target.value);
            }
          }}
          min={MIN}
          max={MAX}
        />{" "}
      </label>
    </div>
  );
};
