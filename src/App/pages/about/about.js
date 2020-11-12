import React from 'react';
import { motion } from 'framer-motion';
import "./about.css";

const aboutContainer = {
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
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    }
  };

export const About = () => (
    <motion.ul  className = "about-container" variants = {aboutContainer} initial = "hidden" animate = "visible">
        {[0, 1, 2, 3].map(index => (
            <motion.li key={index} className = {"about-item" + index} variants = {item}/>
        ))}
    </motion.ul>
)

export default About;