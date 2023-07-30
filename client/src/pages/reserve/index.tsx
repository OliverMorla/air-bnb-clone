import { useParams } from "react-router-dom";
import { fadeEffects } from "@/animations";
import { motion } from "framer-motion";
import "./style.scss";

interface Props {}

const Reserve: React.FunctionComponent<Props> = () => {
  const { id } = useParams();

  const queryParams = new URLSearchParams(window.location.search);

  const number_of_guest: string | null = queryParams.get("guest");
  const number_of_nights: string | null = queryParams.get("nights");
  const checkInDate: string | null = queryParams.get("check-in-date");
  const checkOutDate: string | null = queryParams.get("check-out-date");
  const price: string | null = queryParams.get("price");
  const name: string | null = queryParams.get("name");

  // testing purposes
  console.log("id: " + id);

  const handleReserve = async () => {
    const data = {
      number_of_guest,
      number_of_nights,
      checkInDate,
      checkOutDate,
      price,
      name,
    };

    try {
      const res = await fetch(import.meta.env.VITE_STRIPE_API_URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const response = await res.json();
      window.location.href = response.url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.main
      className="reserve-wrapper"
      variants={fadeEffects}
      initial="hidden"
      animate="visible"
    >
      <h1 className="reserve-title">Request to Book</h1>
      <section className="content-w">
        <section className="left-content">
          <div className="features-w">
            <h4> This is a rare find. </h4>
            <p> Host's place is usually booked.</p>
          </div>
          <div className="trip-details-w">
            <h2> Your trip </h2>
            <div className="room-dates-w">
              <p>
                Dates <span> Edit </span>
              </p>
              <p>
                {checkInDate} - {checkOutDate}
              </p>
            </div>
            <div className="room-guests-w">
              <p>
                Guests <span> Edit </span>
              </p>
              <p> {number_of_guest} guest </p>
            </div>
          </div>
          <div className="payment-details-w">
            <h2>Choose how to pay</h2>
            <div className="payment-choice-w">
              <h4>
                Pay in full
                <span>
                  <input type="radio" name="" id="" defaultChecked />
                </span>
              </h4>
              <p>
                Pay part now
                <span>
                  Pay the total (${Number(price) * Number(number_of_nights)})
                  now and you're all set.
                </span>
              </p>
            </div>
          </div>
        </section>
        <section className="right-content">
          <div className="room-details-w">
            <div className="room-left-content">
              <img src="" alt="room-image" />
            </div>
            <div className="room-right-content">
              <span className="room-catergory">Room in home</span>
              <span className="room-title">Cozy room in a vegan oasis</span>
              <span className="room-reviews"></span>
            </div>
          </div>
          <div className="room-prices-w">
            <h2> Your Total </h2>
            <p className="fees-text">
              {number_of_nights} nights <span> {price}/night </span>
            </p>
          </div>
          <div className="room-total-prices">
            <p className="price-text">
              Total (USD)
              <span> ${Number(number_of_nights) * Number(price)} </span>
            </p>
          </div>
          <button onClick={handleReserve} className="confirm-reserve-btn">
            Confirm Reservation
          </button>
        </section>
      </section>
    </motion.main>
  );
};

export default Reserve;
