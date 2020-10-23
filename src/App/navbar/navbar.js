import React, {useState} from 'react';
import './navbar.css';
import {IoIosArrowBack, IoIosHome, IoIosArrowForward} from "react-icons/io";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence} from 'framer-motion';
import { LoremIpsum } from 'react-lorem-ipsum';

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
        }
    }
}

const navSeperator = {
    hidden: {height: 0},
    open: {
        height: "80vh",
        transition: {
            delay: 0.2,
            duration: 0.8,
            ease: "circOut"
        }
    },
    exit: {
        height: 0,
        transition:{
            duration: 0.1,
            ease: "easeOut"
        }
    }

}

const navHeader = {
    hidden: {opacity: 0, x: "20vw"},
    open: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 1,
            ease: "circOut"
        }
    },
    exit: {
        opacity: 0, x: "20vw",
        transition: {
            duration: 0.2,
            ease: "easeOut"
        }
    }
}
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return(
        <div className={isOpen ? "nav-bar-main is-open-menu" : "nav-bar-main"}>
            <div className="menu-toggle" onClick={e => setIsOpen(!isOpen)} style={isOpen ? {transitionDelay: "0s"} : {transitionDelay:"0.4s"}}>
                <div className={ isOpen ? "menu-toggle-icon menu-toggle-open" : "menu-toggle-icon menu-toggle-closed"}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
			<div className={isOpen? "menu-toggle-extended menu-toggle-open" : "menu-toggle-extended"} style={isOpen ? {transitionDelay: "0s"} : {transitionDelay:"0.45s"}}>
				<div className="item"><Link to="/" /><IoIosHome/></div>
				<div className="item"><IoIosArrowBack/></div>
				<div className="item"><IoIosArrowForward/></div>
			</div>
            <AnimatePresence>
            {isOpen && (
            <motion.div className="menu-overlay" variants = {navoverlay} initial = "hidden" animate = "open" exit="exit">
                <div className="menu-overlay-main">
                    <nav className="main-nav">
                        <motion.ul className="menu-list" variants = {navwrapper} initial="hidden">
                            <NavLink to="/" exact activeClassName="current-page-item">
                                <motion.li variants={navitem} onClick={e => setIsOpen(!isOpen)}>Home</motion.li>
                            </NavLink>
                            <NavLink to="/" activeClassName="">
                                <motion.li variants={navitem} onClick={e => setIsOpen(!isOpen)}>Auto-Mode</motion.li>
                            </NavLink>
                            <NavLink to="/" activeClassName="">
                                <motion.li variants={navitem} onClick={e => setIsOpen(!isOpen)}>Jobs</motion.li>
                            </NavLink>
                            <NavLink to="/about" activeClassName="current-page-item">
                                <motion.li variants={navitem} onClick={e => setIsOpen(!isOpen)}>About</motion.li>
                            </NavLink>
                        </motion.ul>
                    </nav>
                </div>
                <motion.span className="nav-seperator" variants = {navSeperator} initial="hidden" exit="exit"></motion.span>
                <div className="nav-header">
                    <motion.div className="nav-header-content" variants = {navHeader} initial="hidden" exit="exit">
                        <img src={`media/default.png`} alt=""/>
                        <LoremIpsum p={1} avgWordsPerSentence={6} avgSentencesPerParagraph={4}/>
                    </motion.div>
                </div>
            </motion.div>
            )}
            </AnimatePresence>
		</div>
    )
}

export default Navbar