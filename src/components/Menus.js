import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { LogoutUser } from "../utils/api";
import { Auth } from "../utils/auth";

export default class Menus extends React.Component {
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

  logout = e => {
    e.preventDefault();
    LogoutUser(this.state)
      .then(rep => {
        if (rep.status === "success") {
          this.setState({ error: false, message: rep.data.message });
          localStorage.removeItem("access_token", rep.data.access_token);
          Auth.signout();
          console.log(this.state);
        } else {
          this.setState({ error: true, message: rep.data.message });
          console.log(this.state);
        }
      })
      .catch(err => {
        this.setState({ error: true, message: err.data.message });
      });
  };

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Hello Books</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/profile/" className="nav-link">
                  Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/history/" className="nav-link">
                  History
                </NavLink>
              </NavItem>

              {Auth.isAuthenticated ? (
              <NavItem>
                <NavLink
                  to="/logout"
                  onClick={this.logout}
                  className="nav-link"
                >
                  Logout
                </NavLink>
              </NavItem>
              ) : (
              <NavItem>
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </NavItem>
              )}
              
              {Auth.isAuthenticated === false ? (
              <NavItem>
                <NavLink to="/register" className="nav-link">
                  Register
                </NavLink>
              </NavItem>
              ):null}
              
              <form className="form-inline my-2 my-lg-0">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-warning my-2 my-sm-0" type="submit">
                  <i className="fa fa-search" />
                </button>
              </form>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
