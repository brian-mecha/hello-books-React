import React from 'react';
import Menus from '../Menus';
import { getSingleBookData } from '../../utils/api';

export default class ViewBook extends React.Component {
  constructor() {
    super();
    this.state = { book: [] };
  }

  getOneBook(id) {
    getSingleBookData(id).then(book => {
      this.setState({ book });
    });
  }

  componentDidMount() {
    // console.log(this.props.match.params.id)
    const bookID = this.props.match.params.id;
    this.getOneBook(bookID);
  }

  render() {
    const { book } = this.state;

    return (
      <div>
        <Menus />
        <div className="container">
          <br />

          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <h2 className="card-title">{book.title}</h2>
                  <span className="author">
                    by <span className="text-muted">{book.author}</span>
                  </span>
                  <br />
                  <table className="table">
                    <tbody>
                      <tr>
                        <th scope="row">Status</th>
                        <td>
                          {book.availability ? (
                            <strong className="text-success">Available</strong>
                          ) : (
                            <strong className="text-warning">
                              Not Available
                            </strong>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Description</th>
                        <td>{book.description}</td>
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
