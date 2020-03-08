import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Navigation from "../components/main/navigation/Navigation";
import Home from "./main/Home";
import About from "./main/About";
import Signup from "./main/Signup";
import Signin from "./main/Signin";
import Appointment from "./main/Appointment";
import Gallery from "./main/Gallery";
import Contact from "./main/Contact";
import Services from "./main/Services";
import ThankYou from "./main/ThankYou";
import VerifyNotice from "./main/VerifyNotice";
import MyAccount from "./main/MyAccount";
import Account from "./main/Account";
import { UserAuthRoute } from "../util/AuthRoute";
import { UserPrivateRoute } from "../util/PrivateRoute";
import Footer from "../components/main/footer/Footer";
import Page404 from "./Page404";
import AppointmentDetails from "./main/AppointmentDetails";

function Main({ match }) {
  const [open, setOpen] = useState(false);

  return (
    <Router>
      <Navigation open={open} setOpen={setOpen} />

      <Switch>
        <Route path={`${match.path}/`} render={() => <Home />} exact />
        <Route path={`${match.path}/about`} component={About} exact />
        <Route path={`${match.path}/contact`} component={Contact} exact />
        <Route
          path={`${match.path}/verified/:emailToken`}
          component={ThankYou}
          exact
        />
        <UserPrivateRoute
          path={`${match.path}/verifynotice`}
          component={VerifyNotice}
          exact
        />
        <UserAuthRoute path={`${match.path}/signup`} component={Signup} exact />
        <UserAuthRoute path={`${match.path}/login`} component={Signin} exact />
        {/* <UserPrivateRoute
          path={`${match.path}/myaccount/:_id`}
          component={MyAccount}
          exact
        /> */}
        <UserPrivateRoute path={`${match.path}/account/:_id`} component={Account} exact />
        
        <UserPrivateRoute
          path={`${match.path}/myappointment/:_id`}
          component={AppointmentDetails}
          exact
        />
        <UserPrivateRoute
          path={`${match.path}/appointment`}
          component={Appointment}
          exact
        />
        <Route component={Page404} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default Main;
