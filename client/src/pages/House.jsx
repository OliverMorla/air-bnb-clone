import React, { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Content from "./Content";
import Data from "../assets/airbnb-data"

export default function House(){
    // Allows us to destructure the 'id' var passed from the route in the 'app.jsx'
    const { id } = useParams();
    return(
        <>
            {Data.map(ObjectEl =>{if (ObjectEl.id === id) return (<Content key = {ObjectEl.id} info = {ObjectEl}/>)})}
        </>
    )
}