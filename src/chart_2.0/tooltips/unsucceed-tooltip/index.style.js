import styled from "@emotion/styled";

export const Container = styled.div`
  position: absolute;
  min-width: 266px;
  min-height: 76px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  opacity: ${(props) => (!props.top || !props.left ? 0 : 1)};
  padding: 16px;
  transition: 0.3s;
  background: #ffffff;
  border: 1px solid rgba(38, 38, 38, 0.08);
  box-shadow: 0px 1px 2px rgba(38, 38, 38, 0.04),
    0px 12px 24px rgba(38, 38, 38, 0.16);
  border-radius: 12px;
  transition: opacity 0.3s;
`;

export const Title = styled.div`
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.02em;
  color: #262626;
`;

export const Description = styled.div`
  letter-spacing: -0.02em;
  color: rgba(38, 38, 38, 0.7);
`;
