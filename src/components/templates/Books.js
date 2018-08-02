import React from "react";
import { Link } from "react-router-dom";
import { getBooksData, deleteBook } from "../../utils/api";
import { Auth } from "../../utils/auth";

function searchingFor(term) {
  return function(b) {
    return b.title.toLowerCase().includes(term.toLowerCase()) || 
    b.author.toLowerCase().includes(term.toLowerCase()) ||
    b.description.toLowerCase().includes(term.toLowerCase()) ||
    !term;
  }
}

class Books extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      term: '',
    };

    this.searchHandler = this.searchHandler.bind(this); 
  }

  searchHandler(event) {
    this.setState({ term: event.target.value })
  }

  getAllBooks() {
    getBooksData()
    .then(books => {
      this.setState({ books });
    });
  }

  componentDidMount() {
    this.getAllBooks();
  }

  delete = id => {
    deleteBook(id)
      .then(rep => {
        this.setState({ error: false, message: rep.message });
        // this.props.history.push("/");
      })
      .catch(err => {
        this.setState({ error: true, message: err.message });
      });
  };

  render() {
    const { books, term } = this.state;

    return (
      <div className="container">
        <div className="block-header">
          {Auth.isAuthenticated ? (
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
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            {this.state.message}
          </div>
        )}

        <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search Book..."
          onChange={this.searchHandler}
        />
      </div>

        {books.filter(searchingFor(term)).map((book, index) => (
          <div className="card" key={index}>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <h5 className="card-title">{book.title}</h5>
                  <span className="author">by {book.author}</span>
                  <p className="card-text">{book.description}</p>
                  <Link
                    to={"book/view/" + book.book_id}
                    className="btn btn-warning card-link"
                  >
                    Details <i className="fa fa-angle-right" />
                  </Link>
                  {Auth.isAuthenticated ? (
                    <div className="float-right">
                      <Link
                        to={"book/edit/" + book.book_id}
                        className="btn btn-info card-link"
                      >
                        {" "}
                        <i className="fa fa-edit" /> Edit
                      </Link>
                      
                      <button
                        className="btn btn-danger card-link"
                        onClick={() => this.delete(book.book_id)}
                      >
                        {" "}
                        <i className="fa fa-trash" /> Delete
                      </button>
                      
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
    );
  }
}

export default Books;
