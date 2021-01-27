import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  extent,
  max,
  scaleLinear,
  scaleTime,
  timeFormatDefaultLocale
} from "d3";
import { Chart } from "./chart";
import * as S from "./index.style";
import * as DEFAULT_CONSTANTS from "./constants";

// TODO: delete on prod
import { logger } from "../utils/logger";

export const PropsContext = React.createContext();

export const PFPChart = ({
  data,
  width,
  height,
  xDomain,
  className,
  constants,
  onGoalClick
}) => {
  const [portalRef, setPortalRef] = useState(null);
  const CONSTANTS = constants || DEFAULT_CONSTANTS;
  const { SVG, CHART, AXIS } = CONSTANTS;

  // set locale
  timeFormatDefaultLocale(CONSTANTS.LOCALE);

  const svg = {
    width: width || SVG.HEIGHT,
    height: height || SVG.HEIGHT
  };

  const chart = {
    width: svg.width - CHART.MARGIN.LEFT - CHART.MARGIN.RIGHT,
    height: svg.height - CHART.MARGIN.TOP - CHART.MARGIN.BOTTOM
  };

  const x = useMemo(
    () =>
      scaleTime()
        // .domain(extent(data.chart, (d) => d.date))
        .domain(xDomain)
        .range([0, chart.width]),
    [xDomain, chart.width]
  );
  // const ex = extent(data.chart, (d) => d.date);
  // console.log("extent", ex.map(Date));

  const yScaleMax = useMemo(() => {
    const yMax = max(data.chart, (d) => d.value);
    return yMax + Math.round(yMax / AXIS.Y.COUNT);
  }, [data.chart, AXIS.Y.COUNT]);

  const y = useMemo(
    () => scaleLinear().domain([0, yScaleMax]).range([chart.height, 0]),
    [yScaleMax, chart.height]
  );

  const scale = {
    x,
    y
  };

  const props = {
    data,
    svg,
    chart,
    scale,
    xDomain,
    className,
    CONSTANTS,
    portalRef,
    onGoalClick
  };

  const getControlRef = useCallback((node) => {
    if (node) {
      setPortalRef(node);
    }
  }, []);

  logger.render("PFPChart");

  return (
    <PropsContext.Provider value={props}>
      <S.Container ref={getControlRef}>{portalRef && <Chart />}</S.Container>
    </PropsContext.Provider>
  );
};
