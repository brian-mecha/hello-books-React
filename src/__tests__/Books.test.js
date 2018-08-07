import React from "react";
import { shallow, mount, render } from "enzyme";
import Books from "../components/templates/Books";
import Header from "../components/Header";
import sinon from "sinon";
import moxios from "moxios";

// describe what we are testing
describe("Books Component", () => {
  // make our assertion and what we expect to happen
  xit('searches all the books', () => {
    let term = sinon.spy();
    let searchingFor = sinon.spy();
    let wrapper = mount(<Books onChange={searchingFor(term)} />);
    wrapper.find('#searchpoint').simulate('change');
    moxios.wait();
  });

  it("should render the Menus", () => {
    // let Header = sinon.spy();
    expect(
      shallow(<Header />)
        .find('.header')
        .exists()
    )
    // console.log(shallow(<Header />).debug());
  });
});
