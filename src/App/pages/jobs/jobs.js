import React, {useState, useRef} from 'react';
import { AnimateSharedLayout, AnimatePresence, motion, useElementScroll, useTransform } from 'framer-motion';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import "./jobs.css";
import { HiViewGrid, HiViewList, HiPlus } from "react-icons/hi";

const jobContainer = {
    hidden: { opacity: 0, scaleY: .1, y: 200},
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
            delayChildren: 0.5,
            staggerChildren: .06,
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

const Job = (props)  => {

    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);
  
    return (
        <motion.li className ="jobs-item" layout variants = {jobItem} onClick={toggleOpen} afterTransition={{style: "scale: props.scale, opacity: props.opacity"}} whileHover={{filter: "brightness(1.1)"}}>
            <motion.div className="avatar" layout>
                <motion.img src="media/default.png" alt="" layout/>
                <motion.div className="nameCont" layout>
                    <motion.div className="jobName">Lorem Ipsum / Dolor Sit</motion.div>
                    <motion.div className="jobDesc">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy</motion.div>
                </motion.div>
            </motion.div>
            <motion.div className="jobs-close-ico-wrap" layout>
                <motion.div className="close-ico">
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
    const ref = useRef();
    const { scrollYProgress } = useElementScroll(ref)
    const scaleAnim = useTransform(scrollYProgress, [0.9, 1], [1,1.2])

return(
    <motion.div className="page-container" variants = {jobContainer} initial = "hidden" animate = "visible">
    <motion.div className="jobs-filter">
            <motion.span className="jobs-title">JOBS</motion.span>
            <motion.div className="view-type">
                <span>View:</span>
                    <motion.li className="viewbutton"><HiViewGrid style={{fontSize: "1.6rem"}}/></motion.li>
                    <motion.li className="viewbutton"><HiViewList style={{fontSize: "1.6rem"}}/></motion.li>
            </motion.div>
            <motion.div className="filter-list">
                <span>Filters</span>
                <HiPlus/>
            </motion.div>
    </motion.div>
    <motion.span className="job-seperator"/>
    <SimpleBar scrollbarMaxSize={300} className="scroll-container" scrollableNodeProps={{ ref: ref }}>
        <AnimateSharedLayout>
            <motion.ul className = "jobs-container">
                {jobs.map(job => (
                    <Job key={job} scale={scaleAnim}/>
                ))}
            </motion.ul>
        </AnimateSharedLayout>
        </SimpleBar>
    </motion.div>
    );
}

export default Jobs;