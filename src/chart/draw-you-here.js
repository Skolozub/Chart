import React from "react";
import { CHART } from "../constants";

import avatar from "../assets/ava.png";
import { FilterShadow } from "./shadow";

export const DrawYouHere = ({
  data,
  chartWidth,
  chartHeight,
  xScale,
  yScale
}) => {
  return (
    <g
      className="you-here-group"
      width={chartWidth}
      height={chartHeight}
      transform={`translate(${CHART.MARGIN.LEFT}, ${CHART.MARGIN.TOP})`}
    >
      <circle
        fill={"#068441"}
        r={3}
        cx={xScale(Date.now())}
        cy={yScale(200000)}
      />
      <circle fill={"#fff"} r={1} cx={xScale(Date.now())} cy={yScale(200000)} />
      <g
        filter="url(#shadows)"
        width="25"
        height="27"
        transform={`translate(${xScale(Date.now()) - 25 / 2}, ${
          yScale(200000) - 32
        })`}
      >
        {/* path: 25 x 28  */}
        {/* circle in path: 25 x 25 */}
        <path
          d="M12.515322017097475,0.32624101638793945 C5.642522017097473,0.32624101638793945 0.07092201709747292,5.8978410163879404 0.07092201709747292,12.770641016387941 C0.07092201709747292,18.50784101638794 3.953222017097474,23.33814101638794 9.233922017097473,24.777941016387942 L12.515322017097475,28.05934101638794 L15.796722017097473,24.777941016387942 C21.077522017097472,23.33814101638794 24.959822017097473,18.50784101638794 24.959822017097473,12.770641016387941 C24.959822017097473,5.8978410163879404 19.388222017097473,0.32624101638793945 12.515322017097475,0.32624101638793945 z"
          fill="#fff"
        />
        {/* <circle fill={"#068441"} r={10.5} cx={12.5} cy={12.5} /> */}
        <image
          className="avatar"
          xlinkHref={avatar}
          width={21}
          height={21}
          x={1.5}
          y={1.5}
        />
      </g>
      <FilterShadow />
    </g>
  );
};
