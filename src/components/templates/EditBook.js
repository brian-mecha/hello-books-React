import React from "react";
import Menus from "../Menus";
import { getSingleBookData, editBook } from "../../utils/api";
import swal from 'sweetalert';

export default class EditBook extends React.Component {
  constructor() {
    super();
    // Initializes an empty book state
    this.state = {
      title: "",
      description: "",
      author: ""
    };
  }

  // gets the book to be edited from the API and sets to state book
  getOneBook(id) {
    getSingleBookData(id).then(book => {
      this.setState({
        title: book.title,
        description: book.description,
        author: book.author
      });
    });
  }

  componentDidMount() {
    const bookID = this.props.match.params.id;
    this.getOneBook(bookID);
  }

  // handles amy change in any of the input fields
  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
    // console.log(this.state)
  };

  // Updates the book in the API
  update = () => {
    
    editBook(this.state, this.props.match.params.id)
      .then(rep => {
        if (rep.status === "success") {
          this.setState({ error: false, message: rep.data.message });
          swal(rep.data.message)
          // this.props.history.push("/book/edit/" + this.props.match.params.id)
          this.props.history.push("/")
        } else {
          this.setState({ error: true, message: rep.data.message });
        }
      })
      .catch(err => {
        // this.setState({ error: true, message: err.data.message });
      });
  };

  // Renders the form to edit the book
  render() {
    // const { book } = this.state;
    const id = this.props.match.params.id;

    return (
      <div>
        <Menus />
        <div className="container">
          <div className="block-header">
            <h2 className="mt-5">Edit Book</h2>
          </div>

          <hr />
          <br />
          {this.state.message && (
          <div
            className={
              this.state.error
                ? "alert alert-danger alert-dismissible fade show"
                : "alert alert-success alert-dismissible fade show"
            }
            role="alert"
          >
            {this.state.message}
          </div>
        )}

          <div className="card">
            <div className="card-body">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  this.update(id);
                }}
              >
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Title</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={this.state.title}
                      onChange={this.handleChange("title")}
                      placeholder={this.state.title}
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
                      onChange={this.handleChange("description")}
                      value={this.state.description}
                      rows="3"
                      placeholder={this.state.description}
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
                      onChange={this.handleChange("author")}
                      value={this.state.author}
                      placeholder={this.state.author}
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
