import React from "react";
import Menus from "../Menus";

export default class ViewBook extends React.Component {
  render() {
    return (
      <div>
        <Menus />
        <div className="container">
          <br />

          <div className="card">
            <div className="card-body">
              <div className="row">
                {/* <div className="col-md-6">
                  <div className="">
                    <img
                      className="img-thumbnail"
                      src="static/images/books/book.png"
                      alt="Card image"
                    />
                  </div>
                </div> */}
                <div className="col-md-12">
                  <h2 className="card-title">Book Title</h2>
                  <span className="author">by <span className="text-muted">Author Name</span></span>
                  <br />
                  <table className="table">
                    <tbody>
                      <tr>
                        <th scope="row">Status</th>
                        <td>
                          <strong className="text-success">Available</strong>
                          {/* TOO BE USED IF BOOK IS AVAILABLE */}
                          {/* <strong className="Text-warning">Not Available</strong> */}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Description</th>
                        <td>
                          With supporting text below as a natural lead-in to
                          additional content.With supporting text below as a
                          natural lead-in to additional content.With supporting
                          text below as a natural lead-in to additional content.
                          With supporting text below as a natural lead-in to
                          additional content.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <a href="/" className="btn btn-warning">
                    <i className="icon-ok-sign" /> Borrow
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
