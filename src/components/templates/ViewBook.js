import React from "react";
import Menus from "../Menus";
import { getSingleBookData, borrowBook } from "../../utils/api";
import { Auth } from "../../utils/auth";

export default class ViewBook extends React.Component {
  //  Initializes an empty book state
  constructor() {
    super();
    this.state = { book: [] };
  }

  // Gets a book with the specified ID from the API
  getOneBook(id) {
    getSingleBookData(id).then(book => {
      this.setState({ book });
    });
  }

  componentDidMount() {
    const bookID = this.props.match.params.id;
    this.getOneBook(bookID);
  }

  // Allows User to borrow a book
  borrow = id => {
    borrowBook(id)
      .then(rep => {
        this.props.history.push("/profile");
      })
      .catch(err => {
        this.setState({ error: true, message: err.message });
      });
  };

  render() {
    const { book } = this.state;

    // Displays the book with the specifed ID
    return (
      <div>
        <Menus />
        <div className="container">
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
                        // to={"/users/book/" + book.book_id}
                        className="btn btn-warning card-link"
                        onClick={() => this.borrow(book.book_id)}
                      >
                        Borrow book <i className="fa fa-angle-right" />
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
