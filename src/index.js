import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
// import mainpageJSON from "./data/person-mainpage.json";
// import chartmainJSON from "./data/person-chartmain.json";
// import chartmainEveryMonthJSON from "./data/chart-every-month.json";
// import chartmainEveryYearJSON from "./data/chart-every-year.json";
import realPersonMainpageEveryMonthJSON from "./data/real-person-mainpage.json";
import realChartEveryMonthJSON from "./data/real-chart-every-month.json";
import { parseMainPageResponse } from "./utils/parse-main-page-response";
import { parseMainChartResponse } from "./utils/parse-main-chart-response";

const parsedMainPageData = parseMainPageResponse(
  realPersonMainpageEveryMonthJSON.body
);
// const parsedMainChartData = parseMainChartResponse(chartmainJSON.body.chart);
const parsedMainChartEveryMonthData = parseMainChartResponse(
  realChartEveryMonthJSON.body
);
// const parsedMainChartEveryYearData = parseMainChartResponse(
//   chartmainEveryYearJSON.body
// );

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App
      mainPage={parsedMainPageData}
      // chart={parsedMainChartData}
      chart={parsedMainChartEveryMonthData}
      // chart={parsedMainChartEveryYearData}
    />
  </React.StrictMode>,
  rootElement
);
