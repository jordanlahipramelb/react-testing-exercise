import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

test("it renders without crashing", () => {
  render(<Carousel />);
});

test("it matches screenshot", () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).not.toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();
});

test("goes to previous image when clicked", () => {
  const { getByTestId, queryByAltText } = render(<Carousel />);

  // move forward in the carousel
  const rightArrow = getByTestId("right-arrow");
  fireEvent.click(rightArrow);
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();

  // move backward in the carousel
  const leftArrow = getByTestId("left-arrow");
  fireEvent.click(leftArrow);
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
});

test("arrows are hidden appropriately", () => {
  const { getByTestId } = render(<Carousel />);
  const leftArrow = getByTestId("left-arrow");
  const rightArrow = getByTestId("right-arrow");

  // @start; expect left arrow to be missing and right arrow to be displayed
  expect(leftArrow).toHaveClass("hidden");
  expect(rightArrow).not.toHaveClass("hidden");

  // move forward to the next card
  fireEvent.click(rightArrow);
  // expect both arrows to be displayed
  expect(leftArrow).not.toHaveClass("hidden");
  expect(rightArrow).not.toHaveClass("hidden");

  // move forward to the next card
  fireEvent.click(rightArrow);

  // @end; expect left arrow to be displayed and right arrow to be missing
  expect(leftArrow).not.toHaveClass("hidden");
  expect(rightArrow).toHaveClass("hidden");
});
