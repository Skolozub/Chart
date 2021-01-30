import styled from "@emotion/styled";
import { COMMON } from "../../constants";

export const Container = styled.g`
  opacity: ${(props) => props.transparent};
  transition: opacity ${COMMON.TRANSITION_DURATION}ms;
`;
