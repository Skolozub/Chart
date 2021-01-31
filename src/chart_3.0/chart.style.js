import styled from "@emotion/styled";

export const Container = styled.svg`
  width: ${(props) => `${props.svgWidth}px`};
  height: ${(props) => `${props.svgHeight}px`};
  background: ${(props) => props.background};
  overflow: hidden;
`;

export const ChartGroup = styled.g`
  width: ${(props) => `${props.chartWidth}px`};
  height: ${(props) => `${props.chartHeight}px`};
  transform: ${(props) =>
    `translate(${props.marginLeft}px, ${props.marginTop}px)`};
`;
