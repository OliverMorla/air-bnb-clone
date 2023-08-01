import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import {
  useLoaderData as useLoaderDataRouter,
  useParams,
  LoaderFunction,
  useNavigate,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faHeart,
  faShareSquare,
} from "@fortawesome/free-regular-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { RoomInputTypes } from "@/types/types";
import { fadeEffects } from "@/animations";
import { getRoom } from "@/routes/root";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import "./style.scss";

// Renamed Original Hook "UseLoaderData" to "UseLoaderDataRouter" to avoid conflict with the new hook "UseLoaderData.
// This hook takes a generic type argument, which is the type of the loader function you want to use; it returns the data that the loader function returns.
export function useLoaderData<T extends LoaderFunction>() {
  return useLoaderDataRouter() as LoaderData<T>;
  // The result of useLoaderDataRouter is a union of all the possible return types of the loader functions.
}

export type LoaderData<TLoaderFn extends LoaderFunction> = Awaited<
  ReturnType<TLoaderFn>
> extends Response | infer D
  ? D
  : never;

const Room: React.FunctionComponent = (): JSX.Element => {
  const { id } = useParams<string>();
  const { userInfo } = useAuth();
  const records = useLoaderData<typeof getRoom>();
  const record = records?.find((record) => record?.recordid === id);
  const navigate = useNavigate();

  const [input, setInput] = useState<RoomInputTypes>({
    guest: 0,
    nights: 0,
    check_in_date: "",
    check_out_date: "",
    price: record?.fields.price,
    name: record?.fields.name,
    user_id: 1,
  });

  const features: string[] | undefined = record?.fields.features?.split(",");
  const offers: string[] | undefined = record?.fields.amenities?.split(",");

  useEffect(() => {
    //date format: yyyy-mm-dd
    if (input?.check_in_date && input?.check_out_date) {
      const checkInDate = new Date(input?.check_in_date); 
      const checkOutDate = new Date(input?.check_out_date);
      const nights: number = checkOutDate.getDate() - checkInDate.getDate();
      setInput({ ...input, nights: Math.abs(nights) });
    }
  }, [input?.check_in_date, input?.check_out_date]);

  useEffect(() => {
    if (input.user_id === undefined)
      setInput({
        ...input, user_id: userInfo?.user !== null ? userInfo?.user?.id : 1,
      });
  }, []);

  // testing purposes
  console.log(record);
  console.log(input);

  const handleReserveBtn = () => {
    try {
      if (userInfo !== undefined) {
        if (input?.guest && input?.nights) {
          navigate(
            `/reserve/${id}?user-id=${input.user_id}&name=${input.name}&guest=${
              input.guest
            }&nights=${input.nights}&check-in-date=${
              input.check_in_date
            }&check-out-date=${input.check_out_date}&price=${
              input.price
            }&pictureUrl=${
              record?.fields.xl_picture_url || record?.fields.medium_url
            }`
          );
        } else {
          throw new Error("Please fill out all the fields");
        }
      } else {
        throw new Error("Please login to reserve a room");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  };

  return (
    <motion.main
      className="record-wrapper"
      variants={fadeEffects}
      initial="hidden"
      animate="visible"
    >
      <div className="house-title">{record?.fields.name}</div>
      <div className="house-title-content">
        <div className="title-content-left">
          <FontAwesomeIcon icon={faStar} className="content-icon" />
          <div className="reviews-per-month">
            {record?.fields.reviews_per_month} ·
          </div>
          <div className="number-of-reviews">
            {record?.fields.number_of_reviews} reviews
          </div>
          <div className="host-features">· {record?.fields.features} ·</div>
          <div className="location">{record?.fields.smart_location}</div>
        </div>
        <div className="btn-wrapper">
          <div className="share-btn">
            <FontAwesomeIcon icon={faShareSquare} /> Share
          </div>
          <div className="save-btn">
            <FontAwesomeIcon icon={faHeart} /> Save
          </div>
          <div className="cart-icon-wrapper">
            <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
          </div>
        </div>
      </div>
      <div className="picture-container">
        <img
          src={record?.fields.xl_picture_url || record?.fields.medium_url}
          alt="room/house-image"
          className="house-image"
        />

        <div className="reserve-card">
          <div className="price-content-w">
            <div className="house-price">
              ${record?.fields.price} <span> night </span>
            </div>
            <div className="reviews-per-month">
              <FontAwesomeIcon icon={faStar} className="content-icon" />
              {record?.fields.reviews_per_month} ·
              {record?.fields.number_of_reviews} reviews
            </div>
          </div>
          <div className="appointment-w">
            <label htmlFor="">
              <span> Check-in </span>
              <input
                type="date"
                name="check_in_date"
                id=""
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInput({
                    ...input,
                    [e.currentTarget.name]: e.currentTarget.value,
                  })
                }
              />
            </label>
            <label htmlFor="">
              <span> Check-Out </span>
              <input
                type="date"
                name="check_out_date"
                id=""
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInput({
                    ...input,
                    [e.currentTarget.name]: e.currentTarget.value,
                  })
                }
              />
            </label>
          </div>
          <div className="reserve-btn-wrapper">
            <div className="number-of-guest">
              <label>Choose number of guest:</label>
              <select
                name="guest"
                id="guest-select"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setInput({
                    ...input,
                    [e.currentTarget.name]: Number(e.currentTarget.value),
                  })
                }
              >
                <option value="">--Please choose an option--</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
            <div className="reserve-btn" onClick={handleReserveBtn}>
              Reserve
            </div>
          </div>
          <p> you wont be charged yet </p>
          <div className="price-main-wrapper">
            <div className="info-price">
              ${record?.fields.price} night x {input.nights} nights
              <span>
                ${Number(record?.fields.price) * Number(input.nights)}
              </span>
            </div>
            <div className="fees-wrapper">
              <div className="content-fee">
                Cleaning fee{" "}
                <span>
                  $
                  {record?.fields.cleaning_fee !== undefined
                    ? record?.fields.cleaning_fee
                    : 0}
                </span>
              </div>
              <div className="content-fee">
                Airbnb service fee
                <span>${record?.fields.security_deposit || 0}</span>
              </div>
            </div>
            <div className="total-price">
              Total before taxes
              <span>
                $
                {Number(input.nights) * Number(record?.fields.price) +
                  (record?.fields.security_deposit
                    ? Number(record.fields.security_deposit)
                    : 0) +
                  (record?.fields.cleaning_fee !== undefined
                    ? Number(record?.fields.cleaning_fee)
                    : 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="house-title">
        {record?.fields.room_type} by {record?.fields.host_name}
        <span>
          {record?.fields.host_thumbnail_url ? (
            <FontAwesomeIcon icon={faUser} />
          ) : (
            <img src={record?.fields.host_thumbnail_url} alt="host-thumbnail" />
          )}
        </span>
      </div>
      <div className="room-info">
        <div className="stats">{record?.fields.guests_included} guests •</div>
        <div className="stats">{record?.fields.bedrooms} bedroom •</div>
        <div className="stats">{record?.fields.beds} beds •</div>
        <div className="stats">{record?.fields.bathrooms} bath</div>
      </div>
      <div className="features-w">
        <ul>
          {features?.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      <div className="house-title">Description</div>
      <div>{record?.fields.description}</div>
      <div className="house-title">Summary</div>
      <div>{record?.fields.summary}</div>
      <div className="offers-w">
        <h2>What this place offers</h2>
        <ul>
          {offers?.map((offer, index) => (
            <li key={index}>{offer}</li>
          ))}
        </ul>
      </div>
    </motion.main>
  );
};

export default Room;
