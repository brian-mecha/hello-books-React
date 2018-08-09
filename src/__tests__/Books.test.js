import React from "react";
import { shallow, mount, render } from "enzyme";
import Books from "../components/templates/Books";
import Header from "../components/Header";
import sinon from "sinon";
import moxios from "moxios";
import AddBook from "../components/templates/AddBook";
import EditBook from "../components/templates/EditBook";
import { BrowserRouter } from "react-router-dom";
import Navigation from "../components/Navigation";
import Home from "../components/Home";
import Profile from "../components/templates/Profile";
import BorrowingHistory from "../components/BorrowingHistory";

describe("Books Component", () => {
  // Tests whether the Navbar is rendered
  it("should render the Navigation", () => {
    expect(
      shallow(<Navigation />)
        .find("#nav")
        .exists()
    ).toBe(true);
  });

  // Test whether the Header is rendered
  it("should render the Header", () => {
    expect(
      shallow(<Header />)
        .find(".header")
        .exists()
    ).toBe(true);
  });

  // Tests whether the header is rendered
  it("should render the Home page", () => {
    expect(
      shallow(<Home />)
        .find("#home")
        .exists()
    ).toBe(true);
  });

  // make our assertion and what we expect to happen
  xdescribe("Book author input", () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });
    it("searches all the books", () => {
      let term = sinon.spy();
      let searchHandler = sinon.spy();
      let wrapper = mount(
        <BrowserRouter>
          <Books onChange={searchHandler()} />
        </BrowserRouter>
      );
      wrapper.find("#searchpoint").simulate("change");
      moxios.wait();
    });
  });

  // Tests whether the form to add a new book show
  it("shows the form to add a book", () => {
    expect(
      shallow(<AddBook />)
        .find("form")
        .exists()
    ).toBe(true);
  });

  // AddBook Component
  describe("Book title input", () => {
    it("should respond to change event and change the state of the AddBook Component", () => {
      const wrapper = shallow(<AddBook />);
      wrapper.find("#title").simulate("change", {
        target: { name: "title", value: "Book title" }
      });

      expect(wrapper.state("title")).toEqual("Book title");
    });
  });

  describe("Book description input", () => {
    it("should respond to change event and change the state of the AddBook Component", () => {
      const wrapper = shallow(<AddBook />);
      wrapper.find("#description").simulate("change", {
        target: { name: "description", value: "Book description" }
      });
      expect(wrapper.state("description")).toEqual("Book description");
    });
  });

  describe("Book description input", () => {
    it("should respond to change event and change the state of the AddBook Component", () => {
      const wrapper = shallow(<AddBook />);
      wrapper.find("#description").simulate("change", {
        target: { name: "description", value: "Book description" }
      });
      expect(wrapper.state("description")).toEqual("Book description");
    });
  });

  describe("Book author input", () => {
    it("should respond to change event and change the state of the AddBook Component", () => {
      const wrapper = shallow(<AddBook />);
      wrapper.find("#author").simulate("change", {
        target: { name: "author", value: "Book author" }
      });

      expect(wrapper.state("author")).toEqual("Book author");
    });
  });

  describe("Book submits form to add a book", () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });
    it("handles submit when adding a new book", () => {
      let add = sinon.spy();
      let wrapper = mount(
        <BrowserRouter>
          <AddBook onSubmit={add} />
        </BrowserRouter>
      );
      wrapper.find("form").simulate("submit");
      moxios.wait(() => {});
    });
  });

  // EditBook Component
  describe("Book edit form", () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });
    it("shows the form to edit a book", () => {
      const bookID = {
        params: {
          id: 1
        }
      };
      expect(
        mount(
          <BrowserRouter>
            <EditBook match={bookID} />
          </BrowserRouter>
        )
          .find("form")
          .exists()
      ).toBe(true);
    });
  });

  describe("Book author input", () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it("should respond to change event and change the state of the EditBook Component", () => {
      const bookID = {
        params: {
          id: 1
        }
      };
      let handleChange = sinon.spy();
      const wrapper = mount(
        <BrowserRouter>
          <EditBook match={bookID} onChange={handleChange} />
        </BrowserRouter>
      );
      wrapper.find("#author").simulate("change", {
        target: { name: "author", value: "Book author" }
      });
      // expect(wrapper.find("#author")).toMatch("Book author");
      // moxios.wait();
    });
  });

  describe("Book edit from submit", () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it("should respond to change event and change the state of the EditBook Component", () => {
      const bookID = {
        params: {
          id: 1
        }
      };
      let update = sinon.spy();
      const wrapper = mount(
        <BrowserRouter>
          <EditBook match={bookID} onSubmit={update} />
        </BrowserRouter>
      );
      wrapper.find("#title").simulate("submit", {
        target: { name: "title", value: "Book title" }
      });
    });
  });

  describe("User profile", () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });
    it("should render the User profile", () => {
      expect(
        shallow(<Profile />)
          .find(".profile")
          .exists()
      ).toBe(true);
    });
  });

  describe("User borrowing history", () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });
    it("should render the user Borrowing history", () => {
      expect(
        shallow(<BorrowingHistory />)
          .find("#history")
          .exists()
      )
    });
  });

  // test("testing with headers", done => {
  //   var path = require("path");
  //   var lib = path.join(
  //     path.dirname(require.resolve("axios")),
  //     "lib/adapters/http"
  //   );
  //   var http = require(lib);
  //   axios
  //     .get("http://127.0.0.1:5000/api/v2/books", {
  //       adapter: http,
  //       headers: {
  //         Authorization: "Basic YWRtaW46bHVveGlueGlhbjkx"
  //       }
  //     })
  //     .then(res => {
  //       expect(res.status).toBe(200);
  //       done();
  //     })
  //     .catch(done.fail);
  // });
});
