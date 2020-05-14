import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import PrintProvider, { NoPrint } from "react-easy-print";
import { AdminAuthRoute } from "../util/AuthRoute";
import { PrivateRoute } from "../util/PrivateRoute";

import Dashboard from "./admin/Dashboard";
import Appointments from "./admin/Appointments";
import AppointmentDetails from "./admin/AppointmentDetails";
import NewAppointment from "./admin/NewAppointment";
import Employees from "./admin/Employees";
import Employee from "./admin/Employee";
import Categories from "./admin/Categories";
import Category from "./admin/Category";
import Service from "./admin/Service";
import Inquiry from "./admin/Inquiry";
import PersonalAccount from "./admin/PersonalAccount";
import User from "./admin/User";
import UserInfo from "./admin/UserInfo";
import Signin from "./admin/Signin";
import FileReport from "./admin/FileReport";
import Home from "./admin/cms/Home";
import About from "./admin/cms/About";
import Testimonial from "./admin/cms/Testimonial";
import Gallery from "./admin/cms/Gallery";
import Album from "./admin/cms/Album";
import Page404 from "../pages/Page404";

const Admin = () => {
  return (
    <PrintProvider>
      <NoPrint>
        <Switch>
          <AdminAuthRoute path="/zeadmin/signin" component={Signin} exact />

          <PrivateRoute exact path="/zeadmin/dashboard" component={Dashboard} />
          <Redirect from="/zeadmin" to="/zeadmin/dashboard" exact />
          <PrivateRoute
            exact
            path="/zeadmin/appointment/:_id"
            component={AppointmentDetails}
          />
          <PrivateRoute
            exact
            path="/zeadmin/appointments"
            component={Appointments}
          />
          <PrivateRoute
            exact
            path="/zeadmin/paccount"
            component={PersonalAccount}
          />
          <PrivateRoute exact path="/zeadmin/user" component={User} />
          <PrivateRoute
            exact
            path="/zeadmin/userInfo/:_id"
            component={UserInfo}
          />
          <PrivateRoute exact path="/zeadmin/inquiry" component={Inquiry} />
          <PrivateRoute
            exact
            path="/zeadmin/new_appointment"
            component={NewAppointment}
          />

          <PrivateRoute exact path="/zeadmin/employees" component={Employees} />
          <PrivateRoute
            exact
            path="/zeadmin/employee/:_id"
            component={Employee}
          />
          <PrivateRoute
            exact
            path="/zeadmin/categories"
            component={Categories}
          />
          <PrivateRoute
            exact
            path="/zeadmin/category/:_id"
            component={Category}
          />
          <PrivateRoute
            exact
            path="/zeadmin/service/:_id"
            component={Service}
          />
          <PrivateRoute exact path="/zeadmin/cms_home" component={Home} />
          <PrivateRoute exact path="/zeadmin/cms_about" component={About} />
          <PrivateRoute exact path="/zeadmin/cms_gallery" component={Gallery} />
          <PrivateRoute exact path="/zeadmin/album/:_id" component={Album} />
          <PrivateRoute
            exact
            path="/zeadmin/cms_testimonial"
            component={Testimonial}
          />
          <PrivateRoute exact path="/zeadmin/report" component={FileReport} />
          <Route component={Page404} />
        </Switch>
      </NoPrint>
    </PrintProvider>
  );
};

export default Admin;
