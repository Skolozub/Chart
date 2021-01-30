import * as d3 from "d3";

export const CHART = {
  WIDTH: 841,
  HEIGHT: 291,

  MARGIN: {
    TOP: 20,
    RIGHT: 100,
    BOTTOM: 40,
    LEFT: 20
  },

  LINE_COLOR: "#08A652",

  BORDER: {
    COLOR: "#eeeeee",
    BOTTOM_SEGMENT: 10
  },

  CURVE_TYPE: {
    EXPONENTIAL: d3.curveMonotoneX, //curveBasis
    LINEAR: d3.curveLinear
  },

  DURATION: 1500
};
