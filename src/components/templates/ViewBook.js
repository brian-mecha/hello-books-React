import React from "react";
import { Link } from "react-router-dom";
import Menus from "../Menus";
import { getSingleBookData, borrowBook, returnBook } from "../../utils/api";
import { Auth } from "../../utils/auth";

export default class ViewBook extends React.Component {
  constructor() {
    super();
    this.state = { book: [] };
  }

  getOneBook(id) {
    getSingleBookData(id).then(book => {
      this.setState({ book });
    });
  }

  componentDidMount() {
    // console.log(this.props.match.params.id)
    const bookID = this.props.match.params.id;
    this.getOneBook(bookID);
  }

  borrow = id => {
    borrowBook(id)
      .then(rep => {
        this.setState({ error: false, message: rep.message });
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({ error: true, message: err.message });
      });
  };

  return = id => {
    returnBook(id)
      .then(rep => {
        this.setState({ error: false, message: rep.message });
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({ error: true, message: err.message });
      });
  };

  render() {
    const { book } = this.state;

    var Button;
    if (Auth.isAuthenticated) {
      Button = (
        <Link
          to={"/users/book/" + book.book_id}
          className="btn btn-warning card-link"
          onClick={() => this.borrow(book.book_id)}
        >
          Borrow book <i className="fa fa-angle-right" />
        </Link>
      );
    } 

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

                  {book.availability ? (
                    <div>
                    {Button}
                    </div>
                 ) : null }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
