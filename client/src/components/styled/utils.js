import styled, { keyframes, css } from "styled-components";
import { Icon } from "semantic-ui-react";
import { DotsVerticalRounded } from "@styled-icons/boxicons-regular/DotsVerticalRounded";
import { StyledIconBase } from "@styled-icons/styled-icon";
import { Link } from "react-router-dom";

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
  font-size: ${(props) => (props.fSize ? props.fSize : "16px")};
  height: ${(props) => (props.size ? props.size : "36px")};
  width: ${(props) =>
    props.fluid ? "100%" : props.width ? props.width : "auto"};
  display: inline-block;
  padding: ${(props) => (props.pad ? props.pad : "4px 10px")};
  line-height: 1.42857143;
  margin: ${(props) => (props.center ? "1.5% auto" : "1.5%")};
  text-align: center;
  text-transform: ${(props) => props.text || "capitalize"};
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



  border-radius: ${(props) =>
    props.radius ? props.radius : props.circle ? "50%" : "5px"};
  border-width: ${(props) => (props.basic ? "1px" : "0")};
  border-style: ${(props) => props.basic && "solid"};
  border-color: ${(props) =>
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
      
  color: ${(props) =>
    props.red
      ? ({ theme }) => theme.red
      : props.yellow
      ? ({ theme }) => theme.yellow
      : props.green
      ? ({ theme }) => theme.green
      : props.primary
      ? ({ theme }) => theme.primary
      : props.bluer
      ? ({ theme }) => theme.bluer
      : ({ theme }) => theme.light};

  background: ${(props) =>
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

  ${(props) =>
    props.disabled &&
    css`
      background: #e9e4f0;
      color: #d3cce3;
    `};



  font-weight: 700;
  outline: 0;

  &:hover {
   opacity: 0.8;
   color: #fff;
   background: ${(props) =>
     props.disabled
       ? "#e9e4f0"
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

  ${(props) =>
    props.flex &&
    css`
      display: flex;
      justify-content: space-around;
      align-items: center;
    `};
`;

export const DButtonFree = styled(DButton)`
  position: absolute;
  top: ${(props) => props.top && props.top};
  left: ${(props) => props.left && props.left};
  bottom: ${(props) => props.bottom && props.bottom};
  right: ${(props) => props.right && props.right};
`;

// LABELS
export const DLabel = styled.label`
  position: relative;
  font-size: ${(props) => (props.size ? props.size : "12px")};
  color: ${(props) => (props.txtColor ? props.txtColor : "#232323")};
  letter-spacing: ${(props) => (props.ls ? props.ls : "1px")};
  font-weight: ${(props) => (props.weight ? props.weight : 500)};
  padding: ${(props) => (props.pad ? props.pad : "5px 10px")};
  margin: ${(props) => (props.m ? props.m : "2%")};
  background: ${(props) => (props.bgcolor ? props.bgcolor : "transparent")};
  border-radius: ${(props) => props.rounded && "5px"};
  text-transform: ${(props) => props.tt && props.tt};
  width: ${(props) => (props.w ? props.w : "auto")};
  display: ${(props) => (props.flex ? "flex" : "inline-block")};
  justify-content: ${(props) =>
    props.justifyCenter
      ? "center"
      : props.justifyAround
      ? "space-around"
      : props.justifyBetween
      ? "space-between"
      : props.jusitfyFend
      ? "flex-end"
      : "flex-start"};

  align-items: ${(props) =>
    props.alignCenter
      ? "center"
      : props.alignAround
      ? "space-around"
      : props.alignBetween
      ? "space-between"
      : props.alignFend
      ? "flex-end"
      : "flex-start"};
  flex-direction: ${(props) => props.fcol && "column"};

  &:hover {
  }

  ${(props) =>
    props.color &&
    css`
      color: ${({ theme }) => theme.light};
      font-weight: 700;
      background-color: ${props.color === "primary"
        ? ({ theme }) => theme.primary
        : props.color === "secondary"
        ? ({ theme }) => theme.secondary
        : props.color === "green"
        ? ({ theme }) => theme.green
        : props.color === "red"
        ? ({ theme }) => theme.red
        : props.color === "blue"
        ? ({ theme }) => theme.blue
        : props.color === "bluer"
        ? ({ theme }) => theme.bluer
        : props.color === "yellow"
        ? ({ theme }) => theme.yellow
        : props.color === "dark"
        ? ({ theme }) => theme.dark
        : ({ theme }) => theme.grey};
    `};

  ${(props) =>
    props.hover &&
    css`
      opacity: 0.8;
      cursor: pointer;
    `};

  ${(props) =>
    props.breakWord &&
    css`
      overflow-wrap: break-word;
      word-break: break-word;
      hyphens: auto;
    `};

  ${(props) =>
    props.primary &&
    css`
      background: ${({ theme }) => theme.primary};
      color: #ffffff;
    `};
  ${(props) =>
    props.secondary &&
    css`
      background: ${({ theme }) => theme.secondary};
      color: #ffffff;
    `};
  ${(props) =>
    props.bluer &&
    css`
      background: ${({ theme }) => theme.bluer};
      color: #ffffff;
    `};

  ${(props) =>
    props.blue &&
    css`
      background: ${({ theme }) => theme.blue};
      color: #ffffff;
    `};
  ${(props) =>
    props.green &&
    css`
      background: ${({ theme }) => theme.green};
      color: #ffffff;
    `};
  ${(props) =>
    props.yellow &&
    css`
      background: ${({ theme }) => theme.yellow};
      color: #ffffff;
    `};

  ${(props) =>
    props.default &&
    css`
      background: ${({ theme }) => theme.grey};
      color: ${({ theme }) => theme.dark};
    `};
  ${(props) =>
    props.dark &&
    css`
      background: ${({ theme }) => theme.dark};
      color: ${({ theme }) => theme.light};
    `};

  ${(props) =>
    props.pointer &&
    css`
      &:before {
        position: absolute;
        width: 8px;
        height: 8px;
        border-width: 1px;
        border-color: red red red transparent;
        background: ${(props) =>
          props.color ? props.color : ({ theme }) => theme.bluer};

        top: 100%;
        left: 50%;
        margin-left: -4px;
        content: "";
        transform: rotate(45deg);
        margin-top: -4px;
      }
    `};

  @media (max-width: 768px) {
    font-size: 12px;
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
    background: ${(props) => (props.bg ? props.bg : ({ theme }) => theme.dark)};
    color: ${(props) => (props.color ? props.color : "#fff")};
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: none;
    outline: none;
    border-radius: ${(props) =>
      props.oblong ? "25px" : props.rounded ? "15px" : "0"};
    transition: background-color 0.6s ease;

    &:hover,
    &.active {
      background: ${(props) =>
        props.activeBg ? props.activeBg : ({ theme }) => theme.blue};
      color: ${(props) =>
        props.hoverColorText ? props.hoverColorText : "#232323"};
    }

    .accordion-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.6s ease;
    }

    p {
      font-size: ${(props) => (props.fs ? props.fs : "12px")};
      font-weight: 500;
      padding: ${(props) => (props.pad ? props.pad : "10px 20px")};
      text-transform: ${(props) =>
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
    width: 100%;

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
  background: ${(props) =>
    props.alert
      ? "rgba(229, 80, 57,0.9)"
      : props.success
      ? "rgba(46, 213, 115,0.9)"
      : props.warning
      ? "rgba(254, 211, 48,0.9)"
      : "rgba(255, 255, 255,1.0)"};
  height: auto;
  border-radius: 10px;
  padding: 2%;
  position: relative;
  z-index: 5;

  .description {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    min-width: 200px;
    max-width: 500px;
    width: 100%;
    height: 100%;
    min-height: 50px;

    text-align: center;
    font-weight: 700;
    font-size: 14px;
  }

  .close {
    height: 90%;
    margin: 1% auto;
    padding: 1%;
    border-left: 1px solid rgba(245, 246, 250, 0.4);
    color: #fff;
    position: absolute;
    right: 1%;
    top: 0;
    fontweight: bold;
    cursor: pointer;
  }
`;

export const ReadMore = styled.p`
  text-align: ${(props) =>
    props.center ? "center" : props.left ? "left" : "right"};
  cursor: pointer !important;

  span {
    color: ${(props) =>
      props.color ? props.color : ({ theme }) => theme.secondary};
    display: inline-block;
    position: relative;
    font-weight: 700;
    font-size: ${(props) => (props.size ? props.size : "12px")};
    &:after {
      content: "\f061";
      font-family: FontAwesome;
      ${(props) =>
        props.hover
          ? css`
              margin-left: -10px;
              opacity: 0;
            `
          : css`
              margin-left: 5px;
              opacity: 1;
            `};
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

export const IconCustom = styled(Icon)`
  cursor: pointer;
  opacity: 0.8;
  transition: all 0.5s ease;
  margin: 2%;
  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`;

export const IconWrap = styled.div`
  ${StyledIconBase} {
    color: ${(props) =>
      props.color === "primary"
        ? ({ theme }) => theme.primary
        : props.color === "bluer"
        ? ({ theme }) => theme.bluer
        : props.color === "red"
        ? ({ theme }) => theme.red
        : props.color === "green"
        ? ({ theme }) => theme.green
        : props.color === "yellow"
        ? ({ theme }) => theme.yellow
        : props.color === "grey"
        ? ({ theme }) => theme.grey
        : props.color === "dark"
        ? ({ theme }) => theme.dark
        : "#fff"};
    cursor: pointer;
    opacity: 0.8;
    transition: all 0.5s ease;
    margin: ${(props) =>
      props.mcenter ? "0 auto" : props.margin ? props.margin : "5px"};
    outline: none;
    padding: ${(props) => (props.pad ? props.pad : "0")};
    visibility: visible;
    pointer-events: all;
    transition: visibility 200ms, opacity 0.3s ease-in-out;

    ${(props) =>
      props.bgcolor &&
      css`
        background-color: ${props.bgcolor};
      `};

    ${(props) =>
      props.shadow &&
      css`
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12),
          0 4px 4px rgba(0, 0, 0, 0.12), 0 8px 8px rgba(0, 0, 0, 0.12),
          0 16px 16px rgba(0, 0, 0, 0.12);
      `};

    ${(props) =>
      props.invisible &&
      css`
        visibility: hidden;
        opacity: 0;
        pointer-events: none;
      `};

    ${(props) =>
      props.size &&
      css`
        width: ${props.size};
        height: ${props.size};
      `};

    ${(props) =>
      props.mini
        ? css`
            width: 9px;
            height: 9px;
          `
        : props.tiny
        ? css`
            width: 18px;
            height: 18px;
          `
        : props.small
        ? css`
            width: 22px;
            height: 22px;
          `
        : props.medium
        ? css`
            width: 26px;
            height: 26px;
          `
        : props.large
        ? css`
            width: 32px;
            height: 32px;
          `
        : css`
            width: 25px;
            height: 25px;
          `};

    ${(props) =>
      props.circle &&
      css`
        border-radius: 100%;
      `};

    &:hover {
      opacity: 1;
      transform: scale(1.1);

      ${(props) =>
        props.menu &&
        css`
          border-radius: 100%;
          background: #ccc;
        `}
    }

    ${(props) =>
      props.bottomcenter &&
      css`
        z-index: 20;
        position: absolute;
        bottom: 2%;
        left: 0;
        right: 0;
        margin: 0 auto;
      `};

    ${(props) =>
      props.topright &&
      css`
        z-index: 20;
        position: absolute;
        top: 2%;
        right: 0;
        margin: 0 auto;
      `};

    ${(props) =>
      props.right &&
      css`
        z-index: 20;
        position: absolute;
        top: 2%;
        right: 0;
        bottom: 0;
        margin: 0 auto;
      `};
  }
`;

export const DotsVertical = styled(DotsVerticalRounded)`
  color: #232323;
  cursor: pointer;

  &:hover {
    border-radius: 100%;
    background: #ccc;
  }
`;

export const DLink = styled(Link)`
  color: ${(props) => (props.color ? props.color : "#232323")} !important;
  font-size: ${(props) => (props.size ? props.size : "12px")};
  padding-bottom: 5px;
  &:hover {
    color: ${({ theme }) => theme.secondary} !important;
    border-bottom: ${(props) => props.borderb && "1px solid #232323"};
    border-bottom-color: ${({ theme }) => theme.secondary};
  }
`;

export const DInput = styled.input`
  padding: 10px;
  width: auto;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  outline: none;

  ${(props) =>
    props.error &&
    css`
      background: #fff6f6;
      color: #ce9a99;
      font-weight: 700;
      border-color: #ce9a99;
    `};

  ${(props) =>
    props.fluid &&
    css`
      width: 100%;
    `};
  &:focus {
    box-shadow: 0 0 2px 1px ${({ theme }) => theme.primary};
  }
`;

export const DSelect = styled.select`
  padding: 10px;
  width: auto;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  outline: none;

  ${(props) =>
    props.fluid &&
    css`
      width: 100%;
    `};
  &:focus {
    box-shadow: 0 0 2px 1px ${({ theme }) => theme.primary};
  }
`;

export const CheckLabel = styled.label`
  font-weight: ${(props) =>
    props.weight === "fw500" ? "500 !important" : "700 !important"};
  color: ${(props) =>
    props.color === "green"
      ? ({ theme }) => theme.green
      : props.color === "bluer"
      ? ({ theme }) => theme.bluer
      : props.color === "blue"
      ? "rgba(33, 147, 176, 0.7)"
      : props.color === "dark"
      ? ({ theme }) => theme.dark
      : props.color === "grey"
      ? ({ theme }) => theme.grey
      : ({ theme }) => theme.secondary};
  text-transform: ${(props) => (props.textt ? props.textt : "none")};
`;
