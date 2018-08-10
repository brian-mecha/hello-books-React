import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const PageNotFound = ({ location }) => (
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
            The resource you are looking for was not
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

export default PageNotFound;

PageNotFound.propTypes = {
  location: PropTypes.object,
};
