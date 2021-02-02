import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { debounce } from "lodash";
import { FullWidthWrapper } from "./full-width-wrapper";
import { PFPChart3 } from "./chart_3.0";
import { RangeSlider } from "./chart_3.0/range-slider";
import { mergeGoals, useCashedChartPoints } from "./utils/chart";
import { SCENARIO, CURRENCY } from "./constants";
import { getHashByDate } from "./utils/common";

export default function App({ mainPage, chart }) {
  const [scenario, setScenario] = useState(SCENARIO.NEGATIVE);

  // x domain
  const [xDomain, setXDomain] = useState([
    chart.period.start,
    chart.period.end
  ]);

  const changeRangeSliderHandler = (startTime, endTime) => {
    setXDomain([startTime, endTime]);
  };

  const changeTrottled = useRef(debounce(changeRangeSliderHandler, 200))
    .current;

  // goals
  const [goals, setGoals] = useState(null);

  useEffect(() => {
    const mergedGoals = mergeGoals(mainPage.goals, chart.goals);
    setGoals(mergedGoals);
  }, [mainPage.goals, chart.goals]);

  const setActiveGoalHandler = useCallback((code, isActive) => {
    const getNextActiveGoals = (prev) => {
      if (prev[code] && prev[code].isActive !== isActive) {
        return {
          ...prev,
          [code]: {
            ...prev[code],
            isActive: isActive !== undefined ? isActive : !prev[code].isActive
          }
        };
      }

      return prev;
    };

    setGoals(getNextActiveGoals);
  }, []);

  // yDomain
  const [startPeriod, endPeriod] = xDomain;

  const startPoint = useMemo(
    () => chart.points[scenario][getHashByDate(startPeriod)],
    [chart.points, scenario, startPeriod]
  );

  const endPoint = useMemo(
    () => chart.points[scenario][getHashByDate(endPeriod)],
    [chart.points, scenario, endPeriod]
  );

  const yDomain = useMemo(
    () => [
      startPoint.amounts[CURRENCY.RUB].value,
      endPoint.amounts[CURRENCY.RUB].value
    ],
    [startPoint, endPoint]
  );

  const currentScenarioPoints = useMemo(
    () => Object.values(chart.points[scenario]),
    [chart.points, scenario]
  );

  // current chart points
  const currentVisiblePoints = useCashedChartPoints(
    currentScenarioPoints,
    startPoint,
    endPoint
  );

  const data = useMemo(
    () => ({
      points: currentVisiblePoints,
      period: chart.period,
      goals,
      curveType: chart.curveType,
      scenario,
      currency: CURRENCY.RUB
    }),
    [currentVisiblePoints, chart.period, chart.curveType, goals, scenario]
  );

  // const [, setToggle] = useState(true);
  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setToggle((toggle) => !toggle);
  //   }, 1000);
  //   return () => clearInterval(id);
  // }, []);

  return (
    <>
      <div>
        <h4 style={{ margin: "0 0 10px 0" }}>Scenario</h4>
        <div style={{ display: "flex" }}>
          <button onClick={() => setScenario(SCENARIO.NEGATIVE)}>
            {SCENARIO.NEGATIVE}
          </button>
          <button onClick={() => setScenario(SCENARIO.POSITIVE)}>
            {SCENARIO.POSITIVE}
          </button>
          <button onClick={() => setScenario(SCENARIO.NEUTRAL)}>
            {SCENARIO.NEUTRAL}
          </button>
        </div>
      </div>

      <FullWidthWrapper>
        {(rect) => (
          <>
            <PFPChart3
              className="pfp-chart"
              data={data}
              width={rect.width}
              xDomain={xDomain}
              yDomain={yDomain}
              onGoalClick={setActiveGoalHandler}
            />
            <RangeSlider
              goals={goals}
              scenario={scenario}
              width={rect.width}
              onChange={changeTrottled}
            />
          </>
        )}
      </FullWidthWrapper>
    </>
  );
}
