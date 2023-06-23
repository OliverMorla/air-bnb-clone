import React from "react";
import { Link } from "react-router-dom"
import { Modal } from "react-bootstrap"
import { useState } from "react"
import Dropdown from "./Dropdown";
import CartContext from "./CartContext";
import Content from "../pages/Content";

export default function Header(){

    // Menu eventListener
    const showMenu = (e) => {
        // Retrieving the 'dropdown-wrapper' El
        const MenuEl = document.querySelector(".dropdown-wrapper")
    
        // class '.show' will be added on click
        MenuEl.classList.toggle("show")
    }
    return(
        <>
        {/* <div className="hidden-box"></div> */}
        <header>
            <nav>
                {/* Clicking the logo will take you back to the 'home' page */}
                <Link to="/"><img src="airbnb-logo.png" alt="airbnb-logo" className="airbnb-logo"/></Link>
                <div className="search-wrapper">
                    <img src="search-button.png" alt="" className="search-button"/>
                </div>
                <div className="globe-container">
                    <div className="globe-text">Airbnb your home</div>              
                    <img src="globe-logo.png" alt="globe-logo.png" className="globe-logo"/>
                </div>
                {/* When clicking 'menu' it will invoke 'showMenu' function */}
                <div className="menu-wrapper-outer" onClick={showMenu}>
                    <div className="menu-wrapper-inner">
                        <div className="menu-item"></div>
                        <div className="menu-item"></div>
                        <div className="menu-item"></div>
                    </div>
                    <img src="user-logo2.png" alt="user-logo" className="user-logo"/>
                </div>
            </nav>
            < Dropdown/>
        </header>
        </>
        
    )
}

