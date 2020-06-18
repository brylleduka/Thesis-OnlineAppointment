import styled, { css } from "styled-components";
import { Dropdown } from "semantic-ui-react";

export const DNavigation = styled.nav`
  width: 100%;
  background: ${(props) => (props.bg ? props.bg : "rgba(255,255,255,1)")};
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 12vh;
  z-index: 10;

  .content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 30px 0;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 2px;

    width: 90%;
    margin: 0 auto;

    outline: 0;
    border: 0;

    .brand-container {
      width: 100px;
      height: 100%;

      .brand {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    @media (max-width: 1024px) {
      padding: 10px 0;
      height: 7rem;
      width: 100%;
    }

    @media (max-width: 768px) {
      padding: 10px 0;

      .brand-container {
        width: 100px;
      }
    }

    @media (max-width: 500px) {
      padding: 2px 0;

      width: 90%;

      .brand-container {
        width: 70px;
      }
    }
  }
`;

export const DMenu = styled.ul`
  display: flex;

  li {
    padding: 0 10px;
  }
  li a {
    padding-bottom: 2px;
    color: ${({ theme }) => theme.dark};
  }

  li a:hover,
  &.active,
  .main_nav_link-active {
    color: ${({ theme }) => theme.blue};
    border-bottom: 2px solid ${({ theme }) => theme.blue};
  }
`;

export const DMainMenu = styled(DMenu)`
  flex: 1;
  margin-left: 30px;

  li:nth-child(1),
  li:nth-child(2),
  .account-nav,
  .hr-nav {
    display: none;
  }

  li:nth-child(2) {
    font-size: 16px;
  }

  .signout_link {
    display: none;
  }

  @media (max-width: 1024px) {
    height: 100%;
    min-height: 100vh;
    width: 100%;
    background: ${({ theme }) => theme.blue};
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 2rem;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 8;
    color: ${({ theme }) => theme.light};
    transform: ${({ open }) => (open ? "translateX(0%)" : "translateX(100%)")};
    transform-origin: bottom left;
    transition: transform 0.3s ease-in-out;
    border: 1px solid #fff;

    .signout_link {
      display: block;
      cursor: pointer;
      &:hover {
        color: ${({ theme }) => theme.secondary};
      }
    }

    li:nth-child(1),
    li:nth-child(2) {
      display: block;
      a {
        font-size: 12px;
      }
    }
    li:nth-child(2) {
      .btn {
        font-size: 16px;
        margin: 0;
        padding: 5px 6px;
        &:hover {
          color: ${({ theme }) => theme.secondary};
        }
      }
    }

    .account-nav {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-end;
      line-height: 1.4;
    }

    .account-nav li,
    .account-nav li a {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      font-size: 13px;
    }

    .account-nav li:first-child span {
      margin-left: 10px;
    }

    .hr-nav {
      display: block;
      width: 70%;
      margin: 10px auto;
      hr {
        border: 0;
        height: 1px;
        background: #333;
        background-image: linear-gradient(to right, #ccc, #333, #ccc);
      }
    }

    li {
      justify-content: flex-start;
      align-items: flex-start;
      margin-right: 20px;
      transform: ${({ open }) =>
        open ? " translateX(0%)" : "translateX(100%)"};

      transition: color 0.15s, transform 0.5s;
      transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);

      a {
        margin: 0.5em 0;

        font-size: 18px;
        text-transform: uppercase;
        font-weight: bold;
        letter-spacing: 0.5rem;
        text-align: center;
        line-height: 2.8;
        color: ${({ theme }) => theme.light};
        text-decoration: none;
      }

      a:hover,
      &.active {
        color: ${({ theme }) => theme.secondary};
        border-bottom: 0;
      }
      &:nth-child(1) {
        transition-delay: 0s, 100ms;
      }
      &:nth-child(2) {
        transition-delay: 0s, 150ms;
      }
      &:nth-child(3) {
        transition-delay: 0s, 200ms;
      }
      &:nth-child(4) {
        transition-delay: 0s, 250ms;
      }
      &:nth-child(5) {
        transition-delay: 0s, 300ms;
      }
      &:nth-child(6) {
        transition-delay: 0s, 350ms;
      }
      &:nth-child(7) {
        transition-delay: 0s, 400ms;
      }
      &:nth-child(8) {
        transition-delay: 0s, 450ms;
      }
      &:nth-child(9) {
        transition-delay: 0s, 500ms;
      }
      &:nth-child(10) {
        transition-delay: 0s, 550ms;
      }
    }
  }
`;

export const DRightMenu = styled(DMenu)`
  display: flex;

  li {
    padding: 0 10px;
  }
  li a {
    color: #232323;
  }

  li:first-child {
    padding: 10px;
  }

  li:last-child a {
    padding-bottom: 10px;
  }

  li:last-child a:hover {
    border-bottom: 0;
    color: white;
  }

  @media (max-width: 1024px) {
    justify-content: flex-end;
    margin-right: 60px;
    width: 90%;
    display: none;
    .btn {
      font-size: 12px;
    }
  }

  @media (max-width: 768px) {
    justify-content: flex-end;
    margin-right: 100px;
    width: 90%;
    .btn {
      font-size: 12px;
    }
  }

  @media (max-width: 500px) {
    justify-content: center;
    margin: 0 auto;
    width: 80%;

    .btn {
      height: auto;
      padding: 5px;
      margin-right: 25px;
    }
  }
`;

export const DBurger = styled.nav`
  position: fixed;
  top: 5%;
  right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  box-shadow: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.3rem;
    background: ${({ theme, open }) => (open ? theme.light : theme.blue)};
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    box-shadow: 0 1px 1px rgba(103, 128, 159, 0.12),
      0 2px 2px rgba(103, 128, 159, 0.12), 0 3px 3px rgba(103, 128, 159, 0.12);

    :first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }

  @media only screen and (min-width: 1025px) {
    display: none;
  }

  @media only screen and (max-width: 1024px) {
    top: 3%;
    right: 5rem;
  }

  @media only screen and (max-width: 768px) {
    top: 3.5%;
    right: 4rem;
  }

  @media only screen and (max-width: 500px) {
    top: 3%;
    right: 2rem;
  }
`;

export const DropdownCustomNav = styled(Dropdown)`
  &:hover {
    color: ${({ theme }) => theme.primary};
  }

  & a {
    color: #232323;
    font-weight: 700;
  }
  & a:hover {
    color: ${({ theme }) => theme.primary};
  }

  & .customDropMenu a {
    font-weight: 500;
    color: ${({ theme }) => theme.primary} !important;
  }

  @media (max-width: 1024px) {
    a {
      color: #ffff;
      font-size: 18px;
      text-transform: uppercase;
      margin-right: 24px;
    }
    a:hover {
      color: ${({ theme }) => theme.secondary};
      font-size: 18px;
      text-transform: uppercase;
      margin-right: 24px;
    }
  }

  .customDropMenu .customDropMenuItem {
    width: 100%;
    text-align: center;
    color: #232323 !important;
    font-size: 14px !important;
  }
  .customDropMenu .customDropMenuItem:hover {
    color: ${({ theme }) => theme.secondary};
  }
`;
