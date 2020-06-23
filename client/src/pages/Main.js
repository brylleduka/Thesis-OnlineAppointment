import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "../components/main/navigation/Navigation";
import Home from "./main/Home";
import About from "./main/About";
import Signup from "./main/Signup";
import Signin from "./main/Signin";
import Appointment from "./main/Appointment";
import Gallery from "./main/Gallery";
import Album from "./main/Album";
import Contact from "./main/Contact";
import Testimonials from "./main/Testimonials";
import Services from "./main/Services";
import Service from "./main/Service";
// import ThankYou from "./main/ThankYou";
import AppointmentThankYou from "./main/AppointmentThankYou";
import AccountCreated from "./main/account/AccountCreated";
import AccountVerification from "./main/account/AccountVerification";
import Account from "./main/account/Account";
import AccountResetPwd from "./main/account/AccountResetPwd";
import Terms from "./main/Terms";
import { UserAuthRoute } from "../util/AuthRoute";
import { UserPrivateRoute } from "../util/PrivateRoute";
import Footer from "../components/main/footer/Footer";
import Page404 from "./Page404";
import AppointmentDetails from "./main/AppointmentDetails";

function Main({ match }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Navigation open={open} setOpen={setOpen} />

      <Switch>
        <Route path={`/`} component={Home} exact />
        <Route path={`/about`} component={About} exact />
        <Route path={`/contact`} component={Contact} exact />
        <Route path={`/gallery`} component={Gallery} exact />

        <Route path={`/album/:_id`} component={Album} exact />
        <Route path={`/testimonials`} component={Testimonials} exact />
        <Route path={`/services&rates`} component={Services} exact />
        <Route path={`/service/:_id`} component={Service} exact />
        {/* <Route path={`/verified/:emailToken`} component={ThankYou} exact /> */}

        <Route path={`/terms&conditions`} component={Terms} exact />
        <Route
          path={`/account_created/:_id`}
          component={AccountCreated}
          exact
        />
        <Route
          path={`/account_verification/:emailToken`}
          component={AccountVerification}
          exact
        />

        <Route
          path={`/account_reset_password/:emailToken`}
          component={AccountResetPwd}
          exact
        />
        <UserPrivateRoute
          path={`/appointment_thankyou`}
          component={AppointmentThankYou}
          exact
        />
        <UserAuthRoute path={`/signup`} component={Signup} exact />
        <UserAuthRoute path={`/login`} component={Signin} exact />

        <UserPrivateRoute path={`/account/:_id`} component={Account} exact />

        <UserPrivateRoute
          path={`/myappointment/:_id`}
          component={AppointmentDetails}
          exact
        />
        <UserPrivateRoute path={`/appointment`} component={Appointment} exact />
        <Route component={Page404} />
      </Switch>
      <Footer />
    </>
  );
}

export default Main;
