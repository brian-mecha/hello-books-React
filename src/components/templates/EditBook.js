import React from "react";
import Menus from "../Menus";
import { getSingleBookData } from "../../utils/api";


export default class EditBook extends React.Component {
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
          <div className="block-header">
            <h2 className="mt-5">Edit Book</h2>
          </div>

          <hr />
          <br />

          <div className="card">
            <div className="card-body">
              <form action="#" method="post">
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Title</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={book.title}
                      placeholder="Book Title"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Description</label>
                  <div className="col-sm-10">
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      value={book.description}
                      rows="3"
                      placeholder="Book Description"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Author</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="author"
                      name="author"
                      value={book.author}
                      placeholder="Book Author"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-info mb-2">
                  <i className="fa fa-save" /> Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
