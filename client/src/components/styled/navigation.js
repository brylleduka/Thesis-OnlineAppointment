import styled from "styled-components";

export const DNavigation = styled.nav`
  width: 100%;
  background: ${props => (props.bg ? props.bg : "transparent")};
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 20vh;
  z-index: 10;

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 30px 0;
    font-size: 17px;
    font-weight: 700;
    letter-spacing: 2px;

    width: 90%;
    margin: 0 auto;

    outline: 0;
    border: 0;

    .logo {
      width: 90px;
    }

    @media (max-width: 1024px) {
      padding: 10px 0;
      height: 7rem;
      width: 100%;

      .logo {
        width: 90px;
        margin-left: 60px;
      }
    }

    @media (max-width: 768px) {
      padding: 10px 0;
      height: 100px;

      .logo {
        width: 90px;
        margin-left: 60px;
      }
    }

    @media (max-width: 500px) {
      // flex-direction: column;
      padding: 2px 0;
      height: 80px;
      width: 90%;

      .logo {
        width: 70px;
        margin: 5px 0;
      }
    }
  }

  ${props =>
    props.scrolled &&
    "background: rgba(0,0,0,0.6); height: 12vh; transition: all 0.2s ease-in-out;"};
`;

export const DMenu = styled.ul`
  display: flex;

  li {
    padding: 0 10px;
  }
  li a {
    padding-bottom: 2px;
  }

  li a:hover,
  &.active {
    border-bottom: 2px solid ${({ theme }) => theme.secondary};
  }
`;

export const DMainMenu = styled(DMenu)`
  flex: 1;
  margin-left: 30px;

  @media (max-width: 1024px) {
    height: 100vh;
    width: 100%;
    background: ${({ theme }) => theme.primary};
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 8;
    color: ${({ theme }) => theme.blue};
    transform: ${({ open }) =>
      open ? "skewX(-15deg) translateX(0%)" : "translateX(100%)"};
    transform-origin: bottom left;
    transition: transform 0.3s ease-in-out;

    li {
      justify-content: flex-start;
      align-items: flex-start;
      margin-right: 20px;
      transform: ${({ open }) =>
        open ? "skewX(15deg) translateX(0%)" : "translateX(100%)"};

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
        color: ${({ theme }) => theme.dark};
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
    }
  }
`;

export const DRightMenu = styled(DMenu)`
  display: flex;

  li {
    padding: 0 10px;
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
  &:hover {
    div {
      background: ${({ theme }) => theme.blue};
    }
  }

  div {
    width: 2rem;
    height: 0.3rem;
    background: ${({ theme, open }) => (open ? theme.dark : theme.blue)};
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
