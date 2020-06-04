import styled from "styled-components";

export const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-areas: "sidenav main-content";
  position: relative;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "main"
      "footer";
  }
`;

export const MainLayout = styled.div`
  grid-area: main-content;
  display: grid;
  grid-template-rows: 10vh 1fr


  position: relative;
  width: 100%;
  max-width: 100%;
  min-width: 90%;
  margin: 0 auto;
  background: rgba(242, 242, 242, 0.2);
  .lay_header{
    height: 10vh;
    width: 100%;
    position: relative;
  }
  main{
    height: 100%;
    width: 100%;
  }
 
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
  transition: all 0.4s ease-in-out;

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
    display: none;
    color: ${({ theme }) => theme.light};
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
    &:hover {
      opacity: 0.9;
    }
  }

  @media (max-width: 1024px) {
    position: absolute;
    transform: ${(props) =>
      props.openMenu ? "translateX(0)" : "translateX(-300px)"};

    .menu-close {
      display: block;
    }
  }
`;

export const HeaderLayout = styled.div`
  width: 100%;
  height: 10vh;
  padding: 0 1rem;
  background: ${({ theme }) => theme.light};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 5;
  transform: translateX(-300px);

  .burger-menu {
    transform: translateX(320px);
    visibility: hidden;
    pointer-events: none;
    .burger-icon {
      cursor: pointer;

      &:hover {
        color: ${({ theme }) => theme.blue};
      }
    }
  }

  @media (max-width: 1024px) {
    transform: translateX(0);

    .burger-menu {
      visibility: visible;
      pointer-events: all;
      transform: translateX(0);
    }
  }
`;

export const FooterLayout = styled.div`
  grid-area: footer;
  height: 10vh;
  background-color: white;
`;
