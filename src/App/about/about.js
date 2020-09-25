import React from 'react';
import { motion } from 'framer-motion';
import "./about.css";

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

export const About = () => (
    <motion.ul  className = "about-container" variants = {container} initial = "hidden" animate = "visible">
        {[0, 1, 2, 3].map(index => (
            <motion.li key={index} className = "about-item" variants = {item}/>
        ))}
    </motion.ul>
)

export default About;