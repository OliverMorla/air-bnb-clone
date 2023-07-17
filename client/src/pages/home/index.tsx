import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./style.scss";

const Home: React.FunctionComponent = () => {
  const fadeEffects = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  };

  return (
    <motion.main
      className="home-wrapper"
      variants={fadeEffects}
      initial="hidden"
      animate="visible"
    >
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
    </motion.main>
  );
};

export default Home;
