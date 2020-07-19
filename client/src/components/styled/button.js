import styled from "styled-components";

export const JButton = styled.button`
  position: relative;
  padding: 0.8em 1.2em;
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  font-size: 18px;
  margin: 0.3rem 0.2rem;
  color: ${(props) =>
    props.dark ? ({ theme }) => theme.light : ({ theme }) => theme.blue};
  font-weight: 700;
  letter-spacing: 2px;
  z-index: 1;

  &:hover {
    color: ${({ theme }) => theme.light};
  }

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

    color: #fff;
  }

  &::after {
    z-index: -1;
    bottom: -2px;
    right: -2px;
    border-top-color: transparent;
    border-left-color: transparent;
    border-bottom-color: ${(props) =>
      props.dark ? ({ theme }) => theme.primary : ({ theme }) => theme.blue};
    border-right-color: ${(props) =>
      props.dark ? ({ theme }) => theme.primary : ({ theme }) => theme.blue};
  }

  &::before {
    z-index: -1;
    top: -2px;
    left: -2px;
    border-bottom-color: transparent;
    border-right-color: transparent;
    border-top-color: ${(props) =>
      props.dark ? ({ theme }) => theme.primary : ({ theme }) => theme.blue};
    border-left-color: ${(props) =>
      props.dark ? ({ theme }) => theme.primary : ({ theme }) => theme.blue};
  }

  &:hover:after,
  &:hover:before {
    border-bottom-color: ${(props) =>
      props.dark ? ({ theme }) => theme.primary : ({ theme }) => theme.blue};
    border-right-color: ${(props) =>
      props.dark ? ({ theme }) => theme.primary : ({ theme }) => theme.blue};
    border-top-color: ${(props) =>
      props.dark ? ({ theme }) => theme.primary : ({ theme }) => theme.blue};
    border-left-color: ${(props) =>
      props.dark ? ({ theme }) => theme.primary : ({ theme }) => theme.blue};
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.blue};
  }

  a {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
    font-size: 16px;
    margin: 0.3rem 0.2rem;
    letter-spacing: 1px;
  }
`;
