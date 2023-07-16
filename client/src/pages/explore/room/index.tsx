// import { useLoaderData, useParams } from "react-router-dom";

import { useParams } from "react-router-dom";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import {
//   faStar,
//   faHeart,
//   faShareSquare,
// } from "@fortawesome/free-regular-svg-icons";

// import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

// import "./style.scss";

// interface RecordsProps {
//   recordid: string;
//   fields: {
//     name?: string;
//     host_neighbourhood?: string;
//     city?: string;
//     xl_picture_url?: string;
//     medium_url?: string;
//     number_of_reviews?: number;
//     room_type?: string;
//     minimum_nights?: number;
//     summary?: string;
//     description?: string;
//     bedrooms?: number;
//     reviews_per_month?: number;
//     smart_location?: string;
//     host_name?: string;
//     host_picture_url?: string;
//     host_thumbnail_url?: string;
//     price?: number;
//     cleaning_fee?: number;
//     security_deposit?: number;
//     extra_people?: number;
//     guests_included?: number;
//     amenities?: string;
//     property_type?: string;
//     features?: string;
//     beds?: number;
//     bathrooms?: number;
//   };
// }

// const Room = () => {
//   const { id } = useParams();
//   const records = useLoaderData() as RecordsProps[];
//   const record = records?.find((record) => record?.recordid === id);

//   return (
//     <main className="record-wrapper">
//       <div className="house-title">{record?.fields.name}</div>
//       <div className="house-title-content">
//         <div className="title-content-left">
//           <FontAwesomeIcon icon={faStar} className="content-icon" />
//           <div className="reviews-per-month">
//             {record?.fields.reviews_per_month} ·
//           </div>
//           <div className="number-of-reviews">
//             {record?.fields.number_of_reviews} reviews
//           </div>
//           <div className="host-features">· {record?.fields.features} ·</div>
//           <div className="location">{record?.fields.smart_location}</div>
//         </div>
//         <div className="btn-wrapper">
//           <div className="share-btn">
//             <FontAwesomeIcon icon={faShareSquare} /> Share
//           </div>
//           <div className="save-btn">
//             <FontAwesomeIcon icon={faHeart} /> Save
//           </div>
//           <div className="cart-icon-wrapper">
//             <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
//           </div>
//         </div>
//       </div>
//       <div className="picture-container">
//         <img
//           src={record?.fields.xl_picture_url || record?.fields.medium_url}
//           alt="room/house-image"
//           className="house-image"
//         />

//         <div className="reserve-card">
//           <div className="price-content-w">
//             <div className="house-price">
//               ${record?.fields.price} <span> night </span>
//             </div>
//             <div className="reviews-per-month">
//               <FontAwesomeIcon icon={faStar} className="content-icon" />
//               {record?.fields.reviews_per_month} ·
//               {record?.fields.number_of_reviews} reviews
//             </div>
//           </div>
//           <div className="appointment-w">
//             <label htmlFor="">
//               <span> Check-in </span>
//               <input type="date" name="" id="" />
//             </label>
//             <label htmlFor="">
//               <span> Check-Out </span>
//               <input type="date" name="" id="" />
//             </label>
//           </div>
//           <div className="reserve-btn-wrapper">
//             <div className="number-of-guest">
//               <label>Choose number of guest:</label>
//               <select name="guest" id="guest-select">
//                 <option value="">--Please choose an option--</option>
//                 <option value="1">1</option>
//                 <option value="2">2</option>
//                 <option value="3">3</option>
//                 <option value="4">4</option>
//                 <option value="5">5</option>
//                 <option value="6">6</option>
//               </select>
//             </div>
//               <div className="reserve-btn">Reserve</div>
//           </div>
//           <p> you wont be charged yet </p>
//           <div className="price-main-wrapper">
//             <div className="info-price">
//               ${record?.fields.price}night x 13 nights<span>$553</span>
//             </div>
//             <div className="fees-wrapper">
//               <div className="content-fee">
//                 Cleaning fee <span>$11</span>
//               </div>
//               <div className="content-fee">
//                 Airbnb service fee <span>$66</span>
//               </div>
//             </div>
//             <div className="total-price">
//               Total before taxes <span>$535</span>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="house-title">
//         {record?.fields.room_type} by {record?.fields.host_name}
//         <span>
//           <img src={record?.fields.host_thumbnail_url} alt="host-thumbnail" />
//         </span>
//       </div>
//       <div className="room-info">
//         <div className="stats">{record?.fields.guests_included} guests •</div>
//         <div className="stats">{record?.fields.bedrooms} bedroom •</div>
//         <div className="stats">{record?.fields.beds} beds •</div>
//         <div className="stats">{record?.fields.bathrooms} bath</div>
//       </div>
//       <div className="house-title">Description</div>
//       <div>{record?.fields.description}</div>
//       <div className="house-title">Summary</div>
//       <div>{record?.fields.summary}</div>
//     </main>
//   );
// };

// export default Room;

const Room = () => {
  const { id } = useParams()
  console.log(id)
  return ( 
    <>
    <h1>
      {id}
    </h1>
    </>
   );
}
 
export default Room;