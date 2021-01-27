import { select } from "d3";
import React, { useEffect, useRef } from "react";

// TODO: rename, add constants, change path
export const DrawTooltip = ({ x, y, isActive }) => {
  const groupRef = useRef(null);
  const selections = useRef(null);

  useEffect(() => {
    if (!selections.current) {
      const group = select(groupRef.current);

      // --------------- wrapper ---------------
      group.attr("class", "tooltip").attr("filter", "url(#tooltip_shadow)");

      const wrapper = group
        .patternify({
          tag: "rect",
          selector: "wrapper"
        })
        .attr("width", 266)
        .attr("height", 76)
        .attr("fill", "#FFF")
        .attr("stroke-width", 1)
        .attr("stroke", "rgba(38, 38, 38, 0.08)")
        .attr("rx", 20)
        .attr("ry", 20)
        .attr("y", -999);

      // --------------- title ---------------
      const title = group
        .patternify({
          tag: "text",
          selector: "title"
        })
        .attr("dy", "0.35em")
        .attr("font-size", 15)
        .attr("letter-spacing", "-0.02em")
        .attr("fill", "#262626")
        .text("Вы не достигаете цель в срок");

      // --------------- description ---------------
      const description = group
        .patternify({
          tag: "text",
          selector: "description"
        })
        .attr("dy", "0.35em")
        .attr("font-size", 13)
        .attr("letter-spacing", "-0.02em")
        .attr("fill", "rgba(38, 38, 38, 0.7)")
        .text("Попробуйте применить советы ниже");

      selections.current = { wrapper, title, description };
    }
  }, []);

  useEffect(() => {
    if (selections.current) {
      const { wrapper, title, description } = selections.current;

      // --------------- wrapper ---------------
      const transitionedWrapper = wrapper
        .attr("x", x)
        .transition()
        .duration(300);

      if (isActive) {
        // show wrapper
        transitionedWrapper.attr("y", y);
      } else {
        // hide wrapper
        transitionedWrapper.attr("y", -999);
      }

      // --------------- title ---------------
      const transitionedTitle = title
        .attr("x", x + 16)
        .attr("y", y + 25)
        .transition()
        .duration(300);

      if (isActive) {
        // show title
        transitionedTitle.style("opacity", 0).delay(300).style("opacity", 1);
      } else {
        // hide title
        transitionedTitle
          .attr("y", -999)
          .style("opacity", 1)
          .style("opacity", 0);
      }

      // --------------- description ---------------
      const transitionedDescription = description
        .attr("x", x + 16)
        .attr("y", y + 20 + 30)
        .transition()
        .duration(300);

      if (isActive) {
        // show description
        transitionedDescription
          .style("opacity", 0)
          .delay(300)
          .style("opacity", 1);
      } else {
        // hide description
        transitionedDescription
          .attr("y", -999)
          .style("opacity", 1)
          .style("opacity", 0);
      }
    }
  }, [x, y, isActive]);

  return <g ref={groupRef}></g>;
};
