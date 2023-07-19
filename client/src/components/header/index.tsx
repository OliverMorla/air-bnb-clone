import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    fetch("http://localhost:5174/auth/login/success", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <header>
      <nav>
        <figure>
          <Link to={"/"}>
            <img
              src="/assets/logos/airbnb-logo.png"
              alt="airbnb-logo"
              className="airbnb-logo"
            />
          </Link>
        </figure>
        <section className="search-wrapper">
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
