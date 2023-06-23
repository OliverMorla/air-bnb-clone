import react from "react"
import { Link } from 'react-router-dom'

export default function Dropdown(){
    return(
        <div className="dropdown-wrapper">
            <Link to="/explore"><div className="dropdown-item">Explore</div></Link>
            <div className="dropdown-item">Sign Up</div>
            <div className="dropdown-item">Log in</div>
            <div className="dropdown-item">Airbnb your home</div>
            <div className="dropdown-item">Host your experience</div>
            <div className="dropdown-item">Help</div>
        </div>
    )
}