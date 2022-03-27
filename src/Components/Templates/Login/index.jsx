import { useState } from "react";
import PropTypes from 'prop-types';

import Button from "../../Atoms/Buttn";
import Logo from "../../../Assets/Images/wissen-logo.png";

import { FetchWrapper } from "../../../Services/api.service";

import { LOGIN_URLS } from "../../../utils/api_resource";
import { STATIC_CONTENT, ERROR_MESSAGE } from "../../../utils/constant";

import './login.scss';

const LoginTemplate = ({ setToken }) => {
  const [loading, setLoading] = useState(false)
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(null);

  const [showRequiredMessage, setShowRequiredMessage] = useState(false);
  
  // toggle password to show & hide password 
  const togglePassword = (e) => {
    e.preventDefault();
    if ( passwordType === 'password' ) {
      setPasswordType('text')
      return;
    }
    setPasswordType('password')  
  }

  // handle check box
  const handleClick = () => {
    setChecked(!checked)
  }

  // submit credentials to login
  const submitLoginForm = (e) => {
    e.preventDefault();
    //todo - Not able showRequiredMessage = false
    //(! showRequiredMessage) && setShowRequiredMessage(false);

    const credentials = { email: emailInput, password: passwordInput }

    if ( emailInput && passwordInput ) {
      if (showRequiredMessage ) setError(error);
      setError(null);
      setLoading(true);

      // empty form field
      setEmailInput("");
      setPasswordInput("");

      FetchWrapper.post(LOGIN_URLS, credentials)
        .then(response => {
          setToken(response);
        })
        .catch(error  => {
          setLoading(false);
          if (error === '') setError(ERROR_MESSAGE.GETTING_ERROR_FROM_SERVER);
          else setError(ERROR_MESSAGE.GETTING_ERROR_FROM_SERVER);
        });
    } else {
      (! showRequiredMessage) && setShowRequiredMessage(true);
      return false;
    }
  }

  return (
    <>
      <main className="login-container">
        <form  className="form-signin" onSubmit={submitLoginForm}>
          <h1 className="h3 fw-normal"><img src={Logo} alt={STATIC_CONTENT.NAME} height="72" /></h1>
          <p className="mt-2 mb-5 strong">{STATIC_CONTENT.LOGIN_MESSAGE}</p>

          <div className="form-floating">
            <input
              type={STATIC_CONTENT.EMAIL}
              className="form-control"
              autoComplete="off"
              placeholder={STATIC_CONTENT.EMAIL_PLACEHOLDER}
              value={emailInput}
              onChange={e => setEmailInput(e.target.value)}
              data-testid= "email-input"
            />
            <label htmlFor="floatingInput">{STATIC_CONTENT.EMAIL}</label>
          </div>

          <div className="form-floating mb-4">
            <input
              type={passwordType}
              className="form-control"
              autoComplete="off"
              placeholder={STATIC_CONTENT.PASSWORD}
              value={passwordInput}
              onChange={e => setPasswordInput(e.target.value)}
              data-testid= "password-input"
            />
            <label htmlFor="floatingPassword">{STATIC_CONTENT.PASSWORD}</label>
            <button className="btn toggle-btn" onClick={togglePassword}>
              { passwordType === "password" ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill"></i> }
            </button>
          </div>

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" onClick={handleClick} checked={checked} readOnly /> 
              <span>By creating or logging into an account, you are agreeing with our <strong>{STATIC_CONTENT.TEARMS_CONNDITIONS}</strong> and <strong>{STATIC_CONTENT.PRIVACY_POLICY}</strong>.</span>
            </label>
          </div>

          {/* Button is stateless componenet*/}
          { ! loading ? 
            <Button type="submit" className="w-100 btn btn-lg btn-primary" >{STATIC_CONTENT.SIGN_IN}</Button> : 
            loading && <Button className="w-100 btn btn-lg btn-primary" disabled={loading}>{STATIC_CONTENT.SIGNING}</Button> 
          }

          { error && <p className="mt-2 mb-1 text-center error-msg">{error}</p> }
          { showRequiredMessage ? <p className="mt-2 mb-1 text-center error-msg">{ERROR_MESSAGE.REQUIRED_FIELDS}</p> : null }
          { emailInput && ! (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(emailInput)) && <p className="mt-2 mb-1 text-center strong f-text error-msg" data-testid="error-msg">{ERROR_MESSAGE.INVALID_EMAIL}</p> }
          { passwordInput && ! (/^([a-z])+$/.test(passwordInput)) && <p className="mt-2 mb-1 text-center error-msg" data-testid="error-msg">{ERROR_MESSAGE.INVALID_PASSWORD}</p> }

          <p className="mt-4 mb-3 text-center strong f-text">{STATIC_CONTENT.SIGNIN_SSO}</p>
        </form>
      </main>
    </>
  );
};

LoginTemplate.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default LoginTemplate;
