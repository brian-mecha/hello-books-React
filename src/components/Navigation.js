import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import BorrowingHistory from "./BorrowingHistory";
import Register from "./Register";
import Profile from "./templates/Profile";
import AddBook from "./templates/AddBook";
import EditBook from "./templates/EditBook";
import ViewBook from "./templates/ViewBook";

class Navigation extends React.Component {
  // Protected routes
  requireAuth(replace) {
    if(!localStorage.getItem('token'))
      // pseudocode - SYNCHRONOUS function (cannot be async without extra callback parameter to this function)
      replace("/login");
  }

  // Unprotected routes
  verifyAuth(replace) {
    if(localStorage.getItem('token'))
      // pseudocode - SYNCHRONOUS function (cannot be async without extra callback parameter to this function)
      replace("/");
  }

  render() {
    return (
      <div>
        <Router>
          <Fragment>
            <Route exact path="/" component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/login" component={Login} />
            <Route path="/history" component={BorrowingHistory} onEnter={this.requireAuth}/>
            <Route path="/register" component={Register} />
            <Route path="/book/add" component={AddBook} />
            <Route path="/book/edit/:id" component={EditBook} />
            <Route path="/book/view/:id" component={ViewBook} />
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default Navigation;
