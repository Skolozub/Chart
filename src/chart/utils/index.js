import { formatLocale } from "d3";

export const formatAmount = formatLocale({
  decimal: ",",
  thousands: "\u00a0",
  grouping: [3]
  // currency: ["", "\u00a0€"],
}).format("$,");
