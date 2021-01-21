const getAmountByCurrency = (amounts, currency) =>
  amounts.find((amount) => amount.currency === currency) || {};

const parseAmount = (amount) => ({
  ...amount,
  value: Number(amount.value)
});

export const getGoals = (goalsMain, goalsChart, type, currency = "RUB") => {
  return goalsChart.map((goalChart) => {
    const currentGoalMain =
      goalsMain.find((goalMain) => goalMain.code === goalChart.code) || {};

    return {
      code: goalChart.code,
      icon: currentGoalMain.image,
      date: new Date(currentGoalMain.date).getTime(),
      amount: parseAmount(
        getAmountByCurrency(currentGoalMain.amount, currency)
      ),
      age: goalChart.age,
      succeed: goalChart.succeed[type],
      isActive: false
    };
  });
};

export function mergeIcons(data, icons) {
  return data.map((d, i) => ({ ...d, icon: icons[i] }));
}
