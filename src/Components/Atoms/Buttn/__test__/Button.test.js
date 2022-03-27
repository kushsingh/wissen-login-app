import { render, screen, cleanup } from "@testing-library/react";
import Button from "../index";

afterEach(cleanup);

it("should render the button by role", () => {
  render(<Button />);
  expect(screen.getByRole("button")).toBeEnabled();
});

it("should render name passed in button as title props", () => {
  const testMessage = "Test Message";

  render(<Button label={testMessage} />);
  expect(
    screen.getByRole("button", { label: testMessage })
  ).toBeInTheDocument();
});
