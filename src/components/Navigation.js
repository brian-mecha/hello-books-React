import React from 'react';
import NavDropdown from './NavDropdown';

const NavItem = props => {
    const pageURI = window.location.pathname+window.location.search
    const liClassName = (props.path === pageURI) ? "nav-item active" : "nav-item";
    const aClassName = props.disabled ? "nav-link disabled" : "nav-link"
    return (
      <li className={liClassName}>
        <a href={props.path} className={aClassName}>
          {props.name}
          {(props.path === pageURI) ? (<span className="sr-only">(current)</span>) : ''}
        </a>
      </li>
    );
  }

class Navigation extends React.Component {
    render() {
        return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div class="container">
                <a class="navbar-brand" href="/">Hello-Books</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    <NavItem path="/" name="Home" />
                    <NavItem path="/profile" name="Profile" />
                    <NavItem path="/history" name="History" />
                    <NavItem path="/register" name="Register" />
                    <NavItem path="/login" name="Login" />
                    
                    <NavDropdown name="Dropdown">
                        <a className="dropdown-item" href="/">Action</a>
                        <a className="dropdown-item" href="/">Another action</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="/">Logout</a>
                    </NavDropdown>
                </ul>
                {/* <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button class="btn btn-warning my-2 my-sm-0" type="submit"><i class="icon-search"></i></button>
                    </form> */}
                </div>
            </div>
        </nav>
        )
    }
}

export default Navigation