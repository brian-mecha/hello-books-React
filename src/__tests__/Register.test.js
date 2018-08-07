import React from "react";
import { shallow, mount, render } from "enzyme";
import sinon from "sinon";
import Register from "../components/Register";
import moxios from "moxios";

// describe what we are testing
describe("Regsiter Component", () => {
  // make our assertion and what we expect to happen
  it("should render without throwing an error", () => {
    expect(
      shallow(<Register />)
        .find('form')
        .exists()
    ).toBe(true);
  });

  describe("Email input", () => {
    it("should respond to change event and change the state of the Register Component", () => {
      const wrapper = shallow(<Register />);
      wrapper
        .find('#email')
        .simulate('change', {
          target: { name: "email", value: "test@gmail.com" }
        });

      expect(wrapper.state("email")).toEqual("test@gmail.com");
    });
  });

  describe("Username input", () => {
    it("should respond to change event and change the state of the Register Component", () => {
      const wrapper = shallow(<Register />);
      wrapper
        .find('#name')
        .simulate('change', {
          target: { name: "username", value: "test" }
        });

      expect(wrapper.state("username")).toEqual("test");
    });
  });

  describe("Password input", () => {
    it("should respond to change event and change the state of the Register Component", () => {
      const wrapper = shallow(<Register />);
      wrapper
        .find("#password")
        .simulate("change", { target: { name: "password", value: "Password1." } });

      expect(wrapper.state("password")).toEqual("Password1.");
    });
  });

  xit('handles submit', () => {
    let register = sinon.spy();
    let wrapper = mount(<Register onSubmit={register} />);
    wrapper.find('form').simulate('submit');
    moxios.wait(() => {
    });
}); 
});
