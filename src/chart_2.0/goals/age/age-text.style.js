import styled from "@emotion/styled";

export const Container = styled.div`
  position: absolute;
  top: ${(props) => `${props.top}px`};
  left: ${(props) => `${props.left}px`};
  opacity: ${(props) => (!props.top || !props.left ? 0 : 1)};
  background: #fff;
  padding: 0 5px;
`;

export const Text = styled.div`
  font-family: SB Sans Text;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: -0.02em;
  color: #068441;
`;
