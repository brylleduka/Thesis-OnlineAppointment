import React from "react";

import Header from "./Header";
import SideNav from "./SideNav";

import { LayoutContainer, MainLayout } from "../../styled/layout";

const Layout = props => {
  return (
    <LayoutContainer>
      <Header />
      <SideNav />
      <MainLayout>{props.children}</MainLayout>
    </LayoutContainer>
  );
};

export default Layout;
