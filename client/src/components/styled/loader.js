import styled, { keyframes } from "styled-components";

const keyring = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// SPINNER

export const SpinnerRing = styled.div`
  display: inline-block;
  position: relative;
  width: ${props => (props.small ? "30px" : props.medium ? "60px" : "80px")};
  height: ${props => (props.small ? "30px" : props.medium ? "60px" : "80px")};

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${props => (props.small ? "24px" : props.medium ? "48px" : "64px")};
    height: ${props => (props.small ? "24px" : props.medium ? "48px" : "64px")};
    margin: ${props => (props.small ? "3px" : props.medium ? "6px" : "8px")};
    border: ${props =>
      props.small
        ? "3px solid #fff"
        : props.medium
        ? "6px solid #fff"
        : "8px  solid #fff"};

    border-radius: 50%;
    animation: ${keyring} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${props =>
      props.inverted
        ? "#fff transparent transparent transparent"
        : " #000 transparent transparent transparent"};
  }
  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;
