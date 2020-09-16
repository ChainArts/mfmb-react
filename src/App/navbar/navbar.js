import React from 'react';
import './navbar.css';
import {IoIosArrowBack, IoIosHome, IoIosArrowForward} from "react-icons/io";

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
			<div className="menu-toggle-extended">
				<div className="item"><IoIosHome/></div>
				<div className="item"><IoIosArrowBack/></div>
				<div className="item"><IoIosArrowForward/></div>
			</div>
		</div>
    )
}

export default Navbar