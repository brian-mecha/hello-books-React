import React from "react";
import Menus from "./Menus";
import { borrowingHistory } from "../utils/api";

class BorrowingHistory extends React.Component {
  //  Initializes an empty history state
  constructor() {
    super();
    this.state = { history: [] };
  }

  componentDidMount() {
    this.getBorrowingHistory();
  }

  // Gets all the borrowing history of the logged in user from the API
  getBorrowingHistory() {
    borrowingHistory().then(history => {
      this.setState({ history });
    });
  }

  // Renders the Borrowing history of the logged in user
  render() {
    const { history } = this.state;
    if (!history) {
      return null;
    }

    if (!history.length) {
      return (
        <div>
          <Menus />
          <div className="container">
            <div className="col-lg-12 text-left">
              <h2 className="mt-5">Borrowing History</h2>
            </div>
            <hr />
            <br />

            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">
                  You do not have any borrowing history
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
          <div className="container history">
            <div className="col-lg-12 text-left">
              <h2 className="mt-5">Borrowing History</h2>
            </div>

            <hr />
            <br />

            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table  table-hover" id="history">
                    <thead className="thead-custom">
                      <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Date Borrowed</th>
                        <th>Due Date</th>
                        <th>Date returned</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((hist, index) => (
                        <tr key={index}>
                          <th>{hist.book_title}</th>
                          <td>{hist.book_author}</td>
                          <td>{hist.date_borrowed}</td>
                          <td>{hist.due_date}</td>
                          {hist.returned ? (
                            <td>{hist.returned_date}</td>
                          ) : (
                            <td className="text-center">-</td>
                          )}

                          {hist.returned === false ? (
                            <td className="text-warning">UN-RETURNED</td>
                          ) : (
                            <td className="text-success">RETURNED</td>
                          )}
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
}

export default BorrowingHistory;
