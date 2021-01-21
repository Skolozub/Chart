import React from "react";
import "./style.css";

export const Tooltip = ({ setIsShow }) => {
  return (
    <div className="tooltip" onClick={() => setIsShow(false)}>
      <div className="title">Вы не достигаете цель в срок</div>
      <div className="text">Попробуйте применить советы ниже</div>
    </div>
  );
};
