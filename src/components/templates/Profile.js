import React from "react";
import Menus from "../Menus";
import { Link } from "react-router-dom";

export default class Profile extends React.Component {
  render() {
    return (
      <div>
        <Menus />
        <div className="container">
          <div className="block-header">
            <h2 className="mt-5">Profile</h2>
          </div>
          <hr />
          <br />

          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <tbody>
                    <tr>
                      <th scope="row">Username</th>
                      <td>Brian Mecha</td>
                    </tr>
                    <tr>
                      <th scope="row">Email</th>
                      <td>brian@example.com</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

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
                    <tr>
                      <th>GIT ESSENTIALS</th>
                      <td>Katherine Njine</td>
                      <td>23-06-2018</td>
                      <td>30-06-2018</td>
                      <td>
                        <a href="" className="btn btn-sm btn-warning">
                          Return <i className="icon-angle-right" />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th>GIT ESSENTIALS</th>
                      <td>Katherine Njine</td>
                      <td>23-06-2018</td>
                      <td>30-06-2018</td>
                      <td>
                        <a href="" className="btn btn-sm btn-warning">
                          Return <i className="icon-angle-right" />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th>GIT ESSENTIALS</th>
                      <td>Katherine Njine</td>
                      <td>23-06-2018</td>
                      <td>30-06-2018</td>
                      <td>
                        <a href="" className="btn btn-sm btn-warning">
                          Return <i className="icon-angle-right" />
                        </a>
                      </td>
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
