import React, { useState } from 'react';
import './navbar.css';
import { IconContext } from 'react-icons';
import { HiHome, HiChevronLeft, HiChevronRight, HiCollection, HiUserGroup, HiTerminal } from "react-icons/hi";
import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import defImg from './../default.png';

const extendedMenu = {
    visible: {
        transition:{
            ease: [.14,.8,.4,1],
            staggerChildren: 0.07,
            delayChildren: 0.2,
        }
    },
    hidden: {
        transition: {
            ease: [.14,.8,.4,1],
            staggerChildren: 0.07,
            staggerDirection: -1,
        }    
    }
};

const extendedItem = {
    visible: {x: 0,
        transition: {
            duration: 0.35,
            ease: [.14,.8,.4,1]
        }
    },
    hidden: {x: "-4.5rem",
        transition: {
            duration: 0.35,
            ease: [.14,.8,.4,1],
        }
    },
};

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
        height: "65vh",
        transition: {
            delay: 0.4,
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
    hidden: {},
    open: {
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.4,
            ease: [0.22, 1, 0.36, 1]
        }
    }
}

const navHeaderItem ={
    hidden: {opacity: 0, x: 300},
    open: {opacity: 1, x: 0,
        transition: {
            duration: 0.8,
            ease: [.14,.8,.4,1],
        }
    }
}

const scrollIndicator = {
    animate: {
        scaleY: [1, 0.2],
        y: ["-6rem","6rem"],
        transition: {
            duration: 2,
            ease: "linear",
            repeat: "Infinity",
            repeatDelay: 0.5,
            times: [0, 1]
        }
    }
}


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const toggleOpen = () => setIsOpen(!isOpen);

    return(
        <AnimatePresence exitBeforeEnter>
        <motion.div className={isOpen ? "nav-bar-main is-open-menu" : "nav-bar-main"}  initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.3, delay: 0.3}}>
            <div className="menu-background"/>
            <div className="menu-toggle" onClick={toggleOpen} style={isOpen ? {transitionDelay: "0s"} : {transitionDelay:"0.2s"}}>
                <div className={ isOpen ? "menu-toggle-icon menu-toggle-open" : "menu-toggle-icon menu-toggle-closed"}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
			<motion.div className="menu-toggle-extended" variants={extendedMenu} animate={isOpen ? "hidden":"visible"}>
				<motion.div className="item" variants={extendedItem} onClick={()=> history.push('/companies')} whileTap={{scale: 0.95}}><HiHome/></motion.div>
				<motion.div className="item" variants={extendedItem} onClick={()=> history.goBack()} whileTap={{scale: 0.95}}><HiChevronLeft/></motion.div>
				<motion.div className="item" variants={extendedItem} onClick={()=> history.goForward()} whileTap={{scale: 0.95}}><HiChevronRight/></motion.div>
			</motion.div>
            <AnimatePresence exitBeforeEnter>
            {isOpen && (
            <IconContext.Provider value={{ className: 'react-icons' }}>
            <motion.div className="menu-overlay" variants = {navoverlay} initial = "hidden" animate = "open" exit="exit">
                <div className="menu-overlay-main mobile-maxWidth">
                    <nav className="main-nav">
                        <motion.ul className="menu-list" variants = {navwrapper} initial="hidden">
                            <NavLink to="/companies" exact activeClassName="current-page-item">
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
                </div>
                <motion.span className="nav-seperator mobile-hide" variants = {navSeperator} initial="hidden" animate="open" exit="exit"/>
                <div className="nav-header mobile-hide">
                    <motion.div className="nav-header-content" variants = {navHeader} initial="hidden" animate="open" exit="exit">
                        <motion.span variants = {navHeaderItem} >MFMB | HTL Hollabrunn</motion.span><br/>
                        <motion.img  variants = {navHeaderItem} src={defImg} alt="" loading="lazy"/>
                        <div className="nav-header-links">
                            <motion.span variants = {navHeaderItem} ><div className="link-icon"><FaInstagram/></div> <p>@htlhollabrunn</p></motion.span>
                            <motion.span variants = {navHeaderItem} ><div className="link-icon"><FaYoutube/></div><p>HTL Hollabrunn</p></motion.span>
                            <motion.span variants = {navHeaderItem} ><div className="link-icon"><FaLinkedin/></div><p>HTL Hollabrunn</p></motion.span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
            </IconContext.Provider>
            )}
            </AnimatePresence>
            {((location.pathname === "/companies" || location.pathname === "/about") &&
            <motion.div className="scrollIndicator" initial={{scaleY: 0}} animate={{scaleY: 1}} exit={{scaleY: 0}} transition={{delay: 0.5, duration: 0.3, ease: "easeInOut"}}>
                <motion.div className="scrollIndicatorSlider" variants={scrollIndicator} animate="animate"/>
            </motion.div>
            )}
		</motion.div>
        </AnimatePresence>
    )
}

export default Navbar