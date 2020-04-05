import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Route, Redirect } from "react-router-dom";
import toaster from "toasted-notes";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { employeeAuth } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props =>
        employeeAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/zeadmin/signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export const UserPrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    toaster.notify("You must login first to continue");
  }
  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};
