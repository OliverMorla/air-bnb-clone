import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBars, faGlobe } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "./dropdown";
import "./style.scss";

interface Props {}

const Header: React.FunctionComponent<Props> = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <header>
      <nav>
        <figure>
          <img
            src="/assets/logos/airbnb-logo.png"
            alt="airbnb-logo"
            className="airbnb-logo"
          />
        </figure>
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
        {open && <Dropdown />}
      </nav>
    </header>
  );
};

export default Header;
