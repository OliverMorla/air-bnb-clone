import React from "react";
import { Link } from "react-router-dom";
import "./Card.css"

export default function Card(house){
    return(
        <Link to={`/explore/${house.data.id}`}>
        <div className="card-container">
                <img to="" src={house.data.picture_url.filename} alt="" className="card-image"/>
            <div className="rating-container">
                <div className="card-location">{house.data.smart_location}</div>
                <div className="total-ratings">
                    <img src="star.png" alt="star.png" className="star-image"/>
                    <div>{house.data.number_of_reviews}</div>
                </div>
            </div>
            <div className="card-title">{house.data.room_type}</div>
            <div className="price"><b>${house.data.price}</b> night</div>
        </div>
        </Link>
    )
}