import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Redirect } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import "./about.css";
import SimpleBar from 'simplebar-react';
import IdleTimer from './../../components/idleTimer';
import LoremIpsum from 'react-lorem-ipsum';
import { globalTimeout } from './../../App';
import {HiChevronDown} from 'react-icons/hi';
import defImg from './../../components/media/default.png'
import htlLogo from './../../components/media/HTL_Hollabrunn_Logo.png'
import transp from './../../components/media/transparent.png'

const headerWrapper = {
    hidden: {},
    visible: { 
        transition: {
            delay: 0.5,
            delayChildren: 0.1,
            staggerChildren: .4,
      }
    }
};

const line = {
    hidden: {},
    visible: { 
        transition: {
            staggerChildren: .075,
      }
    }
};

const word = {
    hidden: { y: 100, opacity: 0},
    visible: {y: 0, opacity: 1,
        transition: {
            duration: 0.8,
            ease: [.14,.8,.4,1]
        }
    }
}




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
                <motion.img src={defImg} alt="" initial={{y: -150}} animate={{y: 0}} transition={{delay: 0.4, duration: 0.8, ease: [.14,.8,.4,1]}}/>
                <motion.div className="about-title" initial={{y: -150}} animate={{y: 0}} transition={{delay: 0.1, duration: 0.8, ease: [.14,.8,.4,1]}}>ABOUT</motion.div>
                <motion.img src={htlLogo} alt="" initial={{y: -150}} animate={{y: 0}} transition={{delay: 0.4, duration: 0.8, ease: [.14,.8,.4,1]}}/>
            </motion.div>
            <motion.div className="about-seperator" initial={{width: "0%"}} animate={{width: "100%"}} transition={{delay: 0.3, duration: 0.8, ease: [.14,.8,.4,1]}}/>
        </motion.div>
        <motion.div className="about-description" variants={headerWrapper} initial="hidden" animate="visible">
            <motion.div className="line1" variants={line}>
                <motion.div variants={word}>MFMB</motion.div>&nbsp;
                <motion.div variants={word}>Content</motion.div>&nbsp;
                <motion.div variants={word}>Plattform</motion.div>&nbsp;
                <motion.div variants={word}>für</motion.div>&nbsp;
                <motion.div variants={word}>Informationen,</motion.div>&nbsp;
            </motion.div>
            <motion.div className="line2" variants={line}>
                <motion.div variants={word}>Werbung</motion.div>&nbsp;
                <motion.div variants={word}>und</motion.div>&nbsp;
                <motion.div variants={word}>mehr</motion.div>&nbsp;
            </motion.div>
        </motion.div>
        <motion.div className="about-scroll-chevron" variants={scrollChevron} animate="animate">
          <HiChevronDown/>
        </motion.div>
        </>
    )
}

function AboutDescription () {
    return (
        <>
        <section className="about-section" style={{height: "68vh"}}>
            <div className="col-left">
                <img className="transpar" src={transp} alt=""/>
            </div>
            <div className="col-right" style={{display: "block"}}>
                <div className="description">
                    <hr/>
                    <p>
                        <LoremIpsum/>
                    </p>
                </div>
            </div>
        </section>
    </>
    )
}

function AboutTeam () {
    return (
        <>
        <section className="about-section">
            <div className="col-left">
                <img src="https://picsum.photos/1280/720" alt=""/>
            </div>
            <div className="col-right">
                <div className="person-content">
                    <hr/>
                    <h3>Martin Platajs</h3>
                    <p>
                        Datenbank Design <br/>
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
                    <p>
                        UI / UX Design <br/>
                        Mockups <br/>
                        3D Art <br />
                        Animations 
                    </p>
                </div>
            </div>
            <div className="col-right">
                <img src="https://picsum.photos/1280/720" alt=""/>
            </div>
        </section>
        <section className="about-section">
            <div className="col-left">
                <img src="https://picsum.photos/1280/720" alt=""/>
            </div>
            <div className="col-right">
                <div className="person-content">
                    <hr/>
                    <h3>Tobias Meichenitsch</h3>
                    <p>
                        Firmen Portal <br/>
                        Typo3 Management <br/>
                        File Upload <br/>
                    </p>
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
                <SwiperSlide><img src="https://picsum.photos/id/1/1280/720" alt=""/></SwiperSlide>
                <SwiperSlide><img src="https://picsum.photos/id/2/1280/720" alt=""/></SwiperSlide>
                <SwiperSlide><img src="https://picsum.photos/id/3/1280/720" alt=""/></SwiperSlide>
                <SwiperSlide><img src="https://picsum.photos/id/4/1280/720" alt=""/></SwiperSlide>
                <SwiperSlide><img src="https://picsum.photos/id/5/1280/720" alt=""/></SwiperSlide>
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
        <span>KONZEPT</span>
        <AboutDescription/>
        <span>TEAM</span>
        <AboutTeam/>
        <CompanyPortal/>
    </motion.div>
    </SimpleBar>
    }
    </>
)}

export default About;