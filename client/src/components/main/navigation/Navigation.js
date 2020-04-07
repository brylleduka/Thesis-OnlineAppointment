import React, { useRef, useContext } from "react";
import { AuthContext } from "../../../context/auth";
import { bool } from "prop-types";
import { useOnClickOutside } from "./navHook";
import { useHistory } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { Dropdown, Icon } from "semantic-ui-react";
import {
  DNavigation,
  DMainMenu,
  DRightMenu,
  DropdownCustomNav,
} from "../../styled/navigation";
import Burger from "./Burger";
import useScroll from "../../../util/hooks/useScroll";

const Navigation = ({ open, setOpen }) => {
  const scrolling = useScroll();

  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));
  // let history = useHistory();

  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    // history.push("");
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

  const scrollBehavior = (el) =>
    el.scrollIntoView({ behavior: "smooth", block: "start" });

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
                <Link to={`/myaccount/${user.userId || user._id}`}>
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
              <Link to="/login">Sign in</Link>
            </li>
          )}
          <li>
            <Link to="/appointment" className="btn">
              Book Appointment
            </Link>
          </li>
          <li className="hr-nav">
            <hr className="hr-one" />
          </li>
          <li>
            <Link to={`/#home`} scroll={scrollBehavior}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/services&rates/#services" scroll={scrollBehavior}>
              Services
            </Link>
          </li>

          {/* <Link to="/about">About&nbsp;Us</Link> */}
          <DropdownCustomNav
            trigger={
              <Link to="/about/#about" scroll={scrollBehavior}>
                About&nbsp;Us
              </Link>
            }
            simple
            scrolled={scrolling ? true : false}
          >
            <Dropdown.Menu className="customDropMenu">
              <Dropdown.Item
                className="customDropMenuItem"
                as={Link}
                to="/about/#story"
                scroll={scrollBehavior}
              >
                Our Story
              </Dropdown.Item>
              <Dropdown.Item
                className="customDropMenuItem"
                as={Link}
                to="/about/#team"
                scroll={scrollBehavior}
              >
                Our Team
              </Dropdown.Item>
            </Dropdown.Menu>
          </DropdownCustomNav>

          <li>
            <Link to="/gallery/#gallery" scroll={scrollBehavior}>
              Gallery
            </Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/testimonials/#tstmnl" scroll={scrollBehavior}>
              Testimonials
            </Link>
          </li>
        </DMainMenu>
        <DRightMenu scrolled={scrolling ? true : false}>
          {user ? (
            <li>
              <Dropdown trigger={trigger} className="avatarLog">
                <Dropdown.Menu>
                  <Dropdown.Item disabled>
                    <span style={{ fontSize: "10px" }}>
                      Signed is as <strong>{user.firstName}</strong>
                    </span>
                  </Dropdown.Item>

                  <Dropdown.Item>
                    <Link
                      to={`/account/${user.userId || user._id}`}
                      className="account-right"
                      onClick={() => localStorage.setItem("account", "details")}
                    >
                      My Account
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          ) : (
            <li>
              <Link to="/login">Sign in</Link>
            </li>
          )}
          <li>
            <Link to="/appointment" className="btn">
              Book Appointment
            </Link>
          </li>
        </DRightMenu>
      </div>
    </DNavigation>
  );
};

Navigation.propTypes = {
  open: bool.isRequired,
};

export default Navigation;
