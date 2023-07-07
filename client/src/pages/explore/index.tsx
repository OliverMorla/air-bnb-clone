import { useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import Categories from "./categories";
import "./style.scss";

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
  const records = useLoaderData() as RecordsProps[];
  return (
    <main className="explore-wrapper">
      <section className="categories-wrapper">
        <div className="categories-scroll">
          <Categories />
        </div>
      </section>
      <div className="fee-btn-wrapper">
        <div className="wrapper">
            <p className="text">Display total price | <span> includes all fees, before taxes </span> <button>Toggle</button></p>
        </div>
      </div>
      <div className="listing-wrapper">
        {records.map((record) => (
          <Link to={`/explore/${record.recordid}`} key={record.recordid} target="_blank">
          <div className="card" >
            <img src={record.fields.xl_picture_url || record.fields.medium_url} alt="" />
            <div className="card-content">
              <p className="location">
                {`${record.fields.host_neighbourhood}, ${record.fields.city}`}
                <span>
                  <FontAwesomeIcon icon={faStar} />
                  {record.fields.number_of_reviews}
                </span>
              </p>
              <p className="room-type">Room Type: {record.fields.room_type} </p>
              <p className="minimum-nights"> Minimum nights: {record.fields.minimum_nights} </p>
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
