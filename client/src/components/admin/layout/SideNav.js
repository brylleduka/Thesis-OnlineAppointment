import React from "react";
import { NavLink } from "react-router-dom";
import {
  BookContent,
  Report,
  MessageSquare,
  MessageRoundedDetail,
  CalendarEvent,
} from "@styled-icons/boxicons-solid";

import { Gallery, Service } from "@styled-icons/remix-fill";

import {
  ShortText,
  AccountBox,
  AccountCircle,
  Dashboard,
} from "@styled-icons/material";
import { FileDirectory } from "@styled-icons/octicons";
import { Profile } from "@styled-icons/icomoon/Profile";
import { Archive } from "@styled-icons/entypo";

import { SideNavLayout } from "../../styled/layout";
import { NavItem } from "../../styled/utils";

import Accordion from "../../Accordion";
import { IconWrap } from "../../styled/utils";

const SideNav = () => {
  return (
    <SideNavLayout>
      <NavItem>
        <NavLink to="/zeadmin/dashboard">
          <Dashboard size="16px" />
          <span>Dashboard</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/zeadmin/appointments">
          <CalendarEvent size="16px" />
          <span>Appointments</span>
        </NavLink>
      </NavItem>
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
            Users
          </span>
        </NavLink>
      </Accordion>

      <Accordion
        title={"Content Manangement"}
        icon={<BookContent size="16px" />}
        hcolor="#fff"
        fs="14px"
      >
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
        <NavLink to="/zeadmin/cms_testimonial" activeClassName="navlink-active">
          <span>
            <MessageSquare size="16px" style={styles.ml} />
            Testimonials
          </span>
        </NavLink>
        <NavLink to="/zeadmin/contact" activeClassName="navlink-active">
          <span>
            <Dashboard size="16px" style={styles.ml} />
            Contact
          </span>
        </NavLink>
      </Accordion>
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
        <NavLink to="/zeadmin/archives" activeClassName="navlink-active">
          <span style={{ display: "flex", alignItems: "center" }}>
            <Archive size="16px" style={styles.ml} />
            Archive
          </span>
        </NavLink>
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
