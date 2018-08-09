import React from "react";
import Menus from "../Menus";
import { Link } from "react-router-dom";
import { unreturnedBooks, returnBook } from "../../utils/api";
import swal from "sweetalert";

export default class Profile extends React.Component {
  // Initializes an empty state unreturned
  constructor() {
    super();
    this.state = { unreturned: [] };
  }

  // Gets all books not returned by the User
  getUnreturnedBooks() {
    unreturnedBooks().then(unreturned => {
      this.setState({ unreturned });
    });
  }

  componentDidMount() {
    this.getUnreturnedBooks();
  }

  // Returns a book borrowed by the User
  return = id => {
    returnBook(id)
      .then(rep => {
        this.setState({ error: false, message: rep.message });
        swal(rep.message);
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({ error: true, message: err.message });
      });
  };

  // Renders all books unreturned by user
  render() {
    const { unreturned } = this.state;
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
                <Link to="/history" className="btn btn-warning card-link">
                  Borrowing History <i className="fa fa-angle-right" />
                </Link>
              </div>

              <h2 className="mt-5">Un-Returned Books</h2>
            </div>
            <hr />
            <br />

            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Yaay🎊🕺🏻! <br/>You do not have any unreturned Books</h5>
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
