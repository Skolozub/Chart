import React, { useRef } from "react";
import { useBoundingClientRect } from "./useBoundingClientRect";

export const FullWidthWrapper = ({ children }) => {
  const winRef = useRef(null);
  const rect = useBoundingClientRect(winRef, 300);

  return (
    <div
      ref={winRef}
      style={{ width: "100%", height: "auto", overflow: "hidden" }}
    >
      {rect ? children(rect) : null}
    </div>
  );
};
