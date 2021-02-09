import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Redirect } from 'react-router-dom';
import "./about.css";
import SimpleBar from 'simplebar-react';
import IdleTimer from './../../components/idleTimer';
import { globalTimeout } from './../../App';


export function About () {
    const [isTimeout, setIsTimeout] = useState(false);

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
    }
    </>
)}

export default About;