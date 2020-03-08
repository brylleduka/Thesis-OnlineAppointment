import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Dashboard } from "styled-icons/material/Dashboard";
import { BookContent } from "styled-icons/boxicons-solid/BookContent";
import { CalendarEvent } from "styled-icons/boxicons-regular/CalendarEvent";
import { Service } from "styled-icons/remix-line/Service";
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
          <CalendarEvent size="16px" />
          <span>Appointments</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/zeadmin/inquiry">
          <Dashboard size="16px" />
          <span>Inquiry</span>
        </NavLink>
      </NavItem>

      <Accordion
        title={"Accounts"}
        icon={<BookContent size="16px" />}
        fs="14px"
      >
        <NavLink to="/zeadmin/user" activeClassName="navlink-active">
          <span>
            <Service size="16px" />
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
            <Dashboard size="16px" />
            Home
          </span>
        </NavLink>
        <NavLink to="/zeadmin/about" activeClassName="navlink-active">
          <span>
            <Dashboard size="16px" />
            About Us
          </span>
        </NavLink>
        <NavLink to="/zeadmin/testimonials" activeClassName="navlink-active">
          <span>
            <Dashboard size="16px" />
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
        icon={<BookContent size="16px" />}
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
            <Service size="16px" />
            Employees
          </span>
        </NavLink>
      </Accordion>
      <NavItem>
        <NavLink to="/zeadmin/report">
          <Dashboard size="16px" />
          <span>File Report</span>
        </NavLink>
      </NavItem>
    </SideNavLayout>
  );
};

export default SideNav;
