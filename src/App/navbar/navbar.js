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
					<div className="item"><IoIosArrowBack/></div>
					<div className="item"><IoIosArrowForward/></div>
				</div>
			</Router>
		</div>
    )
}

export default Navbar