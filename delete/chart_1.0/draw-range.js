import React from "react";

export const Range = ({ start, end, width }) => {
  const minYear = new Date(start).getFullYear();
  const maxYear = new Date(end).getFullYear();

  return <div width={width}></div>;
};
