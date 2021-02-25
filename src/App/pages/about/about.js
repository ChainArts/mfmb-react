import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Redirect } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import "./about.css";
import SimpleBar from 'simplebar-react';
import IdleTimer from './../../components/idleTimer';
import { globalTimeout } from './../../App';
import {HiChevronDown} from 'react-icons/hi';

const scrollChevron = {
    animate: {
        opacity: [0, 1, 1, 0],
        y: ["-6rem","0rem"],
        transition: {
            duration: 0.8,
            ease: [.14,.8,.4,1],
            repeat: "Infinity",
            repeatDelay: 0.3,
            times: [0, 0.33, 0.66, 1]
        }
    }
}


function AboutHero () {
    return(
        <>
        <motion.div className="about-header">
            <motion.div className="about-header-content">
                <div className="about-title">ABOUT</div>
            </motion.div>
            <motion.div className="about-seperator"/>
        </motion.div>
        <motion.div className="about-description">
            MFMB Content Plattform für Informationen, Werbung und mehr
        </motion.div>
        <motion.div className="about-scroll-chevron" variants={scrollChevron} animate="animate">
          <HiChevronDown/>
        </motion.div>
        </>
    )
}

function AboutTeam () {
    return (
        <>
        <section className="about-section">
            <div className="col-left">
                <img src="https://picsum.photos/1280/720"/>
            </div>
            <div className="col-right">
                <div className="person-content">
                    <hr/>
                    <h3>Martin Platajs</h3>
                    <p>Datenbank Design <br/>
                       Daten Austausch <br/>
                       Backend Funktionen
                    </p>
                </div>
            </div>
        </section>
        <section className="about-section">
            <div className="col-left">
                <div className="person-content">
                    <hr/>
                    <h3>Maximilian Roll</h3>
                    <p>UI / UX Design</p>
                </div>
            </div>
            <div className="col-right">
                <img src="https://picsum.photos/1280/720"/>
            </div>
        </section>
        <section className="about-section">
            <div className="col-left">
                <img src="https://picsum.photos/1280/720"/>
            </div>
            <div className="col-right">
                <div className="person-content">
                    <hr/>
                    <h3>Tobias Meichenitsch</h3>
                    <p>Firmen Portal</p>
                </div>
            </div>
        </section>
    </>
    )
}

function CompanyPortal () {
    return(
        <>
        <span>Firmen Portal</span>
        <div className = "slide-swiper-container">
            <Swiper speed={300} slidesPerView={3} spaceBetween={500} loop={true}>
                <SwiperSlide><img src="https://picsum.photos/id/1/1280/720"/></SwiperSlide>
                <SwiperSlide><img src="https://picsum.photos/id/2/1280/720"/></SwiperSlide>
                <SwiperSlide><img src="https://picsum.photos/id/3/1280/720"/></SwiperSlide>
                <SwiperSlide><img src="https://picsum.photos/id/4/1280/720"/></SwiperSlide>
                <SwiperSlide><img src="https://picsum.photos/id/5/1280/720"/></SwiperSlide>
            </Swiper>
        </div>
        </>
    )
}


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
        <AboutHero/>
        <span>TEAM</span>
        <AboutTeam/>
        <CompanyPortal/>
    </motion.div>
    </SimpleBar>
    }
    </>
)}

export default About;