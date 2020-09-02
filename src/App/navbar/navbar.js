import React from 'react';
import './navbar.css'

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
        </div>
    )
}

export default Navbar