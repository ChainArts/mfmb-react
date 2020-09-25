import React from 'react';
import './navbar.css';
import {IoIosArrowBack, IoIosHome, IoIosArrowForward} from "react-icons/io";
import {BrowserRouter as Router, Route} from "react-router-dom";

const Navbar = () => {
    return(
        <div className="nav-bar-main">
            <div className="menu-toggle">
                <div className="menu-toggle-icon menu-toggle-closed">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
			<Router>
				<div className="menu-toggle-extended">
					<div className="item"><Route to="/" /><IoIosHome/></div>
					<Route to="/about"><div className="item"><IoIosArrowBack/></div></Route>
					<div className="item"><IoIosArrowForward/></div>
				</div>
			</Router>
            <div className="menu-overlay">
                <div className="menu-overlay-main">
                    <nav className="main-nav">
                        <ul className="menu-list">
                            <li className="menu-item current-page-item"><a href="index.html">Home </a></li>
                            <li className="menu-item"><a href="https://orf.at/">Firmen </a></li>
                            <li className="menu-item"><a href="jobs.html">Jobs </a></li>
                            <li className="menu-item"><a href="about.html">About </a></li>
                        </ul>
                    </nav>
                </div>
            </div>
		</div>
    )
}

export default Navbar