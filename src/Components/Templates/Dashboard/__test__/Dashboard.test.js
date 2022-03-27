import { render, screen, cleanup } from "@testing-library/react";
import Dashboard from "../index";

afterEach(cleanup);

it("should render same text passed in dashboard as title props", () => {
  render(<Dashboard title="Welcome Dashboard" />);
  const headeingElement = screen.getByText(/welcome dashboard/i);
  expect(headeingElement).toBeInTheDocument();
});

it("should render same text passed in dashboard as paragraph props", () => {
  render(<Dashboard title="Quickly design and customize responsive" />);
  const paragraphElement = screen.getByText(
    /quickly design and customize responsive/i
  );
  expect(paragraphElement).toBeInTheDocument();
});
