import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getProfile } from "@/routes/root";
import { Order } from "@/types/types";
import { useLoaderData } from "../room";
import "./style.scss";

const Profile = (): JSX.Element => {
  const profile = useLoaderData<typeof getProfile>();
  const [orders, setOrders] = useState<Order[] | undefined>();
  const { getOrders } = useAuth();

  const fetchOrders = async () => {
    const inputs = {
      user_id: profile?.id,
    };
    try {
      const res = await getOrders(JSON.stringify(inputs));
      if (res.status === 200) {
        setOrders(res.orders);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <main className="profile-wrapper">
      <section className="heading-wrapper">
        <h1>Profile</h1>
      </section>
      <section className="content-wrapper">
        <p>
          <span>ID: </span>
          {profile?.id}
        </p>
        <p>
          <span>Username: </span>
          {profile?.username}
        </p>
        <p>
          <span>Email: </span>
          {profile?.email}
        </p>
        <p>
          <span>Password: </span>
          {profile?.password}
        </p>
        <p>
          <span>Date of Birth: </span>
          {profile?.date_of_birth}
        </p>
        <div className="btn-wrapper">
          <button className="change-password-btn">Change Password</button>
          <button className="change-email-btn">Change Email</button>
          <button className="logout-btn">Log out</button>
        </div>
      </section>
      <section className="orders-wrapper">
        <h1>Orders</h1>
        <div className="orders-content">
          {orders?.map((order) => (
            <span key={order.order_id}>
              <div className="order-info">
                <h4>Order ID</h4>
                <p>{order.order_id}</p>
              </div>
              <div className="order-info" style={{ width: "400px" }}>
                <h4>Room Name</h4>
                <p>{order.room_name}</p>
              </div>
              <div className="order-info">
                <h4>Check in Date</h4>
                <p>{order.check_in_date}</p>
              </div>
              <div className="order-info">
                <h4>Check out Date</h4>
                <p>{order.check_out_date}</p>
              </div>
              <div className="order-info">
                <h4>Guest</h4>
                <p>{order.number_of_guest}</p>
              </div>
              <div className="order-info">
                <h4>Nights</h4>
                <p>{order.number_of_nights}</p>
              </div>
              <div className="order-info">
                <h4>Price</h4>
                <p>
                  ${Number(order.total_price) * Number(order.number_of_nights)}
                </p>
              </div>
            </span>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Profile;
