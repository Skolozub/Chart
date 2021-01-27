import React, { useCallback, useEffect, useRef, useState } from "react";
import icons from "./svg";
import * as CONSTANTS from "./constants";

import { getGoals, mergeIcons } from "./utils";
import mainpageJSON from "./data/person-mainpage.json";
import chartmainJSON from "./data/person-chartmain.json";
import { FullWidthWrapper } from "./full-width-wrapper";
import { PFPChart } from "./chart_2.0";
import { RangeSlider } from "./chart_2.0/range-slider";

export default function App() {
  const [type, setType] = useState("negative");
  const [chartData, setChartData] = useState([]);
  const goalsInit = useRef([]);
  const chartInit = useRef([]);
  const [goals, setGoals] = useState([]);
  const [amount, setAmount] = useState(100000);

  const [start, setStart] = useState(new Date(`2020-01-01`).getTime());
  const [end, setEnd] = useState(new Date(`2021-01-01`).getTime());

  useEffect(() => {
    const { goals: goalsMain } = mainpageJSON.body;
    const { goals: goalsChart } = chartmainJSON.body.chart;

    const nextGoals = getGoals(goalsMain, goalsChart, type);
    const goalsWithIcons = mergeIcons(nextGoals, icons);

    goalsInit.current = goalsWithIcons;
    setGoals(goalsWithIcons);
  }, [type]);

  useEffect(() => {
    const { [type]: points } = chartmainJSON.body.chart.points[0];

    const nextPoints = points.map((point) => ({
      date: new Date(point.date).getTime(),
      value: Number(point.amount[0].value)
    }));

    chartInit.current = nextPoints;
    setChartData(nextPoints);
  }, [type]);

  const changeAmountsHandler = (d) => {
    if (!goals.length) {
      return null;
    }

    const nextGoals = goals.map((goal) => ({
      ...goal,
      amount: {
        ...goal.amount,
        value: goal.amount.value + amount * d
      }
    }));

    setGoals(nextGoals);
  };

  const setActiveGoalHandler = (code, isActive) => {
    const nextGoals = goals.map((it) => {
      if (it.code === code) {
        return {
          ...it,
          isActive: isActive !== undefined ? isActive : !it.isActive
        };
      }
      return {
        ...it,
        isActive: false
      };
    });

    setGoals(nextGoals);
  };

  const changeRangeHandler = useCallback((startYear, endYear) => {
    setStart(new Date(`${startYear}-01-01`).getTime());
    setEnd(new Date(`${endYear}-01-01`).getTime());
  }, []);

  useEffect(() => {
    const nextGoals = goalsInit.current.filter((it) => {
      return it.date >= start && it.date <= end;
    });

    console.log("end", end);

    console.log("nextGoals", nextGoals);

    setGoals(nextGoals);

    // const nextPoints = chartInit.current.filter((it) => {
    //   const pointYear = new Date(it.date).getFullYear();

    //   return pointYear >= start && pointYear <= end;
    // });

    // setChartData(nextPoints);
  }, [start, end, type]);

  return (
    <>
      <h3 style={{ marginBottom: 10 }}>Options</h3>
      <div style={{ display: "flex", marginBottom: 20 }}>
        <div style={{ marginRight: 40 }}>
          <h4 style={{ margin: "0 0 10px 0" }}>Amount</h4>
          <div style={{ display: "flex" }}>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <button onClick={() => changeAmountsHandler(1)}>up</button>
            <button onClick={() => changeAmountsHandler(-1)}>down</button>
          </div>
        </div>
        <div>
          <h4 style={{ margin: "0 0 10px 0" }}>Type</h4>
          <div style={{ display: "flex" }}>
            <button onClick={() => setType("negative")}>negative</button>
            <button onClick={() => setType("positive")}>positive</button>
            <button onClick={() => setType("neutral")}>neutral</button>
          </div>
        </div>
      </div>

      <RangeSlider onChange={changeRangeHandler} />

      <FullWidthWrapper>
        {(rect) => (
          <>
            <PFPChart
              data={{ chart: chartData, goals }}
              width={rect.width}
              height={undefined}
              constants={CONSTANTS}
              className="pfp-chart"
              onGoalClick={setActiveGoalHandler}
              xDomain={[start, end]}
            />
            {/* <hr />
            <Chart
              chartData={chartData}
              goalsData={goals}
              svgWidth={rect.width}
              onGoalClick={setActiveGoalHandler}
            /> */}
          </>
        )}
      </FullWidthWrapper>
    </>
  );
}
