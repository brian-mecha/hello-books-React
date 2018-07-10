import React from "react";
import Menus from "../Menus";
import { Link } from "react-router-dom";
import { unreturnedBooks } from "../../utils/api";

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = { unreturned: [] };
  }

  getUnreturnedBooks() {
    unreturnedBooks().then(unreturned => {
      this.setState({ unreturned });
    });
  }

  componentDidMount() {
    this.getUnreturnedBooks();
  }

  render() {
    const { unreturned } = this.state;

    return (
      <div>
        <Menus />
        <div className="container">
          <div className="col-lg-12 text-left">
            <div className="btn-toolbar float-right">
              <Link to="/history" className="btn btn-warning card-link">
                Borrowing History <i className="fa fa-angle-right" />
              </Link>
            </div>

            <h2 className="mt-5">Un-Returned Books</h2>
          </div>
          <hr />
          <br />

          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table
                  className="table table-striped table-hover "
                  id="unreturnedBooks"
                >
                  <thead className="thead-custom">
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Date Borrowed</th>
                      <th>Date Due</th>
                      <th>Return</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unreturned.map((data, index) => (
                      <tr key={index}>
                        <th>{data.book_title}</th>
                        <td>{data.book_author}</td>
                        <td>{data.date_borrowed}</td>
                        <td>{data.due_date}</td>
                        <td>
                          <a href="" className="btn btn-sm btn-warning">
                            Return <i className="icon-angle-right" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
