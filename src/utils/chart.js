import { useMemo, useRef } from "react";

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

export const useCashedChartPoints = (
  currentScenarioPoints,
  startPoint,
  endPoint
) => {
  const cashedStartIndex = useRef(null);
  const cashedEndIndex = useRef(null);
  const cashedCurrentVisiblePoints = useRef(null);

  return useMemo(() => {
    const startIndex = startPoint.index;
    const endIndex = endPoint.index;

    if (
      startIndex === cashedStartIndex.current &&
      endIndex !== cashedEndIndex.current
    ) {
      cashedEndIndex.current = endIndex;
      cashedCurrentVisiblePoints.current = cashedCurrentVisiblePoints.current.slice(
        -endIndex
      );
      return cashedCurrentVisiblePoints.current;
    }

    if (
      startIndex !== cashedStartIndex.current &&
      endIndex === cashedEndIndex.current
    ) {
      cashedStartIndex.current = startIndex;
      cashedCurrentVisiblePoints.current = cashedCurrentVisiblePoints.current.slice(
        startIndex
      );
      return cashedCurrentVisiblePoints.current;
    }

    cashedEndIndex.current = endIndex;
    cashedStartIndex.current = startIndex;
    cashedCurrentVisiblePoints.current = currentScenarioPoints.slice(
      startIndex,
      endIndex
    );
    return cashedCurrentVisiblePoints.current;
  }, [currentScenarioPoints, startPoint, endPoint]);
};
