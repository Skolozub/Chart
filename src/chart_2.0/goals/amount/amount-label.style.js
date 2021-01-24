import styled from "@emotion/styled";

export const Container = styled.div`
  position: absolute;
  top: ${(props) => `${props.top}px`};
  left: ${(props) => `${props.left}px`};
  align-items: center;
  padding: 2px 8px;
  background: #08a652;
  border-radius: 16px;
`;

export const Text = styled.div`
  font-family: SB Sans Text;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.3px;
  color: #ffffff;
`;
