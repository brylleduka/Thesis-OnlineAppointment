import React, { useState, useRef, useContext } from "react";
import { HeaderLayout } from "../../styled/layout";
import { Link } from "react-router-dom";
import { Content, DImage, Overlay } from "../../styled/containers";
import { DButton } from "../../styled/utils";
import { Exit } from "styled-icons/boxicons-regular/Exit";
import { AuthContext } from "../../../context/auth";
import { Dropdown, Image, Icon } from "semantic-ui-react";

const Header = () => {
  const { employeeLogout } = useContext(AuthContext);

  const handleLogout = () => {
    employeeLogout();
  };

  return (
    <HeaderLayout>
      <Dropdown
        trigger={
          <DImage circle height="50px" width="50px">
            <img
              src="https://images.pexels.com/photos/413885/pexels-photo-413885.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="avatar"
            />
            <Overlay opac={0} hovOpac={1} />
          </DImage>
        }
        pointing="top right"
        icon={null}
      >
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/zeadmin/paccount">
            <Icon name="user" />
            Account
          </Dropdown.Item>
          <Dropdown.Item onClick={handleLogout}>
            <Icon name="sign out" />
            Sign out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {/* <DImage circle height="50px" width="50px">
          <img
            src="https://images.pexels.com/photos/413885/pexels-photo-413885.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="avatar"
          />
        </DImage>
        <DButton background="transparent" color="blue" onClick={handleLogout}>
          <Exit size="24px" style={{ marginLeft: "2%" }} />
        </DButton> */}
    </HeaderLayout>
  );
};

export default Header;
