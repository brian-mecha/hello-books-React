import React from "react";
import Menus from "../Menus";
import { getSingleBookData, editBook } from "../../utils/api";


export default class EditBook extends React.Component {
  constructor() {
    super();
    // Initializes an empty book state
    this.state = { 
      book: [],
      // edited: {}
    };
  }
  
  // gets the book to be edited from the API and sets to state book
  getOneBook(id) {
    getSingleBookData(id).then(book => {
      this.setState({ book });
    });
  }

  componentDidMount() {
    const bookID = this.props.match.params.id;
    this.getOneBook(bookID);
    // this.props.getSingleBookData(bookID)
   
  }

  // handles amy change in any of the input fields
  handleChange = e => {
    let edited = {};
    edited[e.target.name] = e.target.value;
    this.setState(edited);
    // console.log(this.state)
  };
  
  // Updates the book in the API
  update = e => {
    e.preventDefault();
    editBook(this.edited)
      .then(rep => {
        if (rep.status === "success") {
          this.setState({ error: false, message: rep.data.message });
        } else {
          this.setState({ error: true, message: rep.data.message });
        }
      })
      .catch(err => {
        this.setState({ error: true, message: err.data.message });
      });
  };

  // Renders the form to edit the book
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
              <form method="put" onSubmit={() => this.update(book.book_id)}>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Title</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={book.title}
                      onChange={this.handleChange}
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
                      onChange={this.handleChange}
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
                      onChange={this.handleChange}
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
