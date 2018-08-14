import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import BorrowingHistory from "./BorrowingHistory";
import Register from "./Register";
import Profile from "./templates/Profile";
import AddBook from "./templates/AddBook";
import EditBook from "./templates/EditBook";
import ViewBook from "./templates/ViewBook";
import { PrivateRoute } from "../utils/auth";
import PageNotFound from "./PageNotFound";
import Landing from "./Landing";

class Navigation extends React.Component {
  render() {
    // Handles all the routes in the application
    return (
      <div id="nav">
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/books" component={Home} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/history" component={BorrowingHistory} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/book/add" component={AddBook} />
            <PrivateRoute path="/book/edit/:id" component={EditBook} />
            <Route path="/book/view/:id" component={ViewBook} />
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Navigation;
