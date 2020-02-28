import React, { useRef, useContext, useState } from "react";
import { AuthContext } from "../../../context/auth";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_USER_ACCOUNT } from "../../../util/graphql";
import { bool } from "prop-types";
import { useOnClickOutside } from "./navHook";
import { Link, useHistory } from "react-router-dom";
import { Dropdown, Icon } from "semantic-ui-react";
import { DNavigation, DMainMenu, DRightMenu } from "../../styled/navigation";
import Burger from "./Burger";

const Navigation = ({ open, setOpen }) => {
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));

  let history = useHistory();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    history.push("/zessence");
  };

  const { data: userInfo, loading: userLoading } = useQuery(
    FETCH_USER_ACCOUNT,
    {
      variables: {
        userId: user ? user.userId : ""
      }
    }
  );

  const trigger = (
    <>
      {userInfo ? (
        <span style={{ fontSize: "12px" }}>
          <Icon name="user" /> Hello, {userInfo.user.firstName}
        </span>
      ) : (
        ""
      )}
    </>
  );

  return (
    <DNavigation ref={node}>
      <div className="content">
        <img src={"/images/logo.png"} alt="Z Essence" className="logo" />
        <Burger open={open} setOpen={setOpen} />

        <DMainMenu open={open}>
          <li>
            <Link to="/zessence">Home</Link>
          </li>
          <li>
            <Link to="/zessence/services&rates">Services & Rates</Link>
          </li>
          <li>
            <Link to="/zessence/about">About Us</Link>
          </li>
          <li>
            <Link to="/zessence/contact">Contact</Link>
          </li>
          <li>
            <Link to="/zessence/testimonials">Testimonials</Link>
          </li>
        </DMainMenu>
        <DRightMenu>
          {user ? (
            <li>
              <Dropdown trigger={trigger}>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    {!userInfo ? (
                      <h6>Loading...</h6>
                    ) : (
                      <Link to={`/zessence/myaccount/${userInfo.user._id}`}>
                        My Account
                      </Link>
                    )}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          ) : (
            <li>
              <Link to="/zessence/login">Sign in</Link>
            </li>
          )}
          <li>
            <Link to="/zessence/appointment" className="btn">
              Book Appointment
            </Link>
          </li>
        </DRightMenu>
      </div>
    </DNavigation>
  );
};

Navigation.propTypes = {
  open: bool.isRequired
};

export default Navigation;
