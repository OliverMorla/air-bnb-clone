import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import CartContext from "../components/CartContext";
import "./Content.css"

export default function Content(props){
    const { info } = props;
    const { features } = info;
    const [show, setShow] = useState(false)
    const [cartItems, setCartItems] = useState([]);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    
    const onAdd = (product) => {
        // Getting the value of the option boxes
        const guest_number = document.querySelector("#guest-select").value, 
              night_number = document.querySelector("#nights-select").value;

        // Assigning product to the be the house object
        product = info;

        // Checks and returns boolean if item already exists in cart
        const exist = cartItems.find(item => item.id === product.id)

        if(exist){
            setCartItems(cartItems.map((item) => item.id === product.id ? {...item, guests_included: parseInt(item.guests_included) + 1} : item))
            // setCartItems(cartItems.map((item) => item.id === product.id ? {...item, qty: exist.qty + 1} : item))
        }else{
            setCartItems([...cartItems, {...product, guests_included: guest_number, nights_included: night_number}])
        }
    }

    return(
        <>
        <div className="house-wrapper">
            <div className="house-title">{info.name}</div>
            <div className="house-title-content">
                <div className="title-content-left">
                    <img src="/star.png" alt="star.png" className="content-star"/>
                    <div className="reviews-per-month">{info.reviews_per_month} ·</div>
                    <div className="number-of-reviews">{info.number_of_reviews} reviews </div>
                    <div className="host-features">· {info.features} ·</div>
                    <div className="location">{info.smart_location}</div>
                </div>
                <div className="btn-wrapper">
                    <div className="share-btn">Share</div>
                    <div className="save-btn">Save</div>
                    <div className="cart-icon-wrapper">
                        <img src="/shopping-cart.png" alt="shopping-cart.png" className="shopping-cart" onClick={handleShow}/>
                    </div>
                </div>
            </div>
            <div className="picture-container">
                <img src={"/"+info.picture_url.filename} alt="" className="house-image"/>
                <div className="reserve-card">
                    <div className="reserve-btn-wrapper">
                        <Link><div className="reserve-btn" onClick={onAdd}>Reserve</div></Link>
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
                        <div className="house-price">${info.price} <span>night</span></div>
                            <img src="/star.png" alt="" className="content-star"/>
                        <div className="price-wrapper">
                            <div className="reviews-per-month">{info.reviews_per_month}  ·</div>
                            <div className="number-of-reviews">{info.number_of_reviews} Reviews</div>
                        </div>
                            <div className="fees-wrapper">
                                <div className="house-price">${info.price} <span>night</span> x <span className="number-of-nights-num">5</span></div>
                                <div className="content-fee">Cleaning fee <span>$11</span></div>
                                <div className="content-fee">Airbnb service fee <span>$66</span></div>
                            </div>
                            <div className="total-price">Total before taxes <span>$535</span></div>
                    </div>
                </div>
            </div>
            <div className="house-title">{info.room_type} by {info.host_name}</div>
            <div className="room-info">
                <div className="stats">{info.guests_included} guests •</div>
                <div className="stats">{info.bedrooms} bedroom •</div>
                <div className="stats">{info.beds} beds •</div>
                <div className="stats">{info.bathrooms} bath</div>
            </div>
            <div className="house-title">Description</div>
            <div>{info.description}</div>
            <div className="house-title">Summary</div>
            <div>{info.summary}</div>
        </div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <CartContext key={info.id} cartItems={cartItems} onAdd={onAdd} data={info}/>
            <Link><div className="reserve-btn" onClick={onAdd}>Check out</div></Link>
        </Modal.Body>
        </Modal>
        </>
    )
}