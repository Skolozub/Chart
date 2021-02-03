import { SCENARIO } from "../constants";
import { getTime } from "./common";

const parsePeriod = ({ startDate, endDate, maxDate }) => {
  return {
    start: getTime(startDate),
    end: getTime(endDate),
    max: getTime(maxDate)
  };
};

const parseSum = ({ amount, currency }) => ({
  value: Number(amount),
  currency: currency
});

const parseSumArray = (sumArray) =>
  sumArray.reduce((result, sum) => {
    return {
      ...result,
      [sum.currency]: parseSum(sum)
    };
  }, {});

const parseScenario = (points) => {
  return points.map(({ date, sum }, index) => ({
    index,
    date: getTime(date),
    amounts: parseSumArray(sum)
  }));
};

const parsePoints = (points) => {
  return {
    [SCENARIO.NEGATIVE]: parseScenario(points[SCENARIO.NEGATIVE]),
    [SCENARIO.NEUTRAL]: parseScenario(points[SCENARIO.NEUTRAL]),
    [SCENARIO.POSITIVE]: parseScenario(points[SCENARIO.POSITIVE])
  };
};

const parseCurrentAmounts = (points) => {
  return {
    [SCENARIO.NEGATIVE]: points[SCENARIO.NEGATIVE][0],
    [SCENARIO.NEUTRAL]: points[SCENARIO.NEUTRAL][0],
    [SCENARIO.POSITIVE]: points[SCENARIO.POSITIVE][0]
  };
};

const parseGoals = (goals) => {
  return goals.reduce(
    (result, { code, age, succeed }) => ({
      ...result,
      [code]: {
        code,
        age,
        succeed
      }
    }),
    {}
  );
};

export const parseMainChartResponse = (raw) => {
  const parsedPoints = parsePoints(raw.points);

  return {
    curveType: raw.type,
    suggestions: raw.suggestions,
    period: parsePeriod(raw.period),
    points: parsedPoints,
    goals: parseGoals(raw.goals),
    currentAmounts: parseCurrentAmounts(parsedPoints)
  };
};
