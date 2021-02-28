import React, { useState, useEffect } from 'react';
import { AnimateSharedLayout, AnimatePresence, motion, } from 'framer-motion';
import { Redirect } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import IdleTimer from './../../components/idleTimer';
import { globalTimeout } from './../../App';
import "./jobs.css";
import { HiViewGrid, HiViewList, HiPlus, HiX} from "react-icons/hi";
import defImg from "./../../components/media/default.png";

const jobSettings = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition:{
            ease: [.14,.8,.4,1],
            delay: 0.3,
            delayChildren: 0.2,
            staggerChildren: 0.1
        }
    }
};

const jobSettingsItem = {
    hidden: {opacity: 0, y:200},
    visible: {
        opacity: 1,
        y: 0,
        transition:{
            duration: 0.5,
            ease: [.14,.8,.4,1],
        }
    }
};

const jobSeperator = {
    hidden: {scaleY: 0},
    visible: {
        scaleY: 1,
        transition:{
            delay: 0.2,
            duration: 0.3,
            ease: [.14,.8,.4,1],
        }
    }
};

const jobContainer = {
    hidden: { opacity: 0},
    visible: { 
      opacity: 1,
      transition: {
        ease: [.14,.8,.4,1],
        delay: 0.3,
        delayChildren: 0.3,
        staggerChildren: .04,
      }
    },
    exit:{opacity: 0}, 
        transition:{
            ease: [.14,.8,.4,1],
            staggerChildren: .06,
            staggerDirection: -1,
        }
    };
  
const jobItem = {
    hidden: { y: 20, opacity: 0, borderRadius: 6},
    visible: {
        y: 0,
        opacity: 1,
        transition:{
            duration: 0.8,
            delayChildren: 0.3,
            ease: [.14,.8,.4,1]
        }
    },
    exit: {
        y:20, opacity: 0, borderRadius: 6,
        transition: {
            duration: 0.8,
            ease: [.14,.8,.4,1]
        }
    }
};

const jobContent = {
    hidden: {scaleX: 0},
    visible: {scaleX: 1,
        transition: {
            duration: 0.3, delay: 0.1, ease: [.14,.8,.4,1],
        } 

    },
    exit: {opacity: 0}
};

const jobFilterOverlay = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition:{
            duration: 0.3,
            ease: [.14,.8,.4,1]
        }
    },
    exit:{
        opacity: 0,
        transition: {
            duration: 0.3,
            ease: [.14,.8,.4,1]
        }
    }
}

const filterList = {
    hidden: {},
    visible: {
        transition:{
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
}

const filterItem = {
    hidden : {y: 50, opacity: 0},
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: [.14,.8,.4,1]
        }
    },
    exit: {
        y: 50, opacity: 0,
        transition: {
        duration: 0.3,
            ease: [.14,.8,.4,1]
        }
    }
}
function JobContainer(props) {
    return(
        <>
        <SimpleBar scrollbarMaxSize={300} className="scroll-container">
        <AnimateSharedLayout>
            <motion.ul layout className = {props.grid ? "jobs-container job-grid" : "jobs-container job-list"} variants = {jobContainer} initial = "hidden" animate = "visible" exit = "exit">
                {jobs.map(job => (
                    <Job key={job}/>
                ))}
            </motion.ul>
        </AnimateSharedLayout>
        </SimpleBar>
        <AnimatePresence>
            {props.filter && (<JobFilterOverlay toggleFilter = {props.toggleFilter}/>)}
        </AnimatePresence>
        </>
    );
}

function JobFilterOverlay(props) {
    return(
    <motion.div layout variants = {jobFilterOverlay} className="job-overlay-container" exit="exit" initial="hidden" animate="visible" onClick={props.toggleFilter}>
        <motion.div className="job-overlay">
            <span>Filter</span>
        </motion.div>
    </motion.div>
    );
}

function JobContent() {
    return (
        <>
        <motion.div layout variants = {jobContent} initial = "hidden" animate = "visible" exit="exit">
            <motion.div className="row1" />
            <motion.div className="row1" />
            <motion.div className="row1" />
        </motion.div>
        <motion.div layout variants = {jobContent} initial = "hidden" animate = "visible" exit="exit">
            <motion.div className="row2" />
            <motion.div className="row2" />
            <motion.div className="row2" />
        </motion.div>
        </>
    );
}

const Job = () => { 
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);
  
    return (
        <motion.li className ="jobs-item" layout variants = {jobItem} onClick={toggleOpen} whileHover={{filter: "brightness(1.1)"}}>
            <motion.div className="avatar" layout>
                <motion.img src={defImg} alt="" layout loading="lazy"/>
                <motion.div className="nameCont" layout>
                    <motion.div layout className="jobName">Lorem Ipsum / Dolor Sit</motion.div>
                    <motion.div layout className="jobDesc">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy</motion.div>
                </motion.div>
            </motion.div>
            <motion.div className="jobs-close-ico-wrap" layout>
                <motion.div className="close-ico" layout>
                    <motion.div className="dash" style={{rotateZ: "45deg", y: "10px"}} animate={isOpen ? {x: 0, width: "100%"} : {x: 0, width: "60%"}} exit="exit" transition={{delay: 0.3, duration: 0.4, ease: [.14,.8,.4,1]}}></motion.div>
                    <motion.div className="dash" style={{rotateZ: "135deg", y: "10px"}} animate={isOpen ? {x: 0, width: "100%"} : {x: "8px", width: "60%"}} exit="exit" transition={{delay: 0.35, duration: 0.4, ease: [.14,.8,.4,1]}}></motion.div>
                </motion.div>
            </motion.div>
            <AnimatePresence>{isOpen && <JobContent/>}</AnimatePresence>
        </motion.li>
    );
}

var jobs = Array.from(Array(20)).map(x=>Math.random())

export function Jobs () {
    const [isGrid, setIsGrid] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(1);
    const [isTimeout, setIsTimeout] = useState(false);
    function toggleGrid (){ setIsGrid(!isGrid);}
    function toggleOverlay(){setIsFilterOpen(!isFilterOpen);}
    function refreshJobs (){ setRefreshKey(refreshKey + 1);}
    
    useEffect(() => {
        const timer = new IdleTimer({
            timeout: globalTimeout,
            onTimeout: () => {
                setIsTimeout(true);
            },
            onExpired: () => {
                setIsTimeout(true);
            }

        })
        return () => {
            timer.cleanUp();
        }
    }, []);
    
    return(
    <>
    {isTimeout ? <Redirect to="/automode"/>:
    <motion.div className="page-container">
    <motion.div className="jobs-filter" variants={jobSettings} initial="hidden" animate="visible">
        <motion.span className="jobs-title" variants={jobSettingsItem}>JOBS</motion.span>
        <motion.div className="view-type" variants={jobSettingsItem}>
            <span>Ansicht:</span>        
            {isGrid ?
            (<>  
                <motion.li className="viewbutton dark" onClick={() => {toggleGrid(); refreshJobs();}} whileTap={{scale: 1.1}}><HiViewList/></motion.li>
                <motion.li className="viewbutton"><HiViewGrid/></motion.li>
            </>)
            :
            (<>
                <motion.li className="viewbutton"><HiViewList/></motion.li>
                <motion.li className="viewbutton dark" onClick={() => {toggleGrid(); refreshJobs(); }} whileTap={{scale: 1.1}}><HiViewGrid/></motion.li>
            </>)
            }
        </motion.div>
        <motion.div className="filter-button" onClick={toggleOverlay} variants={jobSettingsItem}>
            <span>Filter:</span>
            <HiPlus style={{color: "var(--prim-acc-color)", fontSize: "1.6rem", lineHeight: "0"}}/>
        </motion.div>
        <motion.div className="filter-container" variants={jobSettingsItem}>
            <SimpleBar scrollbarMaxSize={300} style={{height: "100%"}}>
                <motion.ul className="filter-list" variants={filterList}>
                    <motion.li className="filter-item" variants={filterItem}>
                        <span>Filter #1</span>
                        <HiX style={{fontSize: "1.5rem", cursor: "pointer"}}/>
                    </motion.li>
                </motion.ul>
            </SimpleBar>
        </motion.div>
    </motion.div>
    <motion.span className="job-seperator" variants={jobSeperator} initial="hidden" animate="visible"/>
    <AnimatePresence key={refreshKey} exitBeforeEnter>
        <JobContainer grid={isGrid} filter={isFilterOpen} toggleFilter={toggleOverlay}/>
    </AnimatePresence>
    </motion.div>
    }
    </>
    );
}

export default Jobs;