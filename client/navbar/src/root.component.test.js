import React from "react";
import { render } from "@testing-library/react";
import { shallow } from "enzyme";
import Root from "./root.component";

describe("Navbar", () => {
  it("should be in the document", () => {
    const navbarWrapper = shallow(<Root />);
    expect(navbarWrapper).toBeInTheDocument();
  });
});
