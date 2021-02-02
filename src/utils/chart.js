export const mergeGoals = (mainPageGoals, chartGoals) => {
  return Object.keys(chartGoals).reduce(
    (result, code) => ({
      ...result,
      [code]: {
        ...mainPageGoals[code],
        ...chartGoals[code],
        isActive: false
      }
    }),
    {}
  );
};
