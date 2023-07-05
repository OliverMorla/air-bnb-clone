import { Link } from "react-router-dom";
import "./style.scss";

interface Props {}

const Footer: React.FunctionComponent<Props> = () => {
  return (
    <footer>
      <ul className="left-section">
        <li>© 2023 Airbnb, Inc.</li>
        <li>
          <Link to={""}> Terms </Link>
        </li>
        <li>
          <Link to={""}> Sitemap </Link>
        </li>
        <li>
          <Link to={""}> Privacy </Link>
        </li>
        <li>
          <Link to={""}> Your Privacy Choices </Link>
        </li>
        <li>
          <Link to={""}> Destinations </Link>
        </li>
      </ul>
      <ul className="right-section">
        <li>
          <Link to={""}> English </Link>
        </li>
        <li>
          <Link to={""}> USD </Link>
        </li>
        <li>
          <Link to={""}> Support & Resources </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
