import React from "react";
import { NavLink } from "react-router-dom";
import { Dashboard } from "styled-icons/material/Dashboard";
import { BookContent } from "styled-icons/boxicons-solid/BookContent";
// import { CalendarEvent } from "styled-icons/boxicons-regular/CalendarEvent";
import { Service } from "styled-icons/remix-line/Service";
import { MessageSquare } from "@styled-icons/boxicons-solid/MessageSquare";
import { ShortText } from "@styled-icons/material/ShortText";
import { AccountBox } from "@styled-icons/material/AccountBox";
import { AccountCircle } from "@styled-icons/material/AccountCircle";
import { MessageRoundedDetail } from "@styled-icons/boxicons-solid/MessageRoundedDetail";
import { FileDirectory } from "@styled-icons/octicons/FileDirectory";
import { Profile } from "@styled-icons/icomoon/Profile";
import { Report } from "@styled-icons/boxicons-solid/Report";
import { SideNavLayout } from "../../styled/layout";
import { NavItem } from "../../styled/utils";

import Accordion from "../../Accordion";

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
          <BookContent size="16px" />
          <span>Appointments</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/zeadmin/inquiry">
          <MessageRoundedDetail size="16px" />
          <span>Inquiry</span>
        </NavLink>
      </NavItem>

      <Accordion title={"Accounts"} icon={<AccountBox size="16px" />} fs="14px">
        <NavLink to="/zeadmin/user" activeClassName="navlink-active">
          <span>
            <AccountCircle size="16px" />
            Users
          </span>
        </NavLink>
      </Accordion>

      <Accordion
        title={"Content Manangement"}
        icon={<BookContent size="16px" />}
        fs="14px"
      >
        <NavLink to="/zeadmin/cms_home" activeClassName="navlink-active">
          <span>
            <BookContent size="16px" />
            Home
          </span>
        </NavLink>
        <NavLink to="/zeadmin/cms_about" activeClassName="navlink-active">
          <span>
            <ShortText size="16px" />
            About
          </span>
        </NavLink>
        <NavLink to="/zeadmin/cms_testimonial" activeClassName="navlink-active">
          <span>
            <MessageSquare size="16px" />
            Testimonials
          </span>
        </NavLink>
        <NavLink to="/zeadmin/contact" activeClassName="navlink-active">
          <span>
            <Dashboard size="16px" />
            Contact
          </span>
        </NavLink>
      </Accordion>
      <Accordion
        title={"File Maintenance"}
        icon={<FileDirectory size="16px" />}
        fs="14px"
      >
        <NavLink to="/zeadmin/categories" activeClassName="navlink-active">
          <span>
            <Service size="16px" />
            Services
          </span>
        </NavLink>
        <NavLink to="/zeadmin/employees" activeClassName="navlink-active">
          <span>
            <Profile size="16px" />
            Employees
          </span>
        </NavLink>
      </Accordion>
      <NavItem>
        <NavLink to="/zeadmin/report">
          <Report size="16px" />
          <span>File Report</span>
        </NavLink>
      </NavItem>
    </SideNavLayout>
  );
};

export default SideNav;
