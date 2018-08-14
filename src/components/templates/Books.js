import React from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { getBooksData, deleteBook } from "../../utils/api";
import { Auth } from "../../utils/auth";

function searchingFor(term) {
  return function (b) {
    return (
      b.title.toLowerCase().includes(term.toLowerCase()) ||
      b.author.toLowerCase().includes(term.toLowerCase()) ||
      b.description.toLowerCase().includes(term.toLowerCase()) ||
      !term
    );
  };
}

class Books extends React.Component {
  // Initializes empty states: books to hold all books and term to hold the key words used to search the books state
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      term: "",
      isDeleting: false
    };

    // Initializes the search functionality
    this.searchHandler = this.searchHandler.bind(this);
  }

  componentDidMount() {
    this.getAllBooks();
  }

  // Handles the search functionality on each key stroke
  searchHandler(event) {
    this.setState({ term: event.target.value });
  }

  // Gets all books from thr API
  getAllBooks() {
    getBooksData().then(books => {
      this.setState({ books });
    });
  }

  // Deletes the selected book
  delete = id => {
    this.setState({ isDeleting: true });
    deleteBook(id)
      .then(rep => {
        this.setState({ error: false, message: rep.message, isDeleting: false });
        swal(rep.message);
        this.getAllBooks();
      })
      .catch(err => {
        this.setState({ error: true, message: err.message, isDeleting: false });
      });
  };

  // Renders all the books from the API
  render() {
    const { books, term, isDeleting } = this.state;

    if (!books) {
      return null;
    }

    if (!books.length) {
      return (
        <div>
          <div className="container">
            <div className="block-header">
              {Auth.checkIfAdmin === true ? (
                <div className="btn-toolbar float-right">
                  <a href="book/add" className="btn btn-warning card-link">
                    <i className="fa fa-plus" /> Add Book
                  </a>
                </div>
              ) : null}

              <h2 className="mt-5">Books</h2>
            </div>
            <hr />
            <br />

            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">
                  No Books are available in the system currently.
                </h5>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="block-header">
            {Auth.ifAdmin() === "true" ? (
              <div className="btn-toolbar float-right">
                <Link to="book/add" className="btn btn-warning card-link">
                  <i className="fa fa-plus" /> Add Book
                </Link>
              </div>
            ) : null}

            <h2 className="mt-5">Books</h2>
          </div>

          <hr />
          <br />
          {this.state.message && (
            <div
              className={
                this.state.error
                  ? "alert alert-danger alert-dismissible fade show"
                  : "alert alert-success alert-dismissible fade show"
              }
              role="alert"
            >
              {this.state.message}
            </div>
          )}

          <div className="input-group mb-4">
            <input
              id="searchpoint"
              type="text"
              className="form-control"
              placeholder="Search Book..."
              onChange={this.searchHandler}
            />
          </div>
          <div className="card-columns">
            {books.filter(searchingFor(term)).map((book, index) => (
              <div className="card" key={index}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <h5 className="card-title">{book.title}</h5>
                      <span className="author">by {book.author}</span>
                      <p className="card-text">
                        {book.description.substr(0, 120)}
                      </p>
                      <a
                        href={`book/view/${book.book_id}`}
                        className="card-link text-warning"
                      >
                        Details <i className="fa fa-angle-right" />
                      </a>
                      {Auth.ifAdmin() === "true" ? (
                        <div className="float-right">
                          <a
                            href={`book/edit/${book.book_id}`}
                            className="btn btn-info card-link"
                          >
                            {" "}
                            <i className="fa fa-edit" /> Edit
                          </a>

                          <button
                            className="btn btn-danger bt-sm card-link"
                            disabled={isDeleting}
                            onClick={() => this.delete(book.book_id)}
                          >
                            {" "}
                            <i className="fa fa-trash" />
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default Books;
