import React, { Component } from "react";
import PropTypes from "prop-types";
import AuthService from "./AuthService";

export default function withAuth(AuthComponent) {
  const Auth = new AuthService(process.env.REACT_APP_base_url);

  return class AuthWrapped extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user: null
      };
    }

    componentWillMount() {
      if (!Auth.loggedIn()) {
        this.props.history.push("/login");
      } else {
        try {
          const profile = Auth.getProfile();
          this.setState({
            user: profile
          });
        } catch (err) {
          Auth.logout();
          this.props.history.replace("/login");
        }
      }
    }

    render() {
      if (this.state.user) {
        return (
          <AuthComponent history={this.props.history} user={this.state.user} />
        );
      } else {
        return null;
      }
    }
  };
}

withAuth.propTypes = {
  history: PropTypes.object
};
