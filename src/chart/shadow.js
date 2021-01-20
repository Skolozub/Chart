import React from "react";

export const FilterShadow = () => (
  <defs>
    <filter
      id="shadows"
      filterUnits="userSpaceOnUse"
      colorInterpolationFilters="sRGB"
    >
      <feFlood floodOpacity="0" result="BackgroundImageFix" />
      <feColorMatrix
        in="SourceAlpha"
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
      />
      <feOffset dy="4" />
      <feGaussianBlur stdDeviation="5" />
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 0.233852 0 0 0 0 0.233852 0 0 0 0 0.262257 0 0 0 0.164363 0"
      />
      <feBlend
        mode="normal"
        in2="BackgroundImageFix"
        result="effect1_dropShadow"
      />
      <feBlend
        mode="normal"
        in="SourceGraphic"
        in2="effect1_dropShadow"
        result="shape"
      />
    </filter>
  </defs>
);
