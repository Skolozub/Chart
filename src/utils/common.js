export const getTime = (date) => new Date(date).getTime();
export const getYear = (date) => new Date(date).getFullYear();

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
