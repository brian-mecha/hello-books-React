import React from "react";
import { Link } from "react-router-dom";
import { getBooksData, deleteBook } from "../../utils/api";
import { Auth } from "../../utils/auth";
import Pagination from "react-js-pagination";
import Search from "../Search";

class Books extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      activePage: 1
    };
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  getAllBooks() {
    getBooksData().then(books => {
      this.setState({ books });
    });
  }

  searchBooks(query) {
    let all_books = this.state.books.filter((book) => {
      return book.title.includes(query) ||
      book.description.includes(query) ||
      book.author.includes(query)
    });
    console.log(all_books)
    this.setState({books: all_books})
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
    const { books } = this.state;

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

        <Search searchBooks={this.searchBooks.bind(this)} />

        {books.map((book, index) => (
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
                        // to={"book/" + book.book_id}
                        className="btn btn-danger card-link"
                        onClick={() => this.delete(book.book_id)}
                      >
                        {" "}
                        <i className="fa fa-trash" /> Delete
                      </button>
                      {/* <a href={"book/" + book.book_id} className="btn btn-danger card-link" onClick={() => this.delete(book.book_id)}>
                      <i className="fa fa-trash" /> Delete
                    </a> */}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}

        <nav aria-label="...">
          <ul className="pagination">
            <li className="page-item">
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={3}
                totalItemsCount={450}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange}
              />
            </li>
          </ul>
        </nav>

        {/* <nav aria-label="...">
          <ul className="pagination">
            <li className="page-item disabled">
              <a className="page-link" href="" tabIndex="-1">
                Previous
              </a>
            </li>
            <li className="page-item active">
              <a className="page-link" href="">
                1 <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="">
                Next
              </a>
            </li>
          </ul>
        </nav> */}
      </div>
    );
  }
}

export default Books;
