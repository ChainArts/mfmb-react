import React from 'react';
import { motion } from 'framer-motion';
import "./about.css";
import SimpleBar from 'simplebar-react';

export const About = () => (
    <SimpleBar scrollbarMaxSize={300} className="about-scroll">
    <motion.div className="about-container" initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}>
        <motion.div className="about-header">
            <motion.div className="about-header-content">
                <span>ABOUT</span>
            </motion.div>
            <motion.div className="about-seperator"/>
        </motion.div>
    </motion.div>
    </SimpleBar>
)

export default About;