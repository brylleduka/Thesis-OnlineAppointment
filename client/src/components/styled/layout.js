import styled from "styled-components";

export const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-areas:
    "sidenav header"
    "sidenav main"
    "sidenav footer";

  position: relative;
`;

export const MainLayout = styled.div`
  grid-area: main;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  position: relative;
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
`;

export const FooterLayout = styled.div`
  grid-area: footer;
  height: 10vh;
  background-color: white;
`;
