import React from "react";

class Search extends React.Component {
  handleSearch(event) {
    this.props.searchBooks(event.target.value)
  }

  render() {
    return (
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search Book..."
          onKeyUp={this.handleSearch.bind(this)}
          tabIndex="0"
        />
      </div>
    );
  }
}

export default Search;
