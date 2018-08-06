import React from "react";
import { Switch, Link, BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import BorrowingHistory from "./BorrowingHistory";
import Register from "./Register";
import Profile from "./templates/Profile";
import AddBook from "./templates/AddBook";
import EditBook from "./templates/EditBook";
import ViewBook from "./templates/ViewBook";
import { PrivateRoute } from "../utils/auth";

class Navigation extends React.Component {
  render() {
    const NoMatch = ({ location }) => (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="error-template">
              <br />
              <br />
              <br />
              <h1>Oops!</h1>
              <h2>Page Not Found</h2>
              <div className="error-details">
                The requested page for <code>{location.pathname}</code> was not
                found!
              </div>
              <div className="error-actions">
                <Link to="/" className="btn btn-info btn-lg">
                <i className="fa fa-home" /> Back to Homepage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/history" component={BorrowingHistory} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/book/add" component={AddBook} />
            <PrivateRoute path="/book/edit/:id" component={EditBook} />
            <Route path="/book/view/:id" component={ViewBook} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Navigation;
