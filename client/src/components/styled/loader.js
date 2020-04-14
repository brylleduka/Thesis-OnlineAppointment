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
  display: flex;
  justify-column: center;
  align-items: center;
  flex-direction: ${(props) => (props.row ? "row" : "column")};

  .ring {
    display: inline-block;
    position: relative;
    width: ${(props) =>
      props.tiny
        ? "15px"
        : props.small
        ? "30px"
        : props.medium
        ? "60px"
        : "100px"};
    height: ${(props) =>
      props.tiny
        ? "15px"
        : props.small
        ? "30px"
        : props.medium
        ? "60px"
        : "100px"};

    div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: ${(props) =>
        props.tiny
          ? "12px"
          : props.small
          ? "24px"
          : props.medium
          ? "48px"
          : "72px"};
      height: ${(props) =>
        props.tiny
          ? "12px"
          : props.small
          ? "24px"
          : props.medium
          ? "48px"
          : "72px"};
      margin: ${(props) =>
        props.tiny
          ? "2px"
          : props.small
          ? "3px"
          : props.medium
          ? "6px"
          : "10px"};
      border: ${(props) =>
        props.tiny
          ? "1px solid #fff"
          : props.small
          ? "2px solid #fff"
          : props.medium
          ? "3px solid #fff"
          : "5px  solid #fff"};

      border-radius: 50%;
      animation: ${keyring} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: ${(props) =>
        props.inverted
          ? "#fff transparent transparent transparent"
          : "#203A43 transparent transparent transparent"};
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
  }

  .content-text {
    margin: 0 2px;
    letter-spacing: 2px;
    font-weight: 700;
    font-size: ${(props) =>
      props.tiny
        ? "12px"
        : props.small
        ? "13px"
        : props.medium
        ? "14px"
        : "16px"};
  }
`;
