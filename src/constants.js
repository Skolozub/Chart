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
    EXPONENTIAL: d3.curveBasis, //curveMonotoneX
    LINEAR: d3.curveLinear
  },

  DURATION: 1500
};

export const AMOUNT = {
  VALUE: {
    HEIGHT: 20,
    BORDER_RADIUS: 10,
    MARGIN: {
      RIGHT: 5
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
};

export const AGE = {
  VALUE: {
    TEXT: "Вам будет",
    MARGIN: 3,
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
};

export const BUBBLE_SIZES = {
  SMALL: "small",
  MEDIUM: "medium"
};

export const GOALS_TYPES = {
  SUCCEED: "succeed",
  UNSUCCEED: "unsucceed"
};

export const BUBBLE = {
  BACKGROUNDS_COLOR: {
    [GOALS_TYPES.SUCCEED]: ["#08A652", "#8BD8AA"],
    [GOALS_TYPES.UNSUCCEED]: ["#F6650A", "#FFB992"]
  },

  [BUBBLE_SIZES.SMALL]: {
    RADIUS: 18,
    TAIL: {
      WIDTH: 10,
      HEIGHT: 5,
      MARGIN: -1
    },
    ICON: {
      WIDTH: 27,
      HEIGHT: 27
    }
  },

  [BUBBLE_SIZES.MEDIUM]: {
    RADIUS: 24,
    TAIL: {
      WIDTH: 10,
      HEIGHT: 5,
      MARGIN: -1
    },
    ICON: {
      WIDTH: 36,
      HEIGHT: 36
    }
  },

  TYPES: {
    TOP: "top",
    BOTTOM: "bottom"
  },

  MARGIN: {
    TOP: 0,
    BOTTOM: 18
  },

  DURATION: 300
};

export const CURRENT_AMOUNT = {
  CIRCLE: {
    INNER: {
      RADIUS: 1,
      BACKGROUND_COLOR: "#FFFFFF"
    },
    OUTER: {
      RADIUS: 3,
      BACKGROUND_COLOR: "#068441"
    }
  },
  IMAGE: {
    WIDTH: 22,
    HEIGHT: 22
  }
};

export const TOOLTIPS_TYPES = {
  UNSUCCEED: "unsucceed"
};

export const TOOLTIPS = {
  [TOOLTIPS_TYPES.UNSUCCEED]: {
    MARGIN: {
      TOP: 8,
      BOTTOM: 8
    }
  }
};

export const HALF = 2;
