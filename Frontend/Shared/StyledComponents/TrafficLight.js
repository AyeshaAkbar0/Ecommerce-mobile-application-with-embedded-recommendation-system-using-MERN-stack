import styled, { css } from "styled-components";

const TrafficLight = styled.View`
  border-radius: 50px;
  width: 10px;
  height: 10px;
  padding: 8px;
 
  ${(props) =>
    props.available &&
    css`
      background: #afec1a;
    `}
  ${(props) =>
    props.limited &&
    css`
      background: #ffe033;
    `}
    ${(props) =>
    props.unavailable &&
    css`
      background: #ec241a;
    `}
`;

export default TrafficLight;