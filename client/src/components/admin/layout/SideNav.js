import React, { useContext } from "react";
import { AuthContext } from "../../../context/auth";
import { NavLink } from "react-router-dom";
import {
  BookContent,
  Report,
  MessageSquare,
  MessageRoundedDetail,
  CalendarEvent,
  MapAlt,
} from "@styled-icons/boxicons-solid";

import { Gallery, Service, Advertisement } from "@styled-icons/remix-fill";

import {
  ShortText,
  AccountBox,
  AccountCircle,
  Dashboard,
  Close,
  Computer,
} from "@styled-icons/material";
import { Walk } from "@styled-icons/boxicons-regular/Walk";

import { FileDirectory } from "@styled-icons/octicons";
import { Profile } from "@styled-icons/icomoon/Profile";
import { Archive } from "@styled-icons/entypo";

import { SideNavLayout } from "../../styled/layout";
import { NavItem } from "../../styled/utils";

import Accordion from "../../Accordion";
import { ReactComponent as ZEssenceLogo } from "../../../ze_logo.svg";

const SideNav = ({ isOpenMenu, handleOpenMenu }) => {
  const { employeeAuth } = useContext(AuthContext);

  return (
    <SideNavLayout openMenu={isOpenMenu ? true : null}>
      <Close
        size="36px"
        className="menu-close"
        onClick={handleOpenMenu}
        title="Close Menu"
      />

      <NavItem>
        <NavLink to="/zeadmin/dashboard">
          <Dashboard size="16px" />
          <span>Dashboard</span>
        </NavLink>
      </NavItem>

      <Accordion
        title={"Appointments"}
        icon={<CalendarEvent size="16px" />}
        hcolor="#fff"
        fs="14px"
      >
        <NavLink to="/zeadmin/appointments" activeClassName="navlink-active">
          <span>
            <Computer size="16px" style={styles.ml} />
            Online
          </span>
        </NavLink>

        <NavLink
          to="/zeadmin/walkin_appointments"
          activeClassName="navlink-active"
        >
          <span>
            <Walk size="16px" style={styles.ml} />
            Walk In
          </span>
        </NavLink>
      </Accordion>

      <NavItem>
        <NavLink to="/zeadmin/inquiry">
          <MessageRoundedDetail size="16px" />
          <span>Inquiry</span>
        </NavLink>
      </NavItem>

      <Accordion
        title={"Accounts"}
        hcolor="#fff"
        icon={<AccountBox size="16px" />}
        fs="14px"
      >
        <NavLink to="/zeadmin/user" activeClassName="navlink-active">
          <span>
            <AccountCircle size="16px" style={styles.ml} />
            Clients
          </span>
        </NavLink>
      </Accordion>

      {(employeeAuth.role === "ADMIN" || employeeAuth.level >= 3) && (
        <>
          {/* CMS ACCORDION */}
          <Accordion
            title={"Content Manangement"}
            icon={<BookContent size="16px" />}
            hcolor="#fff"
            fs="14px"
          >
            <NavLink to="/zeadmin/cms_brand" activeClassName="navlink-active">
              <span>
                <ZEssenceLogo
                  style={{
                    width: "25px",
                    height: "25px",

                    marginRight: "5px",
                  }}
                  className="zbrand"
                />
                Brand
              </span>
            </NavLink>
            <NavLink to="/zeadmin/cms_home" activeClassName="navlink-active">
              <span>
                <BookContent size="16px" style={styles.ml} />
                Home
              </span>
            </NavLink>
            <NavLink to="/zeadmin/cms_about" activeClassName="navlink-active">
              <span>
                <ShortText size="16px" style={styles.ml} />
                About
              </span>
            </NavLink>
            <NavLink to="/zeadmin/cms_gallery" activeClassName="navlink-active">
              <span>
                <Gallery size="16px" style={styles.ml} />
                Gallery
              </span>
            </NavLink>
            <NavLink
              to="/zeadmin/cms_testimonial"
              activeClassName="navlink-active"
            >
              <span>
                <MessageSquare size="16px" style={styles.ml} />
                Testimonials
              </span>
            </NavLink>
            <NavLink to="/zeadmin/cms_contact" activeClassName="navlink-active">
              <span>
                <MapAlt size="16px" style={styles.ml} />
                Contact
              </span>
            </NavLink>
            <NavLink
              to="/zeadmin/cms_promotion"
              activeClassName="navlink-active"
            >
              <span>
                <Advertisement size="16px" style={styles.ml} />
                Promotion
              </span>
            </NavLink>
          </Accordion>
        </>
      )}
      {/* FILE ACCORDION */}
      <Accordion
        title={"File Maintenance"}
        icon={<FileDirectory size="16px" />}
        hcolor="#fff"
        fs="14px"
      >
        <NavLink to="/zeadmin/categories" activeClassName="navlink-active">
          <span>
            <Service size="16px" style={styles.ml} />
            Services
          </span>
        </NavLink>
        <NavLink to="/zeadmin/employees" activeClassName="navlink-active">
          <span>
            <Profile size="16px" style={styles.ml} />
            Employees
          </span>
        </NavLink>
        {(employeeAuth.role === "ADMIN" || employeeAuth.level >= 3) && (
          <NavLink to="/zeadmin/archives" activeClassName="navlink-active">
            <span style={{ display: "flex", alignItems: "center" }}>
              <Archive size="16px" style={styles.ml} />
              Archive
            </span>
          </NavLink>
        )}
      </Accordion>

      <NavItem>
        <NavLink to="/zeadmin/report">
          <Report size="16px" style={styles.ml} />
          <span>File Report</span>
        </NavLink>
      </NavItem>
    </SideNavLayout>
  );
};

const styles = {
  ml: {
    marginRight: "5px",
  },
};

export default SideNav;
