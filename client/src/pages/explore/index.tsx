import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faHeart,
  faStar,
} from "@fortawesome/free-regular-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useLoaderData } from "../room";
import Categories from "./categories";
import { getListing } from "@/routes/root";
import "./style.scss";

const Explore: React.FunctionComponent = (): JSX.Element => {
  window.scrollTo(0, 0);
  const records = useLoaderData<typeof getListing>();
  const [toggle, setToggle] = useState<boolean>(false);
  const baseScroll: number = 1000;
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScrollBtn = (): void => {
    scrollRef.current?.scrollTo({
      left: baseScroll <= scrollRef.current?.scrollLeft ? 2000 : 1000,
      behavior: "smooth",
    });
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    console.log(e.currentTarget.scrollLeft);
  };

  const fadeEffects = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  };

  return (
    <motion.main
      className="explore-wrapper"
      variants={fadeEffects}
      initial="hidden"
      animate="visible"
    >
      <section className="categories-wrapper">
        <div
          className="categories-scroll"
          ref={scrollRef}
          onScroll={handleScroll}
        >
          <Categories />
        </div>
        <FontAwesomeIcon
          icon={faArrowAltCircleRight}
          className="arrow-btn"
          onClick={handleScrollBtn}
        />
        <div className="filter-wrapper">
          <FontAwesomeIcon icon={faFilter} className="filter-icon" />
          <span> Filter </span>
        </div>
      </section>
      <div className="fee-btn-wrapper">
        <div className="wrapper">
          <p className="text">
            Display total price | <span> includes all fees, before taxes </span>
          </p>
          <div
            className="toggle-btn-w"
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            <div
              className="toggle-btn"
              style={toggle ? { transform: "translateX(18px)" } : {}}
            >
              {toggle && "✓"}
            </div>
          </div>
        </div>
      </div>
      <div className="listing-wrapper">
        {records.map((record) => (
          <Link to={`/explore/${record?.recordid}`} key={record?.recordid}>
            <div className="card">
              <img
                src={record?.fields.xl_picture_url || record?.fields.medium_url}
                alt="room-picture"
              />
              <FontAwesomeIcon icon={faHeart} className="heart-icon" />
              <div className="card-content">
                <p className="location">
                  {`${record.fields.host_neighbourhood}, ${record?.fields.city}`}
                  <span>
                    <FontAwesomeIcon icon={faStar} />
                    {record.fields.number_of_reviews}
                  </span>
                </p>
                <p className="room-type">
                  Room Type: {record.fields.room_type}
                </p>
                <p className="minimum-nights">
                  Minimum nights: {record.fields.minimum_nights}
                </p>
                <p className="price">
                  ${record.fields.price}
                  <span>night</span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </motion.main>
  );
};

export default Explore;
