import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Menus from "../Menus";
import { unreturnedBooks, returnBook } from "../../utils/api";

export default class Profile extends React.Component {
  // Initializes an empty state unreturned
  constructor() {
    super();
    this.state = {
      unreturned: [],
      isReturning: false
    };
  }

  componentDidMount() {
    this.getUnreturnedBooks();
  }

  // Gets all books not returned by the User
  getUnreturnedBooks() {
    unreturnedBooks().then(unreturned => {
      this.setState({ unreturned });
    });
  }

  // Returns a book borrowed by the User
  return = id => {
    this.setState({ isReturning: true });
    returnBook(id)
      .then(rep => {
        this.setState({ error: false, message: rep.message });
        swal(rep.message);
        this.props.history.push("/books");
      })
      .catch(err => {
        this.setState({ error: true, message: err.message });
      });
  };

  // Renders all books unreturned by user
  render() {
    const { unreturned, isReturning } = this.state;
    if (!unreturned) {
      return null;
    }

    if (!unreturned.length) {
      return (
        <div>
          <Menus />
          <div className="container profile">
            <div className="col-lg-12 text-left">
              <div className="btn-toolbar float-right">
                <a href="/history" className="btn btn-warning card-link">
                  Borrowing History <i className="fa fa-angle-right" />
                </a>
              </div>

              <h2 className="mt-5">Un-Returned Books</h2>
            </div>
            <hr />
            <br />

            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">
                  Yaay🎊🕺🏻! <br />
                  You do not have any unreturned Books
                </h5>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
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
                  {unreturned ? (
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
                              <button
                                className="btn btn-warning card-link"
                                disabled={isReturning}
                                onClick={() => this.return(data.book_id)}
                              >
                                Return book
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // return (
    //   <div>
    //     <Menus />
    //     <div className="container">
    //       <div className="col-lg-12 text-left">
    //         <div className="btn-toolbar float-right">
    //           <Link to="/history" className="btn btn-warning card-link">
    //             Borrowing History <i className="fa fa-angle-right" />
    //           </Link>
    //         </div>

    //         <h2 className="mt-5">Un-Returned Books</h2>
    //       </div>
    //       <hr />
    //       <br />

    //       <div className="card">
    //         <div className="card-body">
    //           <div className="table-responsive">
    //             {unreturned ? (
    //               <table
    //                 className="table table-striped table-hover "
    //                 id="unreturnedBooks"
    //               >
    //                 <thead className="thead-custom">
    //                   <tr>
    //                     <th>Title</th>
    //                     <th>Author</th>
    //                     <th>Date Borrowed</th>
    //                     <th>Date Due</th>
    //                     <th>Return</th>
    //                   </tr>
    //                 </thead>
    //                 <tbody>
    //                   {unreturned.map((data, index) => (
    //                     <tr key={index}>
    //                       <th>{data.book_title}</th>
    //                       <td>{data.book_author}</td>
    //                       <td>{data.date_borrowed}</td>
    //                       <td>{data.due_date}</td>
    //                       <td>
    //                         <button
    //                           className="btn btn-warning card-link"
    //                           onClick={() => this.return(data.book_id)}
    //                         >
    //                           Return book
    //                         </button>
    //                       </td>
    //                     </tr>
    //                   ))}
    //                 </tbody>
    //               </table>
    //             ) : null}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // );
  }
}

Profile.propTypes = {
  history: PropTypes.object
};
