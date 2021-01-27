import React from 'react';
import { motion } from 'framer-motion';
import "./about.css";

export const About = () => (
    <motion.div className="about-container" initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}>
        <motion.div className="about-header">
            <span>ABOUT</span>
            <motion.div className="about-seperator"/>
        </motion.div>
    </motion.div>
)

export default About;