export const getTime = (date) => new Date(date).getTime();
export const getYear = (date) => new Date(date).getFullYear();
export const getMonth = (date) => new Date(date).getMonth();

export const parseAmount = ({ value, currency }) => ({
  value: Number(value),
  currency: currency
});

export const parseAmounts = (amounts) =>
  amounts.reduce((result, amount) => {
    return {
      ...result,
      [amount.currency]: parseAmount(amount)
    };
  }, {});

export const getHashByDate = (date, from = "monthYear") => {
  if (from === "onlyYear") {
    return `${getYear(date)}`;
  }

  if (from === "monthYear") {
    return `${getYear(date)}${getMonth(date)}`;
  }

  return `${date}`;
};
