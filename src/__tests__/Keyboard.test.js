import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import KeyboardMediaBar from "../ParentBar"

describe("KeyboardMediaBar", () => {
  const handleMediaUri = jest.fn();

  test("renders correctly with default props", () => {
    const { getByTestId } = render(<KeyboardMediaBar />);
    expect(getByTestId("keyboard-media-bar")).toBeTruthy();
  });

  test("calls uri callback when media is selected", () => {
    const { getByTestId } = render(<KeyboardMediaBar uri={handleMediaUri} />);
    fireEvent.press(getByTestId("pick-media-button"));
    expect(handleMediaUri).toHaveBeenCalled();
  });

  test("toggles recording bar", () => {
    const { getByTestId } = render(<KeyboardMediaBar />);
    fireEvent.press(getByTestId("toggle-recording-button"));
    expect(getByTestId("recording-bar")).toBeTruthy();
  });
});

//test cases:
//check the border props
//check the icon props
//check the no-recording mode
//check it properly returns the URI