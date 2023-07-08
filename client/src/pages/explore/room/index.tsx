import { useLoaderData, useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

interface RecordsProps {
  recordid: string;
  fields: {
    // general
    name: string;
    host_neighbourhood: string;
    city: string;
    xl_picture_url: string;
    medium_url: string;
    number_of_reviews: number;
    room_type: string;
    minimum_nights: number;
    summary: string;
    description: string;
    bedrooms: number;
    reviews_per_month: number;
    smart_location: string;
    host_name: string;

    // fees
    price: number;
    cleaning_fee: number;
    security_deposit: number;
    extra_people: number;
    guests_included: number;

    // amenities
    amenities: string[];
    property_type: string;
    features: string;
    beds: number;
    bathrooms: number;
  };
}

const Room = () => {
  const { id } = useParams();
  const records = useLoaderData() as RecordsProps[];
  const record = records.find((record) => record.recordid === id);

  return (
    <main className="record-wrapper">
      <div className="house-title">{record?.fields.name}</div>
      <div className="house-title-content">
        <div className="title-content-left">
          <FontAwesomeIcon icon={faStar} className="content-icon" />
          <div className="reviews-per-month">
            {record?.fields.reviews_per_month} ·
          </div>
          <div className="number-of-reviews">
            {record?.fields.number_of_reviews} reviews{" "}
          </div>
          <div className="host-features">· {record?.fields.features} ·</div>
          <div className="location">{record?.fields.smart_location}</div>
        </div>
        <div className="btn-wrapper">
          <div className="share-btn">Share</div>
          <div className="save-btn">Save</div>
          <div className="cart-icon-wrapper">
            <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
          </div>
        </div>
      </div>
      <div className="picture-container">
        <img
          src={record?.fields.xl_picture_url || record?.fields.medium_url}
          alt=""
          className="house-image"
        />

        <div className="reserve-card">
          <div className="reserve-btn-wrapper">
            <Link to={""}>
              <div className="reserve-btn">Reserve</div>
            </Link>
            <div className="number-of-guest">
              <label>Choose number of guest:</label>
              <select name="guest" id="guest-select">
                <option value="">--Please choose an option--</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
            <div className="number-of-nights">
              <label>Choose number of nights:</label>
              <select name="nights" id="nights-select">
                <option value="">--Please choose an option--</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
          </div>
          <div className="price-main-wrapper">
            <div className="house-price">
              ${record?.fields.price} <span>night</span>
            </div>
            <img src="/star.png" alt="" className="content-star" />
            <div className="price-wrapper">
              <div className="reviews-per-month">
                {record?.fields.reviews_per_month} ·
              </div>
              <div className="number-of-reviews">
                {record?.fields.number_of_reviews} Reviews
              </div>
            </div>
            <div className="fees-wrapper">
              <div className="house-price">
                ${record?.fields.price} <span>night</span> x{" "}
                <span className="number-of-nights-num">5</span>
              </div>
              <div className="content-fee">
                Cleaning fee <span>$11</span>
              </div>
              <div className="content-fee">
                Airbnb service fee <span>$66</span>
              </div>
            </div>
            <div className="total-price">
              Total before taxes <span>$535</span>
            </div>
          </div>
        </div>
      </div>
      <div className="house-title">{record?.fields.room_type} by {record?.fields.host_name}</div>
      <div className="room-record?.fields">
        <div className="stats">{record?.fields.guests_included} guests •</div>
        <div className="stats">{record?.fields.bedrooms} bedroom •</div>
        <div className="stats">{record?.fields.beds} beds •</div>
        <div className="stats">{record?.fields.bathrooms} bath</div>
      </div>
      <div className="house-title">Description</div>
      <div>{record?.fields.description}</div>
      <div className="house-title">Summary</div>
      <div>{record?.fields.summary}</div>
    </main>
  );
};

export default Room;
