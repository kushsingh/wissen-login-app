import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../Assets/Images/wissen-logo.png";
import { STATIC_CONTENT } from "../../../utils/constant";
import Button from "../../Atoms/Buttn";

import "./header.scss";

const Header = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/")
    window.location.reload();
  }


  return (
    <>
      <header className="p-2 bg-dark header">
        <div class="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <img className="d-flex align-items-center mb-2 mb-lg-0" src={Logo} alt={STATIC_CONTENT.NAME} height="32" />
            
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <Link to="/" className="nav-link px-2 text-secondary">Dashboard</Link>
              </li>
            </ul>

            <div className="text-end">
              <Button type="button" className="btn btn-outline-light" onClick={handleLogout}>{ STATIC_CONTENT.LOGOUT }</Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
