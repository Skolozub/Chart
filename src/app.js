import React, { useEffect, useState } from "react";
import { Chart } from "./chart";
import icons from "./svg";

import { getGoals, mergeIcons } from "./utils";
import mainpageJSON from "./data/person-mainpage.json";
import chartmainJSON from "./data/person-chartmain.json";
import { FullWidthWrapper } from "./full-width-wrapper";
import { Tooltip } from "./tooltip";

export default function App() {
  const [type, setType] = useState("negative");
  const [chartData, setChartData] = useState([]);
  const [goals, setGoals] = useState([]);
  const [amount, setAmount] = useState(100000);

  useEffect(() => {
    const { goals: goalsMain } = mainpageJSON.body;
    const { goals: goalsChart } = chartmainJSON.body.chart;

    const nextGoals = getGoals(goalsMain, goalsChart, type);

    setGoals(mergeIcons(nextGoals, icons));
  }, [type]);

  useEffect(() => {
    const { [type]: points } = chartmainJSON.body.chart.points[0];

    const nextPoints = points.map((point) => ({
      date: new Date(point.date).getTime(),
      value: Number(point.amount[0].value)
    }));

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
      return it;
    });

    setGoals(nextGoals);
  };

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

      <FullWidthWrapper>
        {(rect) => (
          <Chart
            chartData={chartData}
            goalsData={goals}
            svgWidth={rect.width}
            onGoalClick={setActiveGoalHandler}
          />
        )}
      </FullWidthWrapper>
    </>
  );
}
