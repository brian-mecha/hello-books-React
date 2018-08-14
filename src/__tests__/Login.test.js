import React from "react";
import { shallow, mount } from "enzyme";
import moxios from 'moxios';
import sinon from 'sinon';
import { BrowserRouter } from "react-router-dom";
import Login from "../components/Login";

// describe what we are testing
describe("Login Component", () => {
  // make our assertion and what we expect to happen
  it("should render without throwing an error", () => {
    expect(
      shallow(<Login />)
        .find("form")
        .exists()
    ).toBe(true);
  });

  describe("Email input", () => {
    it("should respond to change event and change the state of the Login Component", () => {
      const wrapper = shallow(<Login />);
      wrapper
        .find("#email")
        .simulate("change", {
          target: { name: "email", value: "test@gmail.com" }
        });

      expect(wrapper.state("email")).toEqual("test@gmail.com");
    });
  });

  describe("Password input", () => {
    it("should respond to change event and change the state of the Login Component", () => {
      const wrapper = shallow(<Login />);
      wrapper
        .find("#password")
        .simulate("change", { target: { name: "password", value: "cats" } });

      expect(wrapper.state("password")).toEqual("cats");
    });
  });

  xdescribe("Book submits form to login a user", () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });
    it("handles submit when logging in a user", () => {
      let handleFormSubmit = sinon.spy();
      let wrapper = mount(
        <BrowserRouter>
          <Login onSubmit={handleFormSubmit} />
        </BrowserRouter>
      );
      // wrapper.find("form").simulate("submit");
      wrapper.find("form").simulate("submit", {
        target: { name: "email", value: "test@gmail.com" }
      });
      moxios.wait();
    });
  });
});
