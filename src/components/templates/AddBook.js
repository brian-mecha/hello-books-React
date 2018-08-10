import React from "react";
import PropTypes from "prop-types";
import swal from 'sweetalert';
import Menus from "../Menus";
import { addBook } from "../../utils/api";

export default class AddBook extends React.Component {
  constructor(props) {
    super(props);
    // Initializes an empty input fileds for a new book
    this.state = {
      title: "",
      description: "",
      author: "",
      error: false
    };
  }

  // Handles any new change in the input fields
  handleChange = e => {
    let state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  // Creates a new book via the API and redirects back to home page
  add = e => {
    e.preventDefault();
    addBook(this.state)
      .then(rep => {
        if (rep.status === "success") {
          this.setState({ error: false, message: rep.data.message });
          swal(rep.data.message);
          this.props.history.push("/");
        } else {
          this.setState({ error: true, message: rep.data.message });
        }
      })
      .catch(err => {
        this.setState({ error: true, message: err.data.message });
      });
  };

  // Renders the form to add a new book
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
                      this.state.error ?
                        "alert alert-danger alert-dismissible fade show" :
                        "alert alert-success alert-dismissible fade show"
                    }
                    role="alert"
                  >
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

AddBook.propTypes = {
  history: PropTypes.object
};
