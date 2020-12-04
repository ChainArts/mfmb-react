import React, {useState} from 'react';
import { AnimateSharedLayout, AnimatePresence, motion } from 'framer-motion';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import "./jobs.css";

const jobContainer = {
    hidden: { opacity: 0, scale: .1, y: 500},
    visible: {
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: {
        ease: [.14,.8,.4,1],
        delay: 0.3,
        delayChildren: 0.5,
        staggerChildren: .06,
      }
    }
};
  
const jobItem = {
    hidden: { y: 20, opacity: 0, borderRadius: 10},
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

const exitIcoCont = {
    hidden: {scale: 0},
    visible: {scale: 1,
        transition: {
            duration: 0.3, delay: 0.2, ease: [.14,.8,.4,1.25],
        }
    },
    exit:{
        scale: 0,
        transition: {
            duration: 0.10, ease: [.14,.8,.4,1]
        }
    }
};

const exitIcoDash = {
    hidden: {scale: 0},
    visible: {scale: 1,
},
    exit:{
        scale: 0,
        transition: {
            duration: 0.10, ease: [.14,.8,.4,1]
        }
    }
};
function JobContent() {
    return (
        <>
        <motion.div className="jobs-close-ico-wrap" variants={exitIcoCont} initial="hidden" animate="visible" exit="exit" layout>
            <motion.div className="close-ico" initial={{scale: 1}}>
                <motion.div className="dash" style={{rotateZ: "-45deg"}} variants={exitIcoDash} initial="hidden" animate="visible" exit="exit" transition={{delay: 0.3, duration: 0.4, ease:[.14,.8,.4,1.25]}}></motion.div>
                <motion.div className="dash" style={{rotateZ: "45deg"}} variants={exitIcoDash} initial="hidden" animate="visible" exit="exit" transition={{delay: 0.35, duration: 0.4, ease:[.14,.8,.4,1.25]}}></motion.div>
            </motion.div>
        </motion.div>
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

function Job() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);
  
    return (
      <motion.li className ="jobs-item" layout variants = {jobItem} onClick={toggleOpen}>
            <motion.div className="avatar" layout style={isOpen ? {float: "right"} : {float: "left"}}/>
            <AnimatePresence>{isOpen && <JobContent/>}</AnimatePresence>
      </motion.li>
    );
  }

var jobs = Array.from(Array(20)).map(x=>Math.random())

export const Jobs = () => (
    <SimpleBar scrollbarMaxSize={300} className="scroll-container">
    <AnimateSharedLayout>
    <motion.ul className = "jobs-container" variants = {jobContainer} initial = "hidden" animate = "visible">
        {jobs.map(job => (
            <Job key={job}/>
        ))}
    </motion.ul>
    </AnimateSharedLayout>
    </SimpleBar>
)

export default Jobs;