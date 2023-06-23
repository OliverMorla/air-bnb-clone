import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "./components/Header";
import Main from "./pages/Main";
import Updates from "./components/Updates"
import Explore from "./pages/Explore";
import House from "./pages/House";
import Footer from "./components/Footer";
import "./App.css"

export default function App(){
    return(
        <Router>
            <div className="main-container">
                <Routes>
                    <Route path="/explore" element={<Updates />}></Route>
                </Routes>
                <Header />
                <div className="wrapper">
                    <Routes>
                        <Route path="/" element={<Main />}></Route>
                        <Route path="/explore" element={<Explore />}></Route>
                        <Route path="/explore/:id" element={<House />}></Route>
                    </Routes>
                </div>
                <Footer />  
            </div>
        </Router>
    )
}

