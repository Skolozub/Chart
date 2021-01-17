import React, { useRef, useEffect, useState, useCallback } from "react";
import { CHART, SVG, AXIS, AMOUNT, GOAL } from "./constants";
import * as d3 from "d3";

export const Chart = ({
  chartData,
  amountValue,
  goals,
  svgWidth = SVG.WIDTH,
  svgHeight = SVG.HEIGHT
}) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);

  const formatAmount = d3
    .formatLocale({
      decimal: ",",
      thousands: "\u00a0",
      grouping: [3]
      // currency: ["", "\u00a0€"],
    })
    .format("$,");

  function getBB(selection) {
    selection.each(function (d) {
      d.bbox = this.getBBox();
    });
  }

  const drawChartBorders = useCallback((parentNode, width, height) => {
    // draw left and right lines
    const drawLine = d3.line();

    // added left line
    const leftLineCoords = [
      [CHART.MARGIN.LEFT, CHART.MARGIN.TOP],
      [CHART.MARGIN.LEFT, height + CHART.MARGIN.TOP + 10]
    ];

    parentNode
      .append("path")
      .attr("class", "left-chart-border")
      .attr("d", drawLine(leftLineCoords))
      .attr("stroke", CHART.BORDERS_COLOR);

    // added right line
    const rightLineCoords = [
      [width + CHART.MARGIN.LEFT, CHART.MARGIN.TOP],
      [width + CHART.MARGIN.LEFT, height + CHART.MARGIN.TOP + 10]
    ];

    parentNode
      .append("path")
      .attr("class", "right-chart-border")
      .attr("d", drawLine(rightLineCoords))
      .attr("stroke", CHART.BORDERS_COLOR);
  }, []);

  const drawChartLine = useCallback((parentNode, data, x, y) => {
    const drawLine = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.value))
      .curve(CHART.CURVE_TYPE.EXPONENTIAL);

    parentNode
      .append("path")
      .data([data])
      .attr("d", drawLine)
      .attr("stroke", CHART.LINE_COLOR)
      .attr("fill", "none");
  }, []);

  const drawRightAxis = useCallback(
    (parentNode, y, width) => {
      // create axis group
      const axisGroup = parentNode
        .append("g")
        .attr("class", "rightAxis")
        .attr("transform", `translate(${width}, 0)`);

      // create right axis
      const axis = axisGroup.call(
        d3
          .axisRight(y)
          .tickFormat((d) => formatAmount(d))
          .ticks(AXIS.Y.COUNT)
          .tickPadding(AXIS.Y.PADDING)
          .tickSizeOuter(0)
      );

      // remove domain line
      axis.select(".domain").remove();

      // change tick lines
      axis
        .selectAll(".tick line")
        .attr("stroke", AXIS.Y.LINES_COLOR)
        .attr("x2", `${width}`)
        .attr("transform", `translate(${-width}, 0)`)
        .style("stroke-dasharray", `${AXIS.Y.DASH_WIDTH},${AXIS.Y.DASH_GAP}`);

      // change ticks text style
      axis
        .selectAll(".tick text")
        .attr("text-anchor", "end")
        .attr("font-size", AXIS.FONT_SIZE)
        .attr("fill", AXIS.FONT_COLOR);
    },
    [formatAmount]
  );

  const drawBottomAxis = useCallback((parentNode, x, height) => {
    // create axis group
    const axisGroup = parentNode
      .append("g")
      .attr("class", "bottomAxis")
      .attr("transform", `translate(0, ${height})`);

    // create bottom axis
    const axis = axisGroup.call(
      d3.axisBottom(x).tickPadding(AXIS.X.PADDING).tickSizeOuter(0)
    );

    // add styles to domain
    axis
      .select(".domain")
      .attr("stroke", AXIS.X.DOMAIN_COLOR)
      .attr("stroke-width", AXIS.X.DOMAIN_STROKE_WIDTH);

    // remove lines from ticks
    axis.selectAll(".tick line").remove();

    // add dots to ticks
    axis
      .selectAll(".tick")
      .append("circle")
      .attr("r", AXIS.X.DOTS_RADIUS)
      .attr("fill", AXIS.X.DOTS_COLOR);

    // change ticks text style
    axis
      .selectAll(".tick text")
      .attr("fill", AXIS.FONT_COLOR)
      .attr("font-size", AXIS.FONT_SIZE);
  }, []);

  const drawAmount = useCallback(
    (parentNode, y, width, value) => {
      // draw line
      const coords = [
        [0, y(value)],
        [width + CHART.MARGIN.RIGHT, y(value)]
      ];

      const drawLine = d3.line();

      parentNode
        .append("path")
        .attr("class", "value-line")
        .attr("d", drawLine(coords))
        .attr("stroke", AMOUNT.LINE.COLOR)
        .style(
          "stroke-dasharray",
          `${AMOUNT.LINE.DASH_WIDTH},${AMOUNT.LINE.DASH_GAP}`
        );

      // draw label
      const label = parentNode
        .append("g")
        .attr("class", "value-label")
        .attr("font-family", "sans-serif");

      const textProps = label
        .append("text")
        .text(formatAmount(value))
        .attr("font-size", AXIS.FONT_SIZE)
        .node()
        .getBBox();

      const labelWidth =
        textProps.width +
        AMOUNT.LABEL.PADDING.LEFT +
        AMOUNT.LABEL.PADDING.RIGHT;
      label.select("text").remove();

      label
        .append("rect")
        .attr("width", labelWidth)
        .attr("height", AMOUNT.LABEL.HEIGHT)
        .attr("fill", AMOUNT.LABEL.BACKGROUND_COLOR)
        .attr("rx", AMOUNT.LABEL.BORDER_RADIUS)
        .attr("ry", AMOUNT.LABEL.BORDER_RADIUS)
        .attr("x", width + CHART.MARGIN.RIGHT - labelWidth)
        .attr("y", y(value) - AMOUNT.LABEL.HEIGHT / 2);

      label
        .append("text")
        .text(formatAmount(value))
        .attr(
          "x",
          width +
            CHART.MARGIN.RIGHT -
            textProps.width -
            AMOUNT.LABEL.PADDING.RIGHT
        )
        .attr("y", y(value))
        .attr("font-size", AXIS.FONT_SIZE)
        .attr("fill", AMOUNT.LABEL.TEXT_COLOR)
        .attr("dy", "0.32em");
    },
    [formatAmount]
  );

  // goal amount value
  // goal amount line
  // goal age value
  // goal age line
  // goal label

  const drawGoals = useCallback((parentNode, data, x, y, width, height) => {
    const drawLine = d3.line();

    const goalsGroup = parentNode.append("g").attr("class", "goals-group");

    const goalsNodes = goalsGroup
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "goal");

    function drawAmountValues() {
      goalsNodes
        .append("rect")
        .attr("class", "amount-rect")
        .attr("width", (d) => {
          d.bbox.rectWidth =
            d.bbox.width +
            GOAL.AMOUNT.VALUE.PADDING.LEFT +
            GOAL.AMOUNT.VALUE.PADDING.RIGHT;
          return d.bbox.rectWidth;
        })
        .attr("height", GOAL.AMOUNT.VALUE.HEIGHT)
        .attr("fill", GOAL.AMOUNT.VALUE.BACKGROUND_COLOR)
        .attr("rx", GOAL.AMOUNT.VALUE.BORDER_RADIUS)
        .attr("ry", GOAL.AMOUNT.VALUE.BORDER_RADIUS)
        .attr("x", (d) => chart.width + CHART.MARGIN.RIGHT - d.bbox.rectWidth)
        .attr("y", (d) => y(d.amount.value) - GOAL.AMOUNT.VALUE.HEIGHT / 2);

      goalsNodes
        .append("text")
        .attr("class", "amount-text")
        .text((d) => formatAmount(d.amount.value))
        .attr("font-size", GOAL.AMOUNT.VALUE.FONT_SIZE)
        .attr("fill", GOAL.AMOUNT.VALUE.TEXT_COLOR)
        .attr("dy", "0.32em")
        .call(getBB)
        .attr(
          "x",
          (d) =>
            chart.width +
            CHART.MARGIN.RIGHT -
            d.bbox.width -
            GOAL.AMOUNT.VALUE.PADDING.RIGHT
        )
        .attr("y", (d) => y(d.amount.value));
    }
  }, []);

  const drawGoal = useCallback(
    (parentNode, x, y, width, height, goal) => {
      const drawLine = d3.line();

      const xCoord = x(goal.date);
      const yCoord = y(goal.amount.value);

      function getBB(selection) {
        console.log("selection", selection);

        selection.each(function (d) {
          console.log("d", d);

          // d.bbox = this.getBBox();
        });
      }

      // function drawAgeLine() {
      //   const coords = [
      //     [xCoord, height - GOAL.AGE.LINE.HEIGHT.TOP],
      //     [xCoord, height + GOAL.AGE.LINE.HEIGHT.BOTTOM]
      //   ];

      //   parentNode
      //     .append("path")
      //     .attr("class", "age-line")
      //     .attr("d", drawLine(coords))
      //     .attr("stroke", GOAL.AGE.LINE.COLOR);
      // }

      // function drawAgeValue() {
      //   parentNode
      //     .append("text")
      //     .attr("class", "age-value")
      //     .text(`${GOAL.AGE.VALUE.TEXT} ${goal.age}`)
      //     .attr("fill", GOAL.AGE.VALUE.COLOR)
      //     .attr("x", x(goal.date) - 50)
      //     .attr("y", height - 10)
      //     .attr("background", GOAL.AGE.VALUE.BACKGROUND_COLOR);
      // }

      // function drawAmountLine() {
      //   const coords = [
      //     [0, yCoord],
      //     [width + CHART.MARGIN.RIGHT, yCoord]
      //   ];

      //   parentNode
      //     .append("path")
      //     .attr("class", "amount-line")
      //     .attr("d", drawLine(coords))
      //     .attr("stroke", GOAL.AMOUNT.LINE.COLOR)
      //     .style(
      //       "stroke-dasharray",
      //       `${GOAL.AMOUNT.LINE.DASH_WIDTH}, ${GOAL.AMOUNT.LINE.DASH_GAP}`
      //     );
      // }

      function drawAmountValue() {
        const amountValue = parentNode
          .append("g")
          .attr("class", "amount-value")
          .attr("font-family", "sans-serif");

        amountValue
          .append("text")
          .text(() => formatAmount(goal.amount.value))
          .call(getBB);
        // .attr("font-size", AXIS.FONT_SIZE)
        // .attr("fill", AMOUNT.LABEL.TEXT_COLOR)
        // .attr("dy", "0.32em")
        // .attr(
        //   "x",
        //   (d) =>
        //     width + CHART.MARGIN.RIGHT - d.width - AMOUNT.LABEL.PADDING.RIGHT
        // )
        // .attr("y", yCoord);

        // const textProps = label
        //   .append("text")
        //   .text(formatAmount(goal.amount.value))
        //   .attr("font-size", AXIS.FONT_SIZE)
        //   .node()
        //   .getBBox();

        // const labelWidth =
        //   textProps.width +
        //   AMOUNT.LABEL.PADDING.LEFT +
        //   AMOUNT.LABEL.PADDING.RIGHT;
        // label.select("text").remove();

        // label
        //   .append("rect")
        //   .attr("width", labelWidth)
        //   .attr("height", AMOUNT.LABEL.HEIGHT)
        //   .attr("fill", AMOUNT.LABEL.BACKGROUND_COLOR)
        //   .attr("rx", AMOUNT.LABEL.BORDER_RADIUS)
        //   .attr("ry", AMOUNT.LABEL.BORDER_RADIUS)
        //   .attr("x", width + CHART.MARGIN.RIGHT - labelWidth)
        //   .attr("y", yCoord - AMOUNT.LABEL.HEIGHT / 2);
      }

      // function drawGoalLabel(goal) {
      //   const goalLabel = parentNode
      //     .append("circle")
      //     .attr("class", "goal-label");

      //   console.log(goal);

      //   goalLabel
      //     .attr("r", GOAL.LABEL.RADIUS)
      //     .attr("fill", GOAL.LABEL.BACKGROUND_COLOR.NOT_SUCCEED)
      //     .attr("cx", x(goal.date))
      //     .attr("cy", yCoord);
      // }

      // drawAgeLine();
      // drawAgeValue();
      // drawAmountLine();
      // drawAmountValue();
    },
    [formatAmount]
  );

  // initialize useEffect
  useEffect(() => {
    const svg = d3
      .select(chartArea.current)
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    const chartWidth = svgWidth - CHART.MARGIN.LEFT - CHART.MARGIN.RIGHT;
    const chartHeight = svgHeight - CHART.MARGIN.TOP - CHART.MARGIN.BOTTOM;

    const chartNode = svg
      .append("g")
      .attr("width", chartWidth)
      .attr("height", chartHeight)
      .attr("class", "chart")
      .attr(
        "transform",
        `translate(${CHART.MARGIN.LEFT}, ${CHART.MARGIN.TOP})`
      );

    drawChartBorders(svg, chartWidth, chartHeight);

    setChart({
      node: chartNode,
      width: chartWidth,
      height: chartHeight
    });
  }, [svgWidth, svgHeight, drawChartBorders]);

  useEffect(() => {
    if (!chart) return void 0;

    // redraw chart
    chart.node.selectAll("*").remove();

    // --------------- Chart scales ---------------
    // scale data by x
    const x = d3
      .scaleTime()
      .domain(d3.extent(chartData, (d) => d.date))
      .range([0, chart.width]);

    // scale data by y
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, (d) => d.value)])
      .range([chart.height, 0]);

    // ---------------- Chart line ----------------
    drawChartLine(chart.node, chartData, x, y);

    // ------------------- Axis -------------------
    drawRightAxis(chart.node, y, chart.width);
    drawBottomAxis(chart.node, x, chart.height);

    // ------------------- Value ------------------
    // drawAmount(chart.node, y, chart.width, amountValue);

    // --------------------- Goals -------------------
    // goals.forEach((goal) =>
    //   drawGoal(chart.node, x, y, chart.width, chart.height, goal)
    // );

    drawAmountValues(chart.node, goals);

    function drawAmountValues(parentNode, data) {
      const amountValuesGroup = parentNode
        .append("g")
        .attr("class", "amount-values-group");

      const amountValue = amountValuesGroup
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("font-family", "sans-serif")
        .attr("class", "amount-value");

      amountValue
        .append("rect")
        .attr("width", (d) => {
          d.bbox.rectWidth =
            d.bbox.width +
            GOAL.AMOUNT.VALUE.PADDING.LEFT +
            GOAL.AMOUNT.VALUE.PADDING.RIGHT;
          return d.bbox.rectWidth;
        })
        .attr("height", GOAL.AMOUNT.VALUE.HEIGHT)
        .attr("fill", GOAL.AMOUNT.VALUE.BACKGROUND_COLOR)
        .attr("rx", GOAL.AMOUNT.VALUE.BORDER_RADIUS)
        .attr("ry", GOAL.AMOUNT.VALUE.BORDER_RADIUS)
        .attr("x", (d) => chart.width + CHART.MARGIN.RIGHT - d.bbox.rectWidth)
        .attr("y", (d) => y(d.amount.value) - GOAL.AMOUNT.VALUE.HEIGHT / 2);

      amountValue
        .append("text")
        .text((d) => formatAmount(d.amount.value))
        .attr("font-size", GOAL.AMOUNT.VALUE.FONT_SIZE)
        .attr("fill", GOAL.AMOUNT.VALUE.TEXT_COLOR)
        .attr("dy", "0.32em")
        .call(getBB)
        .attr(
          "x",
          (d) =>
            chart.width +
            CHART.MARGIN.RIGHT -
            d.bbox.width -
            GOAL.AMOUNT.VALUE.PADDING.RIGHT
        )
        .attr("y", (d) => y(d.amount.value));
    }
  }, [
    chart,
    chartData,
    amountValue,
    goals,
    drawChartLine,
    drawRightAxis,
    drawBottomAxis,
    drawAmount,
    drawGoal
  ]);

  return <svg ref={chartArea} style={{ background: "lightyellow" }}></svg>;
};
