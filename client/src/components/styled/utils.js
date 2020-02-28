import styled, { keyframes } from "styled-components";

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
  padding: 6px 16px;
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
  border: ${props =>
    props.border
      ? "2px solid #1CA7EC"
      : props.basic
      ? "2px solid #1CA7EC"
      : "0"};

  border-radius: 5px;
  background: ${props =>
    props.background
      ? props.background
      : props.basic
      ? "transparent"
      : ({ theme }) => theme.blue};
  color: ${props =>
    props.color
      ? props.color
      : props.basic
      ? "inherit"
      : ({ theme }) => theme.light};
  font-weight: 700;
  outline: 0;

  &:hover {
    background: ${props => props.basic && (({ theme }) => theme.blue)};
    color: ${props => props.basic && (({ theme }) => theme.light)};
  }

  &:focus {
    background: darken(${({ theme }) => theme.blue}, 12%);
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

export const DButtonCancel = styled(DButton)`
  background: ${props =>
    props.background
      ? props.background
      : props.basic
      ? "transparent"
      : ({ theme }) => theme.red};

  border: ${props =>
    props.border
      ? "2px solid #1CA7EC"
      : props.basic
      ? "2px solid #f12711"
      : "0"};

  color: ${props =>
    props.color
      ? props.color
      : props.basic
      ? "inherit"
      : ({ theme }) => theme.light};

  &:hover {
    background: ${props => props.basic && (({ theme }) => theme.red)};
    color: ${props => props.basic && (({ theme }) => theme.light)};
  }
`;

export const DButtonConfirm = styled(DButton)`
  background: ${props =>
    props.background
      ? props.background
      : props.basic
      ? "transparent"
      : ({ theme }) => theme.green};

  border: ${props =>
    props.border
      ? "2px solid #0f9b0f"
      : props.basic
      ? "2px solid #0f9b0f"
      : "0"};

  color: ${props =>
    props.color
      ? props.color
      : props.basic
      ? "inherit"
      : ({ theme }) => theme.light};
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
    transition: background-color 0.6s ease;

    &:hover,
    &.active {
      background: ${({ theme }) => theme.blue};
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
    transition: max-height 0.6s ease;

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
