import React, { useRef, useContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_USER_ACCOUNT } from "../../../util/graphql/user";
import { AuthContext } from "../../../context/auth";
import { bool } from "prop-types";
import { useOnClickOutside } from "./navHook";
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
  TopNav,
} from "../../styled/navigation";
import { DCard, DImage, Content } from "../../styled/containers";
import Burger from "./Burger";
import Branding from "./Branding";
import useScroll from "../../../util/hooks/useScroll";
import useWindowSize from "../../../util/hooks/useWindowSize";
import { UserCircle } from "@styled-icons/fa-solid/UserCircle";
import { FacebookSquare, Twitter } from "@styled-icons/boxicons-logos";

const Navigation = ({ open, setOpen }) => {
  const { width: wid } = useWindowSize();
  const scrolling = useScroll();
  const node = useRef();
  const { user, logout } = useContext(AuthContext);
  const [client, setClient] = useState({});

  const { data: dataClient, loading: loadDataClient } = useQuery(
    FETCH_USER_ACCOUNT,
    {
      variables: {
        userId: (user && user.userId) || (user && user._id),
      },
    }
  );

  useEffect(() => {
    if (dataClient) setClient(dataClient.user);
  }, [dataClient]);

  // let history = useHistory();
  useOnClickOutside(node, () => setOpen(false));
  const handleLogout = () => {
    logout();
    setOpen(false);
    // history.push("");
  };

  console.log(scrolling);

  const trigger = (
    <>
      {user && (
        <Content
          flex
          height="100%"
          width="100%"
          justify="center"
          align="center"
        >
          <DCard
            dw="40px"
            dh="40px"
            mcenter
            circle
            p="0px"
            grayzoom
            style={{ marginRight: "1.2rem" }}
          >
            <DImage circle height="100%" width="100%">
              <img
                src={
                  client.imageURL ||
                  "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                }
                alt={client.firstName}
              />
            </DImage>
          </DCard>
          <span
            style={
              scrolling
                ? { fontSize: "12px" }
                : { color: "#fff", fontSize: "12px" }
            }
          >
            Hi,
            {client.firstName && client.firstName.length > 6
              ? client.firstName.substr(0, 6) + "..."
              : client.firstName}
          </span>
        </Content>
      )}
    </>
  );

  const scrollBehavior = (el) =>
    el.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        top: 0,
      }}
    >
      <TopNav>
        <div className="top-nav_content">
          <div className="contact_info">
            <div className="info">
              <Icon name="map marker" size="small" />
              <p>114 Malihan St. Dasmarinas Cavite</p>
            </div>
            <div className="divider"></div>
            <div className="info">
              <Icon name="phone" size="small" />
              <p>+63 908 9565 006</p>
            </div>
          </div>
          <div className="divider"></div>
          <div className="social_links">
            <div className="social">
              <a href="https://www.facebook.com/zessencedasma">
                <FacebookSquare size="28px" color="#4267B2" />
              </a>
            </div>
            <div className="divider"></div>
            <div className="social">
              <a href="https://www.facebook.com/zessencedasma">
                <Twitter size="28px" color="#00acee" />
              </a>
            </div>
          </div>
        </div>
      </TopNav>
      <DNavigation
        position={scrolling ? "fixed" : null}
        bg={scrolling ? "rgba(255,255,255,1)" : null}
        ref={node}
        shadow={scrolling ? true : null}
      >
        <div className="content">
          <Link to="/#home">
            <Branding />
          </Link>
          <div className="menu-container">
            <Link to={user ? `/account/${user.userId || user._id}` : "/login"}>
              {user ? (
                <Content
                  flex
                  height="100%"
                  width="100%"
                  justify="center"
                  align="center"
                  style={{ marginRight: "1.2rem", padding: "0 5px" }}
                >
                  <DCard
                    dw="40px"
                    dh="40px"
                    mcenter
                    circle
                    p="0px"
                    grayzoom
                    style={{ marginRight: ".75rem" }}
                  >
                    <DImage circle height="100%" width="100%">
                      <img
                        src={
                          client.imageURL ||
                          "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                        }
                        alt={client.firstName}
                      />
                    </DImage>
                  </DCard>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#000",
                      textDecoration: "none",
                    }}
                  >
                    Hi,
                    {client.firstName && client.firstName.length > 6
                      ? client.firstName.substr(0, 6) + "..."
                      : client.firstName}
                  </span>
                </Content>
              ) : (
                <UserCircle
                  size="22px"
                  style={{ marginRight: "1.2rem" }}
                  title="Sign in"
                />
              )}
            </Link>

            <Burger open={open} setOpen={setOpen} />
          </div>

          <DMainMenu open={open} scrolled={scrolling ? true : null}>
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
                className="btn btn-blue btn-rounded"
                onClick={() => setOpen(false)}
              >
                Book Online
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

            <DropdownCustomNav
              trigger={
                <NavLink
                  to="/about/#about"
                  scroll={scrollBehavior}
                  onClick={() => setOpen(false)}
                  activeClassName="main_nav_link-active"
                  className="main_navlink"
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

            {/* <NavLink to="/about">About&nbsp;Us</NavLink> */}

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
              <NavLink
                to="/testimonials/#tstmnl"
                scroll={scrollBehavior}
                onClick={() => setOpen(false)}
                activeClassName="main_nav_link-active"
              >
                Testimonials
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

            {user && (
              <li className="signout_link">
                <span onClick={handleLogout} className="signing_out">
                  Sign out
                </span>
              </li>
            )}
          </DMainMenu>
          <DRightMenu>
            {user ? (
              <li>
                <Dropdown
                  pointing="top left"
                  icon={null}
                  trigger={trigger}
                  className="avatarLog"
                  simple
                >
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
                        onClick={() =>
                          localStorage.setItem("account", "details")
                        }
                        activeClassName="main_nav_link-active"
                      >
                        My Account
                      </NavLink>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>
                      Sign out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            ) : (
              <li>
                <Link to="/login">
                  <UserCircle
                    size="22px"
                    title="Sign in"
                    color={scrolling ? "#000" : "#fff"}
                  />
                </Link>
              </li>
            )}
            <li>
              <Link to="/appointment" className="btn btn-rounded">
                Book Online
              </Link>
            </li>
          </DRightMenu>
        </div>
      </DNavigation>
    </div>
  );
};

Navigation.propTypes = {
  open: bool.isRequired,
};

export default Navigation;
