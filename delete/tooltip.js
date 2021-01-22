import React from "react";
import ReactDOM from "react-dom";
import * as S from "./tooltip.style";

export const Tooltip = ({ className, left, top }) => {
  return ReactDOM.createPortal(
    <S.Container className={className} left={left} top={top}>
      <S.Title>Вы не достигаете цель в срок</S.Title>
      <S.Description>Попробуйте применить советы ниже</S.Description>
    </S.Container>,
    document.querySelector("body")
  );
};
