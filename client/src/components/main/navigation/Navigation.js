import React, { useRef, useContext } from "react";
import { AuthContext } from "../../../context/auth";
import { bool } from "prop-types";
import { useOnClickOutside } from "./navHook";
import { useHistory } from "react-router-dom";
import {
  HashLink as Link,
  NavHashLink as NavLink,
} from "react-router-hash-link";
import { Dropdown, Icon } from "semantic-ui-react";
import {
  DNavigation,
  DMainMenu,
  DRightMenu,
  DropdownCustomNav,
} from "../../styled/navigation";
import Burger from "./Burger";
import Branding from "./Branding";
import useScroll from "../../../util/hooks/useScroll";

const Navigation = ({ open, setOpen }) => {
  const scrolling = useScroll();

  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));
  // let history = useHistory();

  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    setOpen(false);
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
        <Link to="/">
          <Branding />
        </Link>
        <Burger open={open} setOpen={setOpen} />

        <DMainMenu open={open} scrolled={scrolling ? true : false}>
          {user ? (
            <div className="account-nav">
              <li>
                Signed is as <span>{user.firstName}</span>
              </li>
              <li>
                <Link
                  to={`/account/${user.userId || user._id}`}
                  onClick={() => setOpen(false)}
                >
                  My Account
                </Link>
              </li>
            </div>
          ) : (
            <li>
              <Link to="/login" onClick={() => setOpen(false)}>
                Sign in
              </Link>
            </li>
          )}

          <li>
            <Link
              to="/appointment"
              className="btn btn_appoint"
              onClick={() => setOpen(false)}
            >
              Book Appointment
            </Link>
          </li>
          <li className="hr-nav">
            <hr className="hr-one" />
          </li>
          <li>
            <Link
              to={`/#home`}
              scroll={scrollBehavior}
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <NavLink
              to="/services&rates/#services"
              scroll={scrollBehavior}
              onClick={() => setOpen(false)}
              activeClassName="main_nav_link-active"
            >
              Services
            </NavLink>
          </li>

          {/* <NavLink to="/about">About&nbsp;Us</NavLink> */}
          <DropdownCustomNav
            trigger={
              <NavLink
                to="/about/#about"
                scroll={scrollBehavior}
                onClick={() => setOpen(false)}
                activeClassName="main_nav_link-active"
              >
                About&nbsp;Us
              </NavLink>
            }
            simple
            scrolled={scrolling ? true : undefined}
          >
            <Dropdown.Menu className="customDropMenu">
              <Dropdown.Item
                className="customDropMenuItem"
                as={Link}
                to="/about/#story"
                scroll={scrollBehavior}
                onClick={() => setOpen(false)}
              >
                Our Story
              </Dropdown.Item>
              <Dropdown.Item
                className="customDropMenuItem"
                as={Link}
                to="/about/#team"
                scroll={scrollBehavior}
                onClick={() => setOpen(false)}
              >
                Our Team
              </Dropdown.Item>
            </Dropdown.Menu>
          </DropdownCustomNav>

          <li>
            <NavLink
              to="/gallery/#gallery"
              scroll={scrollBehavior}
              onClick={() => setOpen(false)}
              activeClassName="main_nav_link-active"
            >
              Gallery
            </NavLink>
          </li>
          <li>
            <Link
              to="/#contact"
              scroll={scrollBehavior}
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
          </li>
          <li>
            <NavLink
              to="/testimonials/#tstmnl"
              scroll={scrollBehavior}
              onClick={() => setOpen(false)}
              activeClassName="main_nav_link-active"
            >
              Testimonials
            </NavLink>
          </li>
          <li className="signout_link">
            <span onClick={handleLogout} className="signing_out">
              Sign out
            </span>
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
                    <NavLink
                      to={`/account/${user.userId || user._id}`}
                      className="account-right"
                      onClick={() => localStorage.setItem("account", "details")}
                      activeClassName="main_nav_link-active"
                    >
                      My Account
                    </NavLink>
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
