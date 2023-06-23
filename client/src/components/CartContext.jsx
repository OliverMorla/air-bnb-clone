import React, { useRef } from "react"

export default function CartContext(props){
    const { cartItems } = props;
    
    return(
        <>
        <div key={cartItems}>
            {cartItems.length === 0 && <h1>Cart is empty</h1>}
            <h4>Cart Items: {cartItems.length}</h4>
        </div>
        <div>
            {cartItems.map((item) =>(
                <>
                <div key={item.id} className="cart-item-wrapper">
                    {item.name}
                    <img src={"/" + item.picture_url.filename} alt="" className="cart-image"/>
                    <div>Price: ${item.price} x {item.nights_included} = ${item.price * item.nights_included}</div>
                    <div>Nights: {item.nights_included} days</div>
                    <div>Guests: {item.guests_included}</div>
                </div>
                </>
            ))}
        </div>
        </>
    )
}