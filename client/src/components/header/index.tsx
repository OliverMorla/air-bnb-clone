import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faGlobe,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from "./dropdown";
import Login from "../login";
import Register from "../register";
import "./style.scss";

interface Props {}

const Header: React.FunctionComponent<Props> = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [openRegister, setOpenRegister] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    setOpenLogin(false);
    setOpenRegister(false);
  }, [location.pathname]);

  return (
    <header>
      <nav>
        <figure>
          <Link to={"/"}>
            <picture>
              <source
                srcSet="/assets/logos/logo.png"
                media="(max-width: 1100px)"
              />
              <img
                src="/assets/logos/airbnb-logo.png"
                alt="airbnb-logo"
                className="airbnb-logo"
              />
            </picture>
          </Link>
        </figure>
        <section className="search-wrapper">
          <span>Anywhere</span>
          <span>Any Week</span>
          <span>Add Guest</span>
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
        </section>
        <section className="right-section">
          <div className="options-wrapper">
            <p>Airbnb your home</p>
            <FontAwesomeIcon icon={faGlobe} className="globe-image" />
          </div>
          <section className="menu-wrapper" onClick={() => setOpen(!open)}>
            <FontAwesomeIcon icon={faBars} className="menu-bars" />
            <FontAwesomeIcon icon={faUser} className="user-image" />
          </section>
        </section>
        {open && (
          <Dropdown
            setOpenLogin={setOpenLogin}
            setOpenRegister={setOpenRegister}
            openLogin={openLogin}
            openRegister={openRegister}
          />
        )}
      </nav>
      {openLogin && (
        <div className="auth-wrapper">
          <Login
            setOpenLogin={setOpenLogin}
            setOpenRegister={setOpenRegister}
          />
        </div>
      )}
      {openRegister && (
        <div className="auth-wrapper">
          <Register
            setOpenRegister={setOpenRegister}
            setOpenLogin={setOpenLogin}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
