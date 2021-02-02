import { getTime, parseAmounts } from "./common";
import icons from "../svg";

const parseGoals = (goals) => {
  return goals.reduce(
    (result, { code, name, image, date, amount, accumulation }, index) => ({
      ...result,
      [code]: {
        code,
        name,
        icon: icons[index % 7], // image,
        date: getTime(date),
        amounts: parseAmounts(amount),
        accumulation: parseAmounts(accumulation)
      }
    }),
    {}
  );
};

export const parseMainPageResponse = (raw) => {
  return {
    budget: raw.budget,
    investProfile: raw.investProfile,
    goals: parseGoals(raw.goals)
  };
};
