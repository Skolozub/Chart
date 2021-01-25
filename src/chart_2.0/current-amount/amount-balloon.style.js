import styled from "@emotion/styled";

export const Container = styled.div`
  position: absolute;
  top: ${(props) => `${props.top - 2}px`};
  left: ${(props) => `${props.left}px`};
  display: flex;

  &::before {
    content: "";
    top: 100%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -10%);
    border-style: solid;
    border-width: 3px 3px 0 3px;
    border-color: #fff transparent transparent transparent;
  }
`;

export const Avatar = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 16px;
  border: 2px solid #fff;
  box-shadow: 0px 4px 10px rgba(60, 60, 67, 0.164363);
`;
