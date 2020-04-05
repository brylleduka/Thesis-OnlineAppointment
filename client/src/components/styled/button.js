import styled from "styled-components";

export const JButton = styled.button`
  position: relative;
  padding: 1em 1.5em;
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  font-size: 18px;
  margin: 1em 0.8em;
  color: ${({ theme }) => theme.secondary};
  font-weight: 700;
  letter-spacing: 2px;

  &::after,
  &::before {
    content: "";
    display: block;
    position: absolute;
    width: 20%;
    height: 20%;
    border: 2px solid;
    transition: all 0.6s ease;
    border-radius: 2px;
  }

  &::after {
    bottom: -2px;
    right: -2px;
    border-top-color: transparent;
    border-left-color: transparent;
    border-bottom-color: ${(props) =>
      props.dark
        ? ({ theme }) => theme.primary
        : ({ theme }) => theme.secondary};
    border-right-color: ${(props) =>
      props.dark
        ? ({ theme }) => theme.primary
        : ({ theme }) => theme.secondary};
  }

  &::before {
    top: -2px;
    left: -2px;
    border-bottom-color: transparent;
    border-right-color: transparent;
    border-top-color: ${(props) =>
      props.dark
        ? ({ theme }) => theme.primary
        : ({ theme }) => theme.secondary};
    border-left-color: ${(props) =>
      props.dark
        ? ({ theme }) => theme.primary
        : ({ theme }) => theme.secondary};
  }

  &:hover:after,
  &:hover:before {
    border-bottom-color: ${(props) =>
      props.dark
        ? ({ theme }) => theme.primary
        : ({ theme }) => theme.secondary};
    border-right-color: ${(props) =>
      props.dark
        ? ({ theme }) => theme.primary
        : ({ theme }) => theme.secondary};
    border-top-color: ${(props) =>
      props.dark
        ? ({ theme }) => theme.primary
        : ({ theme }) => theme.secondary};
    border-left-color: ${(props) =>
      props.dark
        ? ({ theme }) => theme.primary
        : ({ theme }) => theme.secondary};
    width: 100%;
    height: 100%;
  }

  a {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
  }
`;
