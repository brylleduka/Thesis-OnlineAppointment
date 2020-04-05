import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "../components/main/navigation/Navigation";
import Home from "./main/Home";
import About from "./main/About";
import Signup from "./main/Signup";
import Signin from "./main/Signin";
import Appointment from "./main/Appointment";
import Gallery from "./main/Gallery";
import Contact from "./main/Contact";
import Testimonials from "./main/Testimonials";
import Services from "./main/Services";
import Service from "./main/Service";
import ThankYou from "./main/ThankYou";
import VerifyNotice from "./main/VerifyNotice";
import Account from "./main/Account";
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
        <Route path={`/testimonials`} component={Testimonials} exact />
        <Route path={`/services&rates`} component={Services} exact />
        <Route path={`/service/:_id`} component={Service} exact />
        <Route path={`/verified/:emailToken`} component={ThankYou} exact />
        <UserPrivateRoute
          path={`/verifynotice`}
          component={VerifyNotice}
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
