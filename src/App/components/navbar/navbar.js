import React, { useState } from 'react';
import './navbar.css';
import { IconContext } from 'react-icons';
import { HiHome, HiChevronLeft, HiChevronRight, HiCollection, HiUserGroup, HiTerminal } from "react-icons/hi";
import { NavLink, useHistory } from "react-router-dom";
import { motion, AnimatePresence} from 'framer-motion';

const navoverlay = {
    hidden: {x: "-100vw"},
    open: { 
      x: 0,
      transition: {
        ease: [.14,.8,.4,1],
        duration: 0.5,
      }
    },
    exit: {
        x: "-100vw",
        transition: {
            duration: 0.5,
            ease: [.14,.8,.4,1]
        }
    }
  };
  
const navwrapper = {
    hidden: {},
    open: {
        transition: {
            delayChildren: 0.1,
            staggerChildren: .1,
            ease: [.14,.8,.4,1]
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
            ease: [.14,.8,.4,1]
        },
    }
}

const navSeperator = {
    hidden: {height: 0},
    open: {
        height: "80vh",
        transition: {
            delay: 0.2,
            duration: 0.8,
            ease: [.14,.8,.4,1],
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
    hidden: {opacity: 0, x: "20vw", rotateY: 60},
    open: {
        opacity: 1,
        x: 0,
        rotateY: 0,
        transition: {
            staggerChildren: 0.1,
            delay: 0.2,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
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

const navHeaderItem ={
    hidden: {opacity: 0, y: 20},
    open: {opacity: 1, y: 0,
        transition: {
            delay: 0.5,
            duration: 0.8,
            ease: [.14,.8,.4,1],
        }
    }
}


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory();
    const toggleOpen = () => setIsOpen(!isOpen);

    return(
        <AnimatePresence>
        <div className={isOpen ? "nav-bar-main is-open-menu" : "nav-bar-main"}>
            <div className="menu-toggle" onClick={toggleOpen} style={isOpen ? {transitionDelay: "0s"} : {transitionDelay:"0.4s"}}>
                <div className={ isOpen ? "menu-toggle-icon menu-toggle-open" : "menu-toggle-icon menu-toggle-closed"}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
			<div className={isOpen? "menu-toggle-extended menu-toggle-open" : "menu-toggle-extended"} style={isOpen ? {transitionDelay: "0s"} : {transitionDelay:"0.45s"}}>
				<NavLink to="/" className="item"><HiHome/></NavLink>
				<div className="item" onClick={()=> history.goBack()}><HiChevronLeft/></div>
				<div className="item" onClick={()=> history.goForward()}><HiChevronRight/></div>
			</div>
            <AnimatePresence exitBeforeEnter>
            {isOpen && (
            <motion.div className="menu-overlay" variants = {navoverlay} initial = "hidden" animate = "open" exit="exit">
                <div className="menu-overlay-main mobile-maxWidth">
                <IconContext.Provider value={{ className: 'react-icons' }}>
                    <nav className="main-nav">
                        <motion.ul className="menu-list" variants = {navwrapper} initial="hidden">
                            <NavLink to="/" exact activeClassName="current-page-item">
                                <motion.li variants={navitem} whileTap={{scale: 0.85}} onClick={toggleOpen}><HiHome/> Home</motion.li>
                            </NavLink>
                            <NavLink to="/automode" activeClassName="current-page-item">
                                <motion.li variants={navitem} whileTap={{scale: 0.85}} onClick={toggleOpen}><HiTerminal/> Auto-Mode</motion.li>
                            </NavLink>
                            <NavLink to="/jobs" activeClassName="current-page-item">
                                <motion.li variants={navitem} whileTap={{scale: 0.85}} onClick={toggleOpen}><HiCollection/> Jobs</motion.li>
                            </NavLink>
                            <NavLink to="/about" activeClassName="current-page-item">
                                <motion.li variants={navitem} whileTap={{scale: 0.85}} onClick={toggleOpen}><HiUserGroup/> About</motion.li>
                            </NavLink>
                        </motion.ul>
                    </nav>
                </IconContext.Provider>
                </div>
                <motion.span className="nav-seperator mobile-hide" variants = {navSeperator} initial="hidden" exit="exit"/>
                <div className="nav-header mobile-hide">
                    <motion.div className="nav-header-content" variants = {navHeader} initial="hidden" animate="open" exit="exit">
                        <img src={`media/default.png`} alt=""/>
                            <motion.span variants = {navHeaderItem} initial="hidden" animate="open">MFMB</motion.span><br/>
                            <motion.span variants = {navHeaderItem} initial="hidden" animate="open">HTL HOLLABRUNN</motion.span>
                    </motion.div>
                </div>
            </motion.div>
            )}
            </AnimatePresence>
		</div>
        </AnimatePresence>    
    )
}

export default Navbar