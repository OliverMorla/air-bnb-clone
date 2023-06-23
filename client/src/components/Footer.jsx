import React from "react";

export default function Footer(){ 
    return(
        <>
        <div className="hidden-box-bottom">
        <footer>
            <div className="footer-wrapper">
                <div className="footer-left-menu">
                    <div className="footer-item">© 2023 Airbnb, Inc</div>
                    <div className="footer-item">Terms</div>
                    <div className="footer-item">Sitemap</div>
                    <div className="footer-item">Privacy</div>
                    <div className="footer-item">Your Privacy Choices</div>
                    <div className="footer-item">Destinations</div>
                </div>
                <div className="footer-right-wrapper">
                    <div className="footer-right-items">English (US)</div>
                    <div className="footer-right-items">$ USD</div>
                    <div className="footer-right-items">Support & Resources</div>
                </div>
            </div>
        </footer>
        </div>
        
        </>
        
    )
}
