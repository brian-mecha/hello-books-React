import React from 'react';
import { Link } from 'react-router-dom';
import { getBooksData } from '../../utils/api';

class Books extends React.Component {
  constructor() {
    super();
    this.state = { books: [] };
  }

  getAllBooks() {
    getBooksData().then(books => {
      this.setState({ books });
    });
  }

  componentDidMount() {
    this.getAllBooks();
  }

  render() {
    const { books } = this.state;

    return (
      <div className="container">
        <div className="block-header">
          <div className="btn-toolbar float-right">
            <Link to="book/add" className="btn btn-warning card-link">
              <i className="fa fa-plus" /> Add Book
            </Link>
          </div>

          <h2 className="mt-5">Books</h2>
        </div>

        <hr />
        <br />

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
                  <div className="float-right">
                    <Link
                      to={"book/edit/" + book.book_id}
                      className="btn btn-info card-link"
                    >
                      {" "}
                      <i className="fa fa-edit" /> Edit
                    </Link>
                    <a href="" className="btn btn-danger card-link">
                      <i className="fa fa-trash" /> Delete
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12">
                <h5 className="card-title">Book Title</h5>
                <span className="author">by Author Name</span>
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <Link to="book/view/100" className="btn btn-warning card-link">
                  Details <i className="fa fa-angle-right" />
                </Link>
                <div className="float-right">
                  <Link to="book/edit/100" className="btn btn-info card-link">
                    {" "}
                    <i className="fa fa-edit" /> Edit
                  </Link>
                  <a href="" className="btn btn-danger card-link">
                    <i className="fa fa-trash" /> Delete
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav aria-label="...">
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
        </nav>
      </div>
    );
  }
}

export default Books;
