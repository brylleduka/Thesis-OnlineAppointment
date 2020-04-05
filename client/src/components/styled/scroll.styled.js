import styled, { keyframes } from "styled-components";

const scroll = keyframes`

    0% {
        opacity: 0;
    }
    10% {
        transform: translateY(0);
        opacity: 1;
    }
    100% {
        transform: translateY(5px);
        opacity: 0;
    }

`;

export const DMouseScroll = styled.div`
  position: absolute;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 60px;
  height: 60px;
  cursor: pointer;
  z-index: 5;

  &:hover {
    .mousey {
      opacity: 1;
      left: 50%;
    }
    .scroll-downs {
      &::before,
      &::after {
        top: 50%;
        left: 50%;
        border: 1px solid rgba(0, 0, 0, 0.5);
      }
    }
  }

  .scroll-downs {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 100%;

    &::before,
    &::after {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      border: 1px solid rgba(0, 0, 0, 0.25);
      transform: translate(-50%, -50%);
      border-radius: 100%;
      transition: all 0.3s ease-in-out;
    }
    &::before {
      top: 48%;
      left: 60%;
    }

    &::after {
      top: 52%;
      left: 52%;
    }
  }

  .mousey {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 2px;
    padding: 3px 5px;
    height: 15px;
    border: 2px solid #232323;
    border-radius: 25px;
    opacity: 0.75;
    box-sizing: content-box;
    background: #232323;
  }

  .scroller {
    width: 2px;
    height: 5px;
    border-radius: 25%;
    background-color: #fff;
    animation-name: ${scroll};
    animation-duration: 2.2s;
    animation-timing-function: cubic-bezier(0.15, 0.41, 0.69, 0.94);
    animation-iteration-count: infinite;
  }

  ${(props) =>
    props.inverted &&
    ".mousey{background: #ffffff; border-color: #ffffff;} .scroller{background-color: #232323;} .scroll-downs{&::before,&::after{border-color: rgba(255,255,255,0.25)}} &:hover{.scroll-downs{&::before,&::after{border-color: rgba(255,255,255,0.5)}}}"}

  ${(props) =>
    props.basic &&
    ".mousey{background: transparent; border-width: 1px;} .scroller{background-color: #fff;} "}
`;
