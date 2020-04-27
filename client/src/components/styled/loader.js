import styled, { keyframes, css } from "styled-components";

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
      props.mini
        ? "12px"
        : props.tiny
        ? "15px"
        : props.small
        ? "30px"
        : props.medium
        ? "90px"
        : "10em"};
    height: ${(props) =>
      props.mini
        ? "12px"
        : props.tiny
        ? "15px"
        : props.small
        ? "30px"
        : props.medium
        ? "90px"
        : "12em"};

    div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: ${(props) =>
        props.mini
          ? "9px"
          : props.tiny
          ? "12px"
          : props.small
          ? "24px"
          : props.medium
          ? "72px"
          : "10em"};
      height: ${(props) =>
        props.mini
          ? "9px"
          : props.tiny
          ? "12px"
          : props.small
          ? "24px"
          : props.medium
          ? "72px"
          : "10em"};
      margin: ${(props) =>
        props.mini
          ? "1px"
          : props.tiny
          ? "2px"
          : props.small
          ? "3px"
          : props.medium
          ? "6px"
          : "10px"};
      border: ${(props) =>
        props.mini
          ? "1px solid rgba(255,255,255,0.7)"
          : props.tiny
          ? "1px solid #fff"
          : props.small
          ? "2px solid #fff"
          : props.medium
          ? "3px solid #fff"
          : "4px  solid #fff"};

      border-radius: 50%;
      animation: ${keyring} 1.2s infinite linear; //cubic-bezier(0.5, 0, 0.5, 1) infinite
      border-color: ${(props) =>
        props.inverted
          ? "#fff rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.2)"
          : "#203A43 rgba(32, 58, 67, 0.2) rgba(32, 58, 67, 0.2) rgba(32, 58, 67, 0.2)"};
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
    text-align: center;
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
