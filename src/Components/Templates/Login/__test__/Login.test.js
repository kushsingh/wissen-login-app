import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

it("should render email input field with correct inputs", () => {
  render(<LoginPage setToken={() => setToken}/>);
  const emailInputElement = screen.getByTestId("email-input");
  
  userEvent.type(emailInputElement, "test@test.com");
  expect(emailInputElement).toHaveValue("test@test.com");
  expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
});

it("email input field should have email label", () => {
  render(<LoginPage setToken={() => setToken}/>);

  const emailInputLabel = screen.getByText("Email");
  expect(emailInputLabel).toBeInTheDocument();
});

it("should render password input field components", () => {
  render(<LoginPage setToken={() => setToken}/>);

  const passwordInputElement = screen.getByTestId("password-input");
  expect(passwordInputElement).toBeInTheDocument();
  expect(passwordInputElement).toHaveAttribute("type", "password");
});

it("should render email input field with correct inputs", () => {
  render(<LoginPage setToken={() => setToken}/>);
  const passwordInputElement = screen.getByTestId("password-input");
  
  userEvent.type(passwordInputElement, "teattest");
  expect(passwordInputElement).toHaveValue("teattest");
  expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
});

it("password inputfield should have password label", () => {
  render(<LoginPage setToken={() => setToken}/>);

  const passInputLabel = screen.getByText("Password");
  expect(passInputLabel).toBeInTheDocument();
});


it("from should be submited if field has input value", () => {
  const handleSubmit = jest.fn();
  render(<LoginPage setToken={() => setToken} onSubmit={handleSubmit} />);

  const emailInputElement = screen.getByTestId("email-input");
  const passwordInputElement = screen.getByTestId("password-input");

  userEvent.type(emailInputElement, "test@text.com");
  userEvent.type(passwordInputElement, "teattest");

  fireEvent.submit(screen.getByTestId("login-form"));
  expect(handleSubmit).toHaveBeenCalled(1);
});

it("from should not be submited if field has empty input value", () => {
  const handleSubmit = jest.fn();
  render(<LoginPage setToken={() => setToken} onSubmit={handleSubmit} />);

  const emailInputElement = screen.getByTestId("email-input");
  const passwordInputElement = screen.getByTestId("password-input");

  userEvent.type(emailInputElement, "");
  userEvent.type(passwordInputElement, "");

  fireEvent.submit(screen.getByTestId("login-form"));
  expect(handleSubmit).not.toHaveBeenCalled();
});