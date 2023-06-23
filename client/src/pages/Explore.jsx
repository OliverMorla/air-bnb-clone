import React from "react";
import Data from "../assets/airbnb-data"
import Amenities from "../assets/airbnb-amenities"
import Card from '../components/Card'

export default function Explore(){
    return(
        <>
        <div className="loading-screen">
            <img src="../airbnb-logo2.png" alt="" className="airbnb-logo2"/>
        </div>
        <div className="hidden-amenities-box">
            <div className="amenities-container">
                {Amenities.map(ObjectEl => (
                <div className="amenities-wrapper" key={ObjectEl.id}>
                    <img src={"amenities/"+ ObjectEl.picture_url} alt={ObjectEl.name} className="amenity-icon" />
                    <div className="amenity-name">{ObjectEl.name}</div>
                </div>
                
                ))}
            </div>
        </div>
        <div className="airbnb-container">
            {Data.map(ObjectEl => (<Card key = {ObjectEl.id} data = {ObjectEl}/>))}
        </div>
        </>
    )
}