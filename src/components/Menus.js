import React from "react";
import PropTypes from "prop-types";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";
import { NavLink, withRouter } from "react-router-dom";
import { LogoutUser } from "../utils/api";
import { Auth } from "../utils/auth";
import withAuth from "./withAuth";

class Menus extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogout() {
    Auth.logout();
    window.location.reload();
  }

  // Logouts the logged in user

  logout = e => {
    e.preventDefault();
    LogoutUser()
      .then(rep => {
        if (rep.status === "success") {
          // this.setState({ error: false, message: rep.data.message });
          localStorage.removeItem("access_token", rep.data.access_token);
          Auth.signout();
          this.props.history.push("/login");
        } else {
          this.setState({ error: true, message: rep.data.message });
        }
      })
      .catch(err => {
        this.setState({ error: true, message: err.data.message });
      });
  };

  // Renders the Application's Top Navbar

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md" id="Topbar">
          <NavbarBrand href="/">Hello Books</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <a href="/" className="nav-link">
                  Home
                </a>
              </NavItem>
              <NavItem>
                <a href="/books" className="nav-link">
                  Books
                </a>
              </NavItem>
              {Auth.loggedIn ? (
                <NavItem>
                  <a href="/profile/" className="nav-link">
                    Profile
                  </a>
                </NavItem>
              ) : null}
              {Auth.loggedIn ? (
                <NavItem>
                  <a href="/history/" className="nav-link">
                    History
                  </a>
                </NavItem>
              ) : null}

              {Auth.loggedIn ? (
                <NavItem>
                  <button
                    onClick={this.handleLogout}
                    className=" btn btn-warning"
                  >
                    Logout
                  </button>
                </NavItem>
              ) : (
                <NavItem>
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </NavItem>
              )}

              {!Auth.loggedIn ? (
                <NavItem>
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </NavItem>
              ) : null}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(withAuth(Menus));

Menus.propTypes = {
  history: PropTypes.object
};
