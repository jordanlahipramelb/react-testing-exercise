import React from "react";
import Card from "./Card";
import { render, fireEvent } from "@testing-library/react";

test("it renders without crashing", () => {
  render(<Card />);
});

test("it matches snapshot", () => {
  const { asFragment } = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
});
