import React, {useState} from 'react';
import { AnimateSharedLayout, AnimatePresence, motion } from 'framer-motion';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import "./jobs.css";
import { HiViewGrid, HiViewList, HiPlus } from "react-icons/hi";

const jobContainer = {
    hidden: { opacity: 0, scaleY: .9 , y: 200},
    visible: {
      y: 0, 
      opacity: 1,
      scaleY: 1,
      transition: {
        ease: [.14,.8,.4,1],
        delay: 0.3,
        delayChildren: 0.5,
        staggerChildren: .06,
      }
    }
};
  
const jobItem = {
    hidden: { y: 20, opacity: 0, borderRadius: 6},
    visible: {
        y: 0,
        opacity: 1,
        transition:{
            duration: 0.8,
            delayChildren: 0.5,
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

function JobContainer(props) {
    return(
        <>
        <SimpleBar scrollbarMaxSize={300} className="scroll-container">
        <AnimateSharedLayout>
            <motion.ul layout className = {props.grid ? "jobs-container job-grid" : "jobs-container job-list"}>
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
                <motion.img src="media/default.png" alt="" layout loading="lazy"/>
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
    function toggleGrid (){ setIsGrid(!isGrid);}
    function toggleOverlay(){setIsFilterOpen(!isFilterOpen);}
    function refreshJobs (){ setRefreshKey(refreshKey + 1);}

return(
    <motion.div className="page-container" variants = {jobContainer} initial = "hidden" animate = "visible" layout>
    <motion.div className="jobs-filter mobile-hide">
            <motion.span className="jobs-title">JOBS</motion.span>
            <motion.div className="view-type">
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
            <motion.div className="filter-list" onClick={toggleOverlay}>
                <span>Filter:</span>
                <HiPlus style={{color: "var(--prim-acc-color)", fontSize: "1.6rem", lineHeight: "0"}}/>
            </motion.div>
    </motion.div>
    <span className="job-seperator"/>
    <AnimatePresence key={refreshKey}>
        <JobContainer grid={isGrid} filter={isFilterOpen} toggleFilter={toggleOverlay}/>
    </AnimatePresence>
    </motion.div>
    );
}

export default Jobs;