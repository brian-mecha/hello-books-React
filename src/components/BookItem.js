import React from "react";
import { Link } from "react-router-dom";
import { Auth } from "../utils/auth";

import PropTypes from 'prop-types';

export const BookItem = ({book}) => (
  <div className="card">
    <div className="card-body">
      <div className="row">
        <div className="col-md-12">
          <h5 className="card-title">{book.title}</h5>
          <span className="author">by {book.author}</span>
          <p className="card-text">{book.description.substr(0, 120)}</p>
          <Link
            to={"book/view/" + book.book_id}
            className="card-link text-warning"
          >
            Details <i className="fa fa-angle-right" />
          </Link>
          {Auth.loggedIn ? (
            <div className="float-right">
              <Link
                to={"book/edit/" + book.book_id}
                className="btn btn-info card-link"
              >
                {" "}
                <i className="fa fa-edit" /> Edit
              </Link>

              <Link
                to="/"
                className="btn btn-danger bt-sm card-link"
                onClick={() => this.delete(book.book_id)}
              >
                {" "}
                <i className="fa fa-trash" />
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  </div>
);

BookItem.propTypes = {
    book: PropTypes.object
  };
