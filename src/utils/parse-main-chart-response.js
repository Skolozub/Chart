import { SCENARIO } from "../constants";
import { getHashByDate, getTime } from "./common";

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
  return points.reduce(
    (result, { date, sum }, index) => ({
      ...result,
      [getHashByDate(date)]: {
        index,
        date: getTime(date),
        amounts: parseSumArray(sum)
      }
    }),
    {}
  );
};

const parsePoints = (points) => {
  return {
    [SCENARIO.NEGATIVE]: parseScenario(points[SCENARIO.NEGATIVE]),
    [SCENARIO.NEUTRAL]: parseScenario(points[SCENARIO.NEUTRAL]),
    [SCENARIO.POSITIVE]: parseScenario(points[SCENARIO.POSITIVE])
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
  return {
    curveType: raw.type,
    suggestions: raw.suggestions,
    period: parsePeriod(raw.period),
    points: parsePoints(raw.points),
    goals: parseGoals(raw.goals)
  };
};
