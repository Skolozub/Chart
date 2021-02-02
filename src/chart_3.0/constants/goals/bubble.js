export const BUBBLE_SIZES = {
  SMALL: "small",
  MEDIUM: "medium"
};

export const BUBBLE = {
  BACKGROUNDS_COLOR: {
    SUCCEED: "#8BD8AA",
    SUCCEED_ACTIVE: "#08A652",
    UNSUCCEED: "#FFB992",
    UNSUCCEED_ACTIVE: "#F6650A"
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
  }
};
