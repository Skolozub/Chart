import * as d3 from "d3";

export const SVG = {
  WIDTH: 960,
  HEIGHT: 400,
  BACKGROUND_COLOR: "#FFFFFF"
};

export const AXIS = {
  FONT_SIZE: 16,
  FONT_COLOR: "#888888",
  Y: {
    PADDING: -8,
    COUNT: 5,
    DASH_WIDTH: 1,
    DASH_GAP: 10,
    LINES_COLOR: "#a8a8a8",
    DOMAIN_STROKE_WIDTH: 1,
    DOMAIN_COLOR: "#eeeeee"
  },
  X: {
    PADDING: 3,
    DOMAIN_STROKE_WIDTH: 2,
    DOMAIN_COLOR: "#eeeeee",
    DOTS_RADIUS: 1.5,
    DOTS_COLOR: "#676767"
  }
};

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
    EXPONENTIAL: d3.curveMonotoneX,
    LINEAR: d3.curveLinear
  },

  DURATION: 1500
};

export const GOAL = {
  AMOUNT: {
    VALUE: {
      HEIGHT: 20,
      BORDER_RADIUS: 10,
      PADDING: {
        RIGHT: 8,
        LEFT: 8
      },
      BACKGROUND_COLOR: "#08A652",
      TEXT_COLOR: "#FFFFFF",
      FONT_SIZE: 16
    },

    LINE: {
      COLOR: "#9cdbba",
      DASH_WIDTH: 7,
      DASH_GAP: 5
    }
  },

  AGE: {
    VALUE: {
      TEXT: "Вам будет",
      MARGIN: 10,
      FONT_SIZE: 14,
      PADDING: 5,
      BACKGROUND_COLOR: "#FFFFFF",
      COLOR: "#068441"
    },

    LINE: {
      HEIGHT: {
        TOP: 3,
        BOTTOM: 3
      },
      COLOR: "#068441"
    }
  },

  LABEL: {
    BACKGROUNDS_COLOR: {
      SUCCEED: "#08A652",
      UNSUCCEED: "#F6650A"
    },

    RADIUS: 24,
    MARGIN: -3,
    TRIANGLE: {
      WIDTH: 9,
      HEIGHT: 5,
      MARGIN: -1
    },
    ICON: {
      WIDTH: 36,
      HEIGHT: 36
    },
    DURATION: "0.3s"
  }
};

export const TOOLTIPS = {
  TYPES: {
    SUCCEED: "succeed",
    UNSUCCEED: "unsucceed"
  }
};

export const HALF = 2;
