import React, { useState, useRef, useContext } from "react";
import { HeaderLayout } from "../../styled/layout";
import { Content, DImage } from "../../styled/containers";
import { DButton } from "../../styled/utils";
import { Exit } from "styled-icons/boxicons-regular/Exit";
import { AuthContext } from "../../../context/auth";

const Header = () => {
  const { employeeLogout } = useContext(AuthContext);

  const handleLogout = () => {
    employeeLogout();
  };

  return (
    <HeaderLayout>
      <Content
        flex
        justify="flex-end"
        align="center"
        width="100%"
        height="100%"
      >
        <DImage circle height="50px" width="50px">
          <img
            src="https://images.pexels.com/photos/413885/pexels-photo-413885.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="avatar"
          />
        </DImage>
        <DButton background="transparent" color="blue" onClick={handleLogout}>
          <Exit size="24px" style={{ marginLeft: "2%" }} />
        </DButton>
      </Content>
    </HeaderLayout>
  );
};

export default Header;
