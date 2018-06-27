import React from "react";
import Menus from "./Menus";

class BorrowingHistory extends React.Component {
  render() {
    return (
      <div>
        <Menus />
        <div className="container">
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
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>GIT ESSENTIALS</th>
                      <td>Katherine Njine</td>
                      <td>23-06-2018</td>
                      <td>30-06-2018</td>
                      <td className="text-warning">UN-RETURNED</td>
                    </tr>
                    <tr>
                      <th>GIT ESSENTIALS</th>
                      <td>Katherine Njine</td>
                      <td>23-06-2018</td>
                      <td>30-06-2018</td>
                      <td>RETURNED</td>
                    </tr>
                    <tr>
                      <th>GIT ESSENTIALS</th>
                      <td>Katherine Njine</td>
                      <td>23-06-2018</td>
                      <td>30-06-2018</td>
                      <td>RETURNED</td>
                    </tr>
                    <tr>
                      <th>GIT ESSENTIALS</th>
                      <td>Katherine Njine</td>
                      <td>23-06-2018</td>
                      <td>30-06-2018</td>
                      <td className="text-warning">UN-RETURNED</td>
                    </tr>
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

export default BorrowingHistory;
