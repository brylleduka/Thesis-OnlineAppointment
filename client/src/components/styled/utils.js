import styled, { keyframes } from "styled-components";
import { Icon } from "semantic-ui-react";

const ripple = keyframes`

  0% {
    transform: scale(0);
  }
  20% {
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
`;

// BUTTONS
export const DButton = styled.button`
  font-size: ${props => (props.fSize ? props.fSize : "16px")};
  height: ${props => (props.size ? props.size : "36px")};
  width: ${props =>
    props.fluid ? "100%" : props.width ? props.width : "auto"};
  display: inline-block;
  padding: ${props => (props.pad ? props.pad : "6px 16px")};
  line-height: 1.42857143;
  margin: 1.5%;
  text-align: center;
  text-transform: ${props => props.text || "capitalize"};
  letter-spacing: 1.5px;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-radius: ${props =>
    props.radius ? props.radius : props.circle ? "50%" : "5px"};
  border-width: ${props => (props.basic ? "1px" : "0")};
  border-style: ${props => props.basic && "solid"};
  border-color: ${props =>
    props.alert
      ? ({ theme }) => theme.red
      : props.warning
      ? ({ theme }) => theme.yellow
      : props.confirm
      ? ({ theme }) => theme.green
      : props.primary
      ? ({ theme }) => theme.primary
      : props.default
      ? ({ theme }) => theme.bluer
      : ({ theme }) => theme.blue};
      
  color: ${props => (props.color ? props.color : ({ theme }) => theme.light)};

  background: ${props =>
    props.basic
      ? "transparent"
      : props.alert
      ? ({ theme }) => theme.red
      : props.warning
      ? ({ theme }) => theme.yellow
      : props.confirm
      ? ({ theme }) => theme.green
      : props.primary
      ? ({ theme }) => theme.primary
      : props.default
      ? ({ theme }) => theme.bluer
      : ({ theme }) => theme.blue};

  ${props =>
    props.disabled &&
    "background: #E9E4F0; color: #D3CCE3; &:hover:{opacity: 1}"}

  font-weight: 700;
  outline: 0;

  &:hover {
   opacity: 0.8;
   background: ${props =>
     props.alert
       ? ({ theme }) => theme.red
       : props.warning
       ? ({ theme }) => theme.yellow
       : props.confirm
       ? ({ theme }) => theme.green
       : props.primary
       ? ({ theme }) => theme.primary
       : props.default
       ? ({ theme }) => theme.bluer
       : ({ theme }) => theme.blue};
  }

  &:focus {
    background: darken(${({ theme }) => theme.dark}, 12%);
    outline: 0;
  }

  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);

  &:active {
    box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
      0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.4);
  }
  overflow: hidden;
  position: relative;

  &:after {
    content: "";
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 200px;
    height: 200px;
    margin-left: -100px;
    margin-top: -100px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 100%;
    transform: scale(0);
  }

  &:not(:active):after {
    animation: ${ripple} 0.6s ease-out;
  }

  &:after {
    visibility: hidden;
  }

  &:focus:after {
    visibility: visible;
  }

  a{
    color: #fff;
    &:hover: #fff
  }
`;

export const DButtonFree = styled(DButton)`
  position: absolute;
  top: ${props => props.top && props.top};
  left: ${props => props.left && props.left};
  bottom: ${props => props.bottom && props.bottom};
  right: ${props => props.right && props.right};
`;

// LABELS
export const DLabel = styled.label`
  font-size: ${props => (props.size ? props.size : "12px")};
  color: ${props => (props.color ? props.color : "#000")};
  letter-spacing: ${props => (props.ls ? props.ls : "1px")};
  font-weight: ${props => props.weight && props.weight};
  padding: ${props => (props.pad ? props.pad : "5px 10px")};
  margin: ${props => (props.m ? props.m : "1%")};
  background: ${props => props.bgcolor && props.bgcolor};
  border-radius: ${props => props.rounded && "10px"};
  text-transform: ${props => props.tt && props.tt};
  width: ${props => (props.w ? props.w : "auto")};
  display: ${props => props.flex && "flex"};
  justify-content: ${props =>
    props.justifyCenter
      ? "center"
      : props.justifyAround
      ? "space-around"
      : props.justifyBetween
      ? "space-between"
      : props.jusitfyFend
      ? "flex-end"
      : "flex-start"};

  align-items: ${props =>
    props.alignCenter
      ? "center"
      : props.alignAround
      ? "space-around"
      : props.alignBetween
      ? "space-between"
      : props.alignFend
      ? "flex-end"
      : "flex-start"};
  flex-direction: ${props => props.fcol && "column"};

  &:hover {
    opacity: ${props => props.hover && "0.8"};
    cursor: ${props => props.hover && "pointer"};
  }
`;

// ACCORDION

export const NavItem = styled.div`
  width: 90%;
  a {
    height: 100%;
    width: 100%;
    font-size: 16px;
    padding-left: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #fff;

    &:hover {
      color: white;
      background: ${({ theme }) => theme.blue};
      opacity: 0.9;
    }

    &.active {
      background: ${({ theme }) => theme.bluer};
    }
  }
  span {
    font-weight: 500;
    margin-left: 10px;
  }
`;

export const DAccordion = styled.section`
  display: flex;
  flex-direction: column;
  width: 90%;

  .accordion-title {
    background: ${props => (props.bg ? props.bg : ({ theme }) => theme.dark)};
    color: ${props => (props.color ? props.color : "#fff")};
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: none;
    outline: none;
    border-radius: ${props =>
      props.oblong ? "25px" : props.rounded ? "15px" : "0"};
    transition: background-color 0.6s ease;

    &:hover,
    &.active {
      background: ${props =>
        props.activeBg ? props.activeBg : ({ theme }) => theme.blue};
      color: ${props =>
        props.hoverColorText ? props.hoverColorText : "#232323"};
    }

    .accordion-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.6s ease;
    }

    p {
      font-size: ${props => (props.fs ? props.fs : "12px")};
      font-weight: 500;
      padding: ${props => (props.pad ? props.pad : "10px 20px")};
      text-transform: ${props =>
        props.uc ? "uppercase" : props.lc ? "lowercase" : "capitalize"};
      margin: 0;
      width: 95%;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      letter-spacing: 1.5px;

      .acc-icon {
        margin-right: 10px;
      }
    }

    .rotate {
      transform: rotate(90deg);
    }
  }
  .accordion-content {
    display: flex;
    flex-direction: column;
    background-color: white;
    overflow: hidden;
    transition: max-height 0.4s ease-in-out;

    span {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      margin-left: 5px;
      transition: margin-left 0.2s linear;
      &:hover {
        margin-left: 10px;
      }
    }

    a {
      width: 100%;
      height: 100%;
      font-size: 16px;
      padding-left: 20px;

      &:hover {
        color: white;
        background: ${({ theme }) => theme.blue};
        opacity: 0.9;
      }

      &.active {
        color: white;
        background: ${({ theme }) => theme.bluer};
      }
    }
  }
`;

export const Toasted = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: ${props =>
    props.status === "error"
      ? "rgba(229, 80, 57,0.9)"
      : props.status === "success"
      ? "rgba(46, 213, 115,0.9)"
      : props.status === "warning"
      ? "rgba(254, 211, 48,0.9)"
      : "rgba(69, 170, 242,1.0)"};
  height: 50px;
  border-radius: 10px;
  padding: 2%;
  position: relative;

  .description {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    width: 100%;
    height: 100%;
    text-align: center;
    font-weight: 700;
    font-size: 16px;
  }

  .close {
    height: 100%;
    padding: 1%;
    border-left: 1px solid rgba(245, 246, 250, 0.4);
    color: #fff;
    position: absolute;
    right: 1%;
    top: 0;
    font-size: 18px;
    cursor: pointer;
  }
`;

export const ReadMore = styled.p`
  text-align: right;
  cursor: pointer !important;

  span {
    color: ${({ theme }) => theme.secondary};
    display: inline-block;
    position: relative;
    font-weight: 700;
    &:after {
      content: "\f061";
      font-family: FontAwesome;
      ${props =>
        props.hover === 0
          ? "margin-left: 5px;opacity: 1;"
          : "margin-left: -10px; opacity: 0;"};
      vertical-align: middle;
      transition: margin 0.3s, opacity 0.3s;
    }
    a {
      color: ${({ theme }) => theme.secondary};
    }
    &:hover {
      &:after {
        margin-left: 5px;
        opacity: 1;
      }
    }
  }
`;

export const ScrollUp = styled(Icon)`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 50%;
  transform: translate(-50%, -50%);
  display: block;
`;
