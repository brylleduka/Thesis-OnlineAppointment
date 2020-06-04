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
      <SideNav isOpenMenu={isOpenMenu} handleOpenMenu={handleOpenMenu} />

      <MainLayout>
        <div className="lay_header">
          <Header handleOpenMenu={handleOpenMenu} />
        </div>
        <main style={{ width: "100%", height: "100%" }}>{props.children}</main>
      </MainLayout>
    </LayoutContainer>
  );
};

export default Layout;
