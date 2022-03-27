import { render, screen, cleanup } from "@testing-library/react";
import LoginPage from "../index";
afterEach(cleanup);

const setToken = jest.mock('./../../../../Services/auth.useToken.js', () => ({ 
  setToken: jest.fn()
}));

it("should render email input field components", () => {
  render(<LoginPage setToken={() => setToken}/>);

  const emailInputElement = screen.getByTestId("email-input");
  expect(emailInputElement).toBeInTheDocument();
  expect(emailInputElement).toHaveAttribute("type", "email");
});


it("should render password input field components", () => {
  render(<LoginPage setToken={() => setToken}/>);

  const passwordInputElement = screen.getByTestId("password-input");
  expect(passwordInputElement).toBeInTheDocument();
  expect(passwordInputElement).toHaveAttribute("type", "password");
});