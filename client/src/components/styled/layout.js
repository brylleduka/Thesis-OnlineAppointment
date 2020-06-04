import styled from "styled-components";

export const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-areas:
    "sidenav header"
    "sidenav main"
    "sidenav footer";
  position: relative;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "main"
      "footer";
  }
`;

export const MainLayout = styled.div`
  grid-area: main;
  position: relative;
  width: 100%;
  max-width: 100%;
  min-width: 90%;
  margin: 0 auto;
  background: rgba(242, 242, 242, 0.2);
`;
export const SideNavLayout = styled.div`
  grid-area: sidenav;
  width: 300px;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  z-index: 10;
  line-height: 2.8;
  padding-top: 5rem;
  background: ${({ theme }) => theme.dark};
  position: fixed;
  overflow-y: auto;
  transition: transform 0.4s ease-in-out;

  .avatar {
    height: 30%;
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    margin: 0 auto;
    margin-top: 2rem;
  }
  .menu-close {
    color: ${({ theme }) => theme.light};
    display: none;
    position: absolute;
    top: 10px;
    right: 10px;
    &:hover {
      opacity: 0.8;
    }
  }

  @media (max-width: 1024px) {
    position: fixed;
    transform: ${(props) =>
      props.openMenu ? "translateX(0)" : "translateX(-100%)"};

    .menu-close {
      display: block;
    }
  }
`;

export const HeaderLayout = styled.div`
  grid-area: header;
  width: 100%;
  height: 10vh;
  padding: 0 1rem;
  background: ${({ theme }) => theme.light};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .burger-menu {
    display: none;
    position: fixed;
    left: 10px;
    cursor: pointer;
    &:hover,
    &:focus {
      color: ${({ theme }) => theme.blue};
    }
  }

  @media (max-width: 1024px) {
    .burger-menu {
      display: block;
    }
  }
`;

export const FooterLayout = styled.div`
  grid-area: footer;
  height: 10vh;
  background-color: white;
`;
