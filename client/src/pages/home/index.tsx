import { Link } from "react-router-dom";
import "./style.scss";

const Home: React.FunctionComponent = () => {
  return (
    <main className="home-wrapper">
      <figure>
        <img
          src="/assets/photo-grid.png"
          alt="photo-grid.png"
          className="photo-grid"
        />
        <figcaption className="image-caption">Online Experiences</figcaption>
        <p className="description">
          Join unique interactive activities lead by one-of-a-kind hosts-all
          without leaving home.
        </p>
        <Link to={"explore"}>
          <button className="explore-btn">Explore</button>
        </Link>
      </figure>
    </main>
  );
};

export default Home;
