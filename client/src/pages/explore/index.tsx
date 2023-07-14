import { useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faHeart,
  faStar,
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import Categories from "./categories";
import "./style.scss";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

interface RecordsProps {
  recordid: string;
  fields: {
    price: number;
    name: string;
    host_neighbourhood: string;
    city: string;
    xl_picture_url: string;
    medium_url: string;
    number_of_reviews: number;
    room_type: string;
    minimum_nights: number;
  };
}

const Explore = () => {
  window.scrollTo(0, 0);
  const records = useLoaderData() as Array<RecordsProps>;

  return (
    <main className="explore-wrapper">
      <section className="categories-wrapper">
        <div className="categories-scroll">
          <Categories />
        </div>
        <FontAwesomeIcon icon={faArrowAltCircleRight} className="arrow-btn" />
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
          <div className="toggle-btn-w">
            <div className="toggle-btn"></div>
          </div>
        </div>
      </div>
      <div className="listing-wrapper">
        {records.map((record) => (
          <Link
            to={`/explore/${record?.recordid}`}
            key={record?.recordid}
            target="_blank"
          >
            <div className="card">
              <img
                src={record?.fields.xl_picture_url || record?.fields.medium_url}
                alt=""
              />
              <FontAwesomeIcon icon={faHeart} className="heart-icon"/> 
              <div className="card-content">
                <p className="location">
                  {`${record.fields.host_neighbourhood}, ${record?.fields.city}`}
                  <span>
                    <FontAwesomeIcon icon={faStar} />
                    {record.fields.number_of_reviews}
                  </span>
                </p>
                <p className="room-type">
                  Room Type: {record.fields.room_type}{" "}
                </p>
                <p className="minimum-nights">
                  {" "}
                  Minimum nights: {record.fields.minimum_nights}{" "}
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
    </main>
  );
};

export default Explore;
