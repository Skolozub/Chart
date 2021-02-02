import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { debounce, findLast, throttle } from "lodash";
import { FullWidthWrapper } from "./full-width-wrapper";
import { PFPChart3 } from "./chart_3.0";
import { RangeSlider } from "./chart_3.0/range-slider";
import { mergeGoals } from "./utils/chart";
import { SCENARIO, CHART_TYPE, CURRENCY } from "./constants";
import { extent } from "d3";

export default function App({ mainPage, chart }) {
  const [scenario, setScenario] = useState(SCENARIO.NEGATIVE);

  const [xDomain, setXDomain] = useState([
    chart.period.start,
    chart.period.end
  ]);
  const changeRangeSliderHandler = (startTime, endTime) => {
    setXDomain([startTime, endTime]);
  };
  const changeTrottled = useRef(throttle(changeRangeSliderHandler, 900))
    .current;

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

  const getDateHash = useCallback((date) => {
    const month = new Date(date).getMonth();
    const year = new Date(date).getFullYear();

    return `${month}${year}`;
  }, []);

  const hashFn = useCallback(
    (data) =>
      data.reduce(
        (result, point) => ({
          ...result,
          [getDateHash(point.date)]: point
        }),
        {}
      ),
    [getDateHash]
  );

  const pH = useMemo(() => {
    console.log("------------------------------------------");

    return {
      [SCENARIO.NEGATIVE]: hashFn(chart.points[SCENARIO.NEGATIVE]),
      [SCENARIO.NEUTRAL]: hashFn(chart.points[SCENARIO.NEUTRAL]),
      [SCENARIO.POSITIVE]: hashFn(chart.points[SCENARIO.POSITIVE])
    };
  }, [chart.points, hashFn]);

  const yDomain = useMemo(
    () => [
      pH[scenario][getDateHash(xDomain[0])].amounts[CURRENCY.RUB].value,
      pH[scenario][getDateHash(xDomain[1])].amounts[CURRENCY.RUB].value
    ],
    [pH, scenario, getDateHash, xDomain]
  );

  const data = useMemo(
    () => ({
      points: chart.points,
      period: chart.period,
      goals,
      curveType: chart.curveType,
      scenario,
      currency: CURRENCY.RUB
    }),
    [chart.points, chart.period, chart.curveType, goals, scenario]
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
