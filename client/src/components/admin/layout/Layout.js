import React, { useState } from "react";

import Header from "./Header";
import SideNav from "./SideNav";

import { LayoutContainer, MainLayout } from "../../styled/layout";

const Layout = (props) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleOpenMenu = (e) => {
    e.preventDefault();
    setIsOpenMenu(!isOpenMenu);
  };
  return (
    <LayoutContainer>
      <Header handleOpenMenu={handleOpenMenu} />
      <SideNav isOpenMenu={isOpenMenu} handleOpenMenu={handleOpenMenu} />
      <MainLayout>{props.children}</MainLayout>
    </LayoutContainer>
  );
};

export default Layout;
