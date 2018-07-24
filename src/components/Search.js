import React from "react";

class Search extends React.Component {
  handleSearch(event) {
    // console.log(event.target.value)
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
          onKeyDown={this.handleSearch.bind(this)}
          tabIndex="0"
        />
      </div>
    );
  }
}

export default Search;
