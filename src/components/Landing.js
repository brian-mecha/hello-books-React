import React from "react";
import Menus from "./Menus";

export default class Books extends React.Component {
  render() {
    return (
      <div>
        <Menus />
        <header className="masthead d-flex">
          <div className="container text-center my-auto">
            <h1 className="mb-1">Hello Books</h1>
            <h3 className="mb-5">
              <em>A Library Management System.</em>
            </h3>
            <a className="btn btn-warning btn-xl js-scroll-trigger" href="/books">
              View Books <i className="fa fa-angle-right" />
            </a>
          </div>
          <div className="overlay" />
        </header>
      </div>
    );
  }
}
