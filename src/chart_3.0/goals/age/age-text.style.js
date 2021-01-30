import styled from "@emotion/styled";
import { COMMON } from "../../constants";

export const Container = styled.div`
  position: absolute;
  top: ${(props) => `${props.top}px`};
  left: ${(props) => `${props.left}px`};
  opacity: ${(props) => props.transparent};
  background: #fff;
  padding: 0 5px;
  transition: left ${COMMON.TRANSITION_DURATION}ms,
    opacity ${COMMON.TRANSITION_DURATION}ms;
`;

export const Text = styled.div`
  font-family: SB Sans Text;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: -0.02em;
  color: #068441;
`;
