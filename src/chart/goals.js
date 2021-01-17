import * as d3 from "d3";

import { CHART, GOAL } from "../constants";
import { formatAmount, getBB } from "./utils";

export const drawGoals = (parentNode, data, x, y, width, height) => {
  const goalsGroup = parentNode.append("g").attr("class", "goals-group");

  const goalsNodes = goalsGroup
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "goal");

  function drawAmountLine() {
    goalsNodes
      .append("path")
      .attr("class", "amount-line")
      .attr("d", getCoords)
      .attr("stroke", GOAL.AMOUNT.LINE.COLOR)
      .style(
        "stroke-dasharray",
        `${GOAL.AMOUNT.LINE.DASH_WIDTH}, ${GOAL.AMOUNT.LINE.DASH_GAP}`
      );

    function getCoords(d) {
      return d3.line()([
        [0, y(d.amount.value)],
        [width + CHART.MARGIN.RIGHT, y(d.amount.value)]
      ]);
    }
  }

  function drawAmountValues() {
    goalsGroup
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "amount-text")
      .attr("font-family", "sans-serif")
      .text((d) => formatAmount(d.amount.value))
      .attr("font-size", GOAL.AMOUNT.VALUE.FONT_SIZE)
      .attr("fill", GOAL.AMOUNT.VALUE.TEXT_COLOR)
      .attr("dy", "0.32em")
      .call((d) => getBB(d, "amountText"))
      .attr(
        "x",
        (d) =>
          width +
          CHART.MARGIN.RIGHT -
          d.state.amountText.width -
          GOAL.AMOUNT.VALUE.PADDING.RIGHT
      )
      .attr("y", (d) => y(d.amount.value));

    goalsNodes
      .append("rect")
      .attr("class", "amount-rect")
      .attr("width", (d) => {
        if (!d.state) {
          d.state = {};
        }

        d.state.amountRect = {
          width:
            d.state.amountText.width +
            GOAL.AMOUNT.VALUE.PADDING.LEFT +
            GOAL.AMOUNT.VALUE.PADDING.RIGHT
        };

        return d.state.amountRect.width;
      })
      .attr("height", GOAL.AMOUNT.VALUE.HEIGHT)
      .attr("fill", GOAL.AMOUNT.VALUE.BACKGROUND_COLOR)
      .attr("rx", GOAL.AMOUNT.VALUE.BORDER_RADIUS)
      .attr("ry", GOAL.AMOUNT.VALUE.BORDER_RADIUS)
      .attr("x", (d) => width + CHART.MARGIN.RIGHT - d.state.amountRect.width)
      .attr("y", (d) => y(d.amount.value) - GOAL.AMOUNT.VALUE.HEIGHT / 2);
  }

  function drawAgeLine() {
    goalsNodes
      .append("path")
      .attr("class", "age-line")
      .attr("d", getCoords)
      .attr("stroke", GOAL.AGE.LINE.COLOR);

    function getCoords(d) {
      return d3.line()([
        [x(d.date), height - GOAL.AGE.LINE.HEIGHT.TOP],
        [x(d.date), height + GOAL.AGE.LINE.HEIGHT.BOTTOM]
      ]);
    }
  }

  function drawAgeValue() {
    goalsNodes
      .append("text")
      .attr("class", "age-value")
      .text((d) => `${GOAL.AGE.VALUE.TEXT} ${d.age}`)
      .attr("fill", GOAL.AGE.VALUE.COLOR)
      .call((d) => getBB(d, "ageValue"))
      .attr("x", (d) => x(d.date) - d.state.ageValue.width / 2)
      .attr("y", (d) => {
        if (!d.state) {
          d.state = {};
        }

        d.state.ageValue = {
          y: height - GOAL.AGE.VALUE.MARGIN
        };

        return d.state.ageValue.y;
      })
      .attr("background", GOAL.AGE.VALUE.BACKGROUND_COLOR);
  }

  function drawLabels() {
    const labelGroup = goalsNodes.append("g").attr("class", "label-group");

    labelGroup
      .attr("opacity", 0)
      .transition()
      .duration(500)
      .delay((_, i) => {
        return CHART.DURATION + i * GOAL.LABEL.DURATION;
      })
      .attr("opacity", 1);

    labelGroup
      .append("circle")
      .attr("class", "label")
      .attr("r", GOAL.LABEL.RADIUS)
      .attr(
        "fill",
        (d) => GOAL.LABEL.BACKGROUNDS_COLOR[d.succeed ? "SUCCEED" : "UNSUCCEED"]
      )
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => getLabelCenterY(d).centerY);

    labelGroup
      .append("path")
      .attr("class", "triangle")
      .attr("d", (d) => d3.line()(getTriangleCoords(d)))
      .attr(
        "fill",
        (d) => GOAL.LABEL.BACKGROUNDS_COLOR[d.succeed ? "SUCCEED" : "UNSUCCEED"]
      );

    labelGroup
      .append("image")
      .attr("class", "icon")
      .attr("height", GOAL.LABEL.ICON.WIDTH)
      .attr("width", GOAL.LABEL.ICON.HEIGHT)
      .attr("x", (d) => x(d.date) - GOAL.LABEL.ICON.WIDTH / 2)
      .attr("y", (d) => getLabelCenterY(d).centerY - GOAL.LABEL.ICON.HEIGHT / 2)
      .attr("xlink:href", (d) => d.icon);

    function getLabelCenterY(d) {
      const centerY = y(d.amount.value);

      if (d.state?.ageValue?.y) {
        const bottomY =
          centerY +
          GOAL.LABEL.RADIUS +
          GOAL.LABEL.TRIANGLE.HEIGHT +
          GOAL.LABEL.MARGIN;
        const topY = centerY + GOAL.LABEL.RADIUS + GOAL.LABEL.MARGIN;

        if (bottomY > d.state.ageValue.y || topY < 0) {
          return {
            centerY:
              d.state.ageValue.y -
              GOAL.LABEL.RADIUS -
              GOAL.LABEL.MARGIN -
              GOAL.LABEL.TRIANGLE.HEIGHT,
            isTriangleVisible: true
          };
        }
      }

      return { centerY, isTriangleVisible: false };
    }

    function getTriangleCoords(d) {
      const { centerY, isTriangleVisible } = getLabelCenterY(d);
      const labelBottomY = centerY + GOAL.LABEL.RADIUS;
      const topTriangleVisibleCoord = isTriangleVisible
        ? 0
        : GOAL.LABEL.TRIANGLE.HEIGHT;
      const topTriangleY =
        labelBottomY + GOAL.LABEL.TRIANGLE.MARGIN - topTriangleVisibleCoord;

      return [
        [
          //centerBottom
          x(d.date),
          topTriangleY + GOAL.LABEL.TRIANGLE.HEIGHT
        ],
        [
          //topLeft
          x(d.date) - GOAL.LABEL.TRIANGLE.WIDTH / 2,
          topTriangleY
        ],
        [
          // topRight
          x(d.date) + GOAL.LABEL.TRIANGLE.WIDTH / 2,
          topTriangleY
        ]
      ];
    }
  }

  drawAmountLine();
  drawAmountValues();
  drawAgeLine();
  drawAgeValue();
  drawLabels();
};
