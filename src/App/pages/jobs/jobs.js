import React from 'react';
import { motion } from 'framer-motion';
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
        staggerChildren: .1,
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

export const Jobs = () => (
    <motion.ul  className = "jobs-container" variants = {jobContainer} initial = "hidden" animate = "visible">
        {[0, 1, 2, 3].map(index => (
            <motion.li key={index} className = {"jobs-item" + index} variants = {jobItem}/>
        ))}
    </motion.ul>
)

export default Jobs;