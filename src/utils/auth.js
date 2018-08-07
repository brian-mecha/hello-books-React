import React from "react";
import { Redirect, Route } from "react-router-dom";
import AuthService from './../components/AuthService';
export const Auth = new AuthService();

// Protects private routes ro only bre accessed by authenticated users
export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.loggedIn ? (
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
