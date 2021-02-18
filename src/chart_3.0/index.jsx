import React, { useCallback, useMemo, useState } from "react";
import {
  formatDefaultLocale,
  scaleLinear,
  scaleTime,
  timeFormatDefaultLocale
} from "d3";
import { Chart } from "./chart";
import { LOCALE, SVG, CHART } from "./constants";
import * as S from "./index.style";
import { Provider } from "./provider";

const PFPChartComponent = ({
  className,
  data,
  width,
  height,
  xDomain,
  yDomain,
  onGoalClick
}) => {
  const [portalRef, setPortalRef] = useState(null);

  // set locale
  formatDefaultLocale(LOCALE);
  timeFormatDefaultLocale(LOCALE);

  const svg = useMemo(
    () => ({
      width: width || SVG.WIDTH,
      height: height || SVG.HEIGHT
    }),
    [width, height]
  );

  const chart = useMemo(
    () => ({
      width: svg.width - CHART.MARGIN.LEFT - CHART.MARGIN.RIGHT,
      height: svg.height - CHART.MARGIN.TOP - CHART.MARGIN.BOTTOM
    }),
    [svg.width, svg.height]
  );

  const x = useMemo(() => scaleTime().domain(xDomain).range([0, chart.width]), [
    xDomain,
    chart.width
  ]);

  const y = useMemo(
    () => scaleLinear().domain(yDomain).range([chart.height, 0]),
    [yDomain, chart.height]
  );

  const scale = useMemo(() => ({ x, y }), [x, y]);

  const props = useMemo(
    () => ({
      data,
      svg,
      chart,
      scale,
      xDomain,
      className,
      portalRef,
      onGoalClick
    }),
    [data, svg, chart, scale, xDomain, className, portalRef, onGoalClick]
  );

  const getControlRef = useCallback((node) => {
    if (node) {
      setPortalRef(node);
    }
  }, []);

  return (
    <Provider value={props}>
      <S.Container ref={getControlRef}>{portalRef && <Chart />}</S.Container>
    </Provider>
  );
};

// TODO: rename
export const PFPChart3 = React.memo(PFPChartComponent);
