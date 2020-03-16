import React, { useRef, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/auth";
import { bool } from "prop-types";
import { useOnClickOutside } from "./navHook";
import { Link, useHistory } from "react-router-dom";
import { Dropdown, Icon } from "semantic-ui-react";
import { DNavigation, DMainMenu, DRightMenu } from "../../styled/navigation";
import Burger from "./Burger";
import useScroll from "../../../util/hooks/useScroll";

const Navigation = ({ open, setOpen }) => {
  const scrolling = useScroll();

  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));
  let history = useHistory();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    history.push("/zessence");
  };

  const trigger = (
    <>
      {user && (
        <span style={{ fontSize: "12px" }}>
          <Icon name="user" /> Hello, {user.firstName}
        </span>
      )}
    </>
  );

  return (
    <DNavigation ref={node} scrolled={scrolling ? true : false}>
      <div className="content">
        <img src={"/images/logo.png"} alt="Z Essence" className="logo" />
        <Burger open={open} setOpen={setOpen} />

        <DMainMenu open={open} scrolled={scrolling ? true : false}>
          {user ? (
            <div className="account-nav">
              <li>
                Signed is as <span>{user.firstName}</span>
              </li>
              <li>
                <Link to={`/zessence/myaccount/${user.userId || user._id}`}>
                  My Account
                </Link>
              </li>
              <li>
                <span onClick={handleLogout} className="signing_out">
                  Sign out
                </span>
              </li>
            </div>
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
          <li className="hr-nav">
            <hr className="hr-one" />
          </li>
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
            <Link to="/zessence/gallery">Gallery</Link>
          </li>
          <li>
            <Link to="/zessence/contact">Contact</Link>
          </li>
          <li>
            <Link to="/zessence/testimonials">Testimonials</Link>
          </li>
        </DMainMenu>
        <DRightMenu scrolled={scrolling ? true : false}>
          {user ? (
            <li>
              <Dropdown trigger={trigger}>
                <Dropdown.Menu>
                  <Dropdown.Item disabled>
                    <span style={{ fontSize: "10px" }}>
                      Signed is as <strong>{user.firstName}</strong>
                    </span>
                  </Dropdown.Item>

                  <Dropdown.Item>
                    <Link
                      to={`/zessence/account/${user.userId || user._id}`}
                      className="account-right"
                      onClick={() => localStorage.setItem("account", "details")}
                    >
                      Account
                    </Link>
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
