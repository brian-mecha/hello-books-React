import React from "react";
import { Redirect, Route } from "react-router-dom";


export const Auth = {
  isAuthenticated: false,
  authenticate() {
    this.isAuthenticated = true;
  },
  signout() {
    this.isAuthenticated = false;
  }
};

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isAuthenticated ? (
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