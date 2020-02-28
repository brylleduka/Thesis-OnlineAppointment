import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/auth";

export const AdminAuthRoute = ({ component: Component, ...rest }) => {
  const { employeeAuth } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        employeeAuth ? (
          <Redirect to="/zeadmin/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export const UserAuthRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        user ? <Redirect to="/zessence" /> : <Component {...props} />
      }
    />
  );
};
