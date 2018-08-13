import React from "react";
import PropTypes from "prop-types";
import { BeatLoader } from "react-spinners";
import Menus from "../Menus";
import { getSingleBookData, borrowBook } from "../../utils/api";
import { Auth } from "../../utils/auth";
import PageNotFound from "../PageNotFound";

export default class ViewBook extends React.Component {
  //  Initializes an empty book state
  constructor() {
    super();
    this.state = {
      book: [],
      isBorrowing: false,
      isFound: true
    };
  }

  // Gets a book with the specified ID from the API

  componentDidMount() {
    const bookID = this.props.match.params.id;
    this.getOneBook(bookID);
  }

  getOneBook(id) {
    getSingleBookData(id).then(book => {
      this.setState({ book });
      if (this.state.book.status) {
        this.setState({ isFound: false });
      }
    });
  }

  // Allows User to borrow a book
  borrow = id => {
    this.setState({ isBorrowing: true });
    borrowBook(id)
      .then(rep => {
        this.props.history.push("/profile");
      })
      .catch(err => {
        this.setState({ isBorrowing: false, error: true, message: err.message });
      });
  };

  render() {
    const { book, isBorrowing, isFound } = this.state;

    if (isBorrowing) {
      return <BeatLoader color={"#fec108"} />;
    }
    if (!isFound) {
      return <PageNotFound />;
    }

    // Displays the book with the specifed ID
    return (
      <div>
        <Menus />
        <div className="container book_details">
          <br />

          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <h2 className="card-title">{book.title}</h2>
                  <span className="author">
                    by <span className="text-muted">{book.author}</span>
                  </span>
                  <br />
                  <table className="table">
                    <tbody>
                      <tr>
                        <th scope="row">Status</th>
                        <td>
                          {book.availability ? (
                            <strong className="text-success">Available</strong>
                          ) : (
                            <strong className="text-warning">
                              Not Available
                            </strong>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Description</th>
                        <td>{book.description}</td>
                      </tr>
                    </tbody>
                  </table>

                  {book.availability && Auth.loggedIn ? (
                    <button
                      className="btn btn-warning card-link"
                      disabled={isBorrowing}
                      onClick={() => this.borrow(book.book_id)}
                    >
                      Borrow book <i className="fa fa-angle-right fa-" />
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ViewBook.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
};
