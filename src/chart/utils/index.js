import * as d3 from "d3";

export const formatAmount = d3
  .formatLocale({
    decimal: ",",
    thousands: "\u00a0",
    grouping: [3]
    // currency: ["", "\u00a0€"],
  })
  .format("$,");

export function getBB(selection, property) {
  selection.each(function (d) {
    if (!d.state) {
      d.state = {};
    }
    d.state[property] = this.getBBox();
  });
}

// export function mergeAmountValues(chart, goals) {
//   const chartValuesArray = chart.map(({ value }) => value);
//   const goalsValuesArray = goals.map(({ amount }) => amount.value);

//   return [...chartValuesArray, ...goalsValuesArray];
// }
