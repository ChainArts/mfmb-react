import React from 'react';
import { motion } from 'framer-motion';
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
        ease: "easeOut",
        delay: 0.3,
        delayChildren: 0.5,
        staggerChildren: .06,
      }
    }
  };
  
  const jobItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    }
  };


var jobs = Array.from(Array(20)).map(x=>Math.random())

export const Jobs = () => (
    <SimpleBar scrollbarMaxSize={300} className="scroll-container">
    <motion.ul className = "jobs-container" variants = {jobContainer} initial = "hidden" animate = "visible">
        {jobs.map(index => (
            <motion.li key={index} className ="jobs-item" variants = {jobItem}>
            </motion.li>
        ))}
    </motion.ul>
    </SimpleBar>
)

export default Jobs;