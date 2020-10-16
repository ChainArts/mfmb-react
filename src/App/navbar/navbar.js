import React, {useState} from 'react';
import './navbar.css';
import {IoIosArrowBack, IoIosHome, IoIosArrowForward} from "react-icons/io";
import {BrowserRouter as Router, Route} from "react-router-dom";
import { motion, AnimatePresence} from 'framer-motion';

const navoverlay = {
    hidden: {x: "-100vw"},
    open: { 
      x: 0,
      transition: {
        ease: "easeOut",
        duration: 0.5,
      }
    },
    exit: {
        x: "-100vw",
        transition: {
            duration: 0.5,
            ease: "easeOut",
        }
    }
  };
  
const navwrapper = {
    hidden: {},
    open: {
        transition: {
            delayChildren: 0.1,
            staggerChildren: .1,
        },
    }
  };

const navitem = {
    hidden: {opacity:0, x: "-16vw"},
    open: {
        opacity:1,
        x: 0,
        transition: {
            duration: 0.3,
            //ease: "easeOut",
        }
    }
}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return(
        <div className={isOpen ? "nav-bar-main is-open-menu" : "nav-bar-main"}>
            <div className="menu-toggle" onClick={e => setIsOpen(!isOpen)} style={isOpen ? {transitionDelay: "0s"} : {transitionDelay:"0.5s"}}>
                <div className={ isOpen ? "menu-toggle-icon menu-toggle-open" : "menu-toggle-icon menu-toggle-closed"}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
			<Router>
				<div className={isOpen? "menu-toggle-extended menu-toggle-open" : "menu-toggle-extended"} style={isOpen ? {transitionDelay: "0s"} : {transitionDelay:"0.5s"}}>
					<div className="item"><Route to="/" /><IoIosHome/></div>
					<div className="item"><IoIosArrowBack/></div>
					<div className="item"><IoIosArrowForward/></div>
				</div>
            </Router>
            <AnimatePresence>
            {isOpen && (
            <motion.div className="menu-overlay" variants = {navoverlay} initial = "hidden" animate = "open" exit="exit">
                <div className="menu-overlay-main">
                    <nav className="main-nav">
                        <motion.ul className="menu-list" variants = {navwrapper} initial="hidden">
                            <motion.li className="current-page-item" variants={navitem}><a href="none">Home </a></motion.li>
                            <motion.li className="" variants = {navitem}><a href="https://www.orf.at">Firmen </a></motion.li>
                            <motion.li className="" variants = {navitem}><a href="none">Jobs </a></motion.li>
                            <motion.li className="" variants = {navitem}><a href="none">About </a></motion.li>
                        </motion.ul>
                    </nav>
                </div>
            </motion.div>
            )}
            </AnimatePresence>
		</div>
    )
}

export default Navbar