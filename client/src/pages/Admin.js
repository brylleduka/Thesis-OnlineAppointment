import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { AdminAuthRoute } from "../util/AuthRoute";
import { PrivateRoute } from "../util/PrivateRoute";

import Dashboard from "./admin/Dashboard";
import Appointments from "./admin/Appointments";
// import Appointment from "./admin/Appointment";
// import NewAppointment from "./admin/NewAppointment";
import Employees from "./admin/Employees";
import Employee from "./admin/Employee";
import Categories from "./admin/Categories";
import Category from "./admin/Category";
import Service from "./admin/Service";
import Signin from "./admin/Signin";
// import Home from "./admin/cms/Home";
import Page404 from "../pages/Page404";

const Admin = () => {
  return (
    <Router>
      <Switch>
        <Redirect from="/zeadmin" to="/zeadmin/signin" exact />
        <AdminAuthRoute path="/zeadmin/signin" component={Signin} exact />
        <PrivateRoute exact path="/zeadmin/dashboard" component={Dashboard} />
        {/* <PrivateRoute
          exact
          path="/zeadmin/appointment/:_id"
          component={Appointment}
        /> */}
        <PrivateRoute
          exact
          path="/zeadmin/appointments"
          component={Appointments}
        />
        {/* <PrivateRoute
          exact
          path="/zeadmin/newappointment"
          component={NewAppointment}
        /> */}

        <PrivateRoute exact path="/zeadmin/employees" component={Employees} />
        <PrivateRoute
          exact
          path="/zeadmin/employee/:_id"
          component={Employee}
        />
        <PrivateRoute exact path="/zeadmin/categories" component={Categories} />
        <PrivateRoute
          exact
          path="/zeadmin/category/:_id"
          component={Category}
        />
        <PrivateRoute exact path="/zeadmin/service/:_id" component={Service} />
        {/* <PrivateRoute exact path="/zeadmin/cms-home" component={Home} /> */}
        <Route component={Page404} />
      </Switch>
    </Router>
  );
};

export default Admin;
