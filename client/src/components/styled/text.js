import styled from "styled-components";

export const DFancyText = styled.h1`
  font-size: ${(props) => (props.size ? props.size : "22px")};
  letter-spacing: 2px;
  margin: 24px auto;
  text-align: center;
  font-family: "Playfair Display";
  font-weight: 500;
  text-transform: uppercase;
  display: table;
  white-space: nowrap;
  overflow: hidden;

  &:before,
  &:after {
    border-top-width: 2px;
    border-top-style: solid;
    border-top-color: ${(props) =>
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
    min-width: 30px;
  }
  &:before {
    right: 3%;
  }
  &:after {
    left: 3%;
  }
  @media (max-width: 768px) {
    margin: 24px auto;
    font-size: 16px;

    &:before,
    &:after {
      width: 50px;
    }
  }

  @media (max-width: 360px) {
    font-size: 14px;
    &:before,
    &:after {
      width: 40px;
    }
  }
`;
