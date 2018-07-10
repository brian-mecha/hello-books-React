import React from "react";
import Menus from "../Menus";
import { addBook } from "../../utils/api";

export default class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      author: "",
      error: false
    };
  }
  handleChange = e => {
    let state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  };
  add = e => {
    e.preventDefault();
    addBook(this.state)
      .then(rep => {
        console.log(this.state);
        this.setState({ error: false, message: rep.message });
      })
      .catch(err => {
        console.log(this.state);
        this.setState({ error: true, message: err.message });
      });
  };

  render() {
    return (
      <div>
        <Menus />
        <div className="container">
          <div className="block-header">
            <h2 className="mt-5">Add New Book</h2>
          </div>

          <hr />
          <br />

          <div className="card">
            <div className="card-body">
              <form method="post" onSubmit={this.add}>
                {this.state.message && (
                  <div
                    className={
                      this.state.error
                        ? "alert alert-success alert-dismissible fade show"
                        : "alert alert-danger alert-dismissible fade show"
                    }
                    role="alert"
                  >
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                    {this.state.message}
                  </div>
                )}
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Title</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      placeholder="Book Title"
                      onChange={this.handleChange}
                      value={this.state.title}
                      // required
                      autoFocus
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
                      rows="3"
                      placeholder="Book Description"
                      onChange={this.handleChange}
                      value={this.state.description}
                      // required
                      autoFocus
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
                      placeholder="Book Author"
                      onChange={this.handleChange}
                      value={this.state.author}
                      // required
                      autoFocus
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-info mb-2">
                  <i className="fa fa-save" /> Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
