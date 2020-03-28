import styled from "styled-components";

export const DFancyText = styled.h1`
  font-size: ${props => (props.size ? props.size : "22px")};
  letter-spacing: 2px;
  margin: 30px auto;
  text-align: center;
  text-transform: uppercase;
  display: table;
  white-space: nowrap;

  &:before,
  &:after {
    border-top-width: 2px;
    border-top-style: solid;
    border-top-color: ${props =>
      props.color
        ? props.color
        : props.alt
        ? ({ theme }) => theme.light
        : ({ theme }) => theme.dark};
    content: "";
    display: table-cell;
    position: relative;
    top: 0.5em;
    width: 100px;
    min-width: 50px;
  }
  &:before {
    right: 3%;
  }
  &:after {
    left: 3%;
  }
`;
