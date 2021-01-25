import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { PropsContext } from "../index";
import avatar from "../../assets/person.jpg";
import * as S from "./amount-balloon.style";

// TODO: delete on prod
import { logger } from "../../utils/logger";

export const AmountBalloon = ({ top, left }) => {
  const { portalRef, CONSTANTS } = useContext(PropsContext);
  const { CURRENT_AMOUNT, HALF } = CONSTANTS;

  logger.render("AmountBalloon");

  return ReactDOM.createPortal(
    <S.Container
      className="amount-balloon"
      left={left - CURRENT_AMOUNT.IMAGE.WIDTH / HALF}
      top={top - CURRENT_AMOUNT.IMAGE.HEIGHT}
    >
      <S.Avatar
        src={avatar}
        width={CURRENT_AMOUNT.IMAGE.WIDTH}
        height={CURRENT_AMOUNT.IMAGE.HEIGHT}
      />
    </S.Container>,
    portalRef
  );
};
