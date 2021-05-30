import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import ReactPlayer from 'react-player';
import { NavLink } from 'react-router-dom';
import DelayedFallback from '../../components/delayedFallback';
import defImg from "./../../components/media/default.png"
import defVid from "./../../components/media/defVidHq.mp4";
import './automode.css';

const autoContainer = {
    hidden: {},
    visible: {},
    exit: {opacity: 0,
        transition: {
            duration: 0.5,
            ease: [.14,.8,.4,1]
        }
        
    }
}

const gridWrapper = {
    hidden: {},
    visible: { 
        transition: {
            delayChildren: 0.25,
            staggerChildren: .08,
            ease: [.14,.8,.4,1]
      }
    }
};

const gridItem = {
    hidden: { y: 120, opacity: 0, scale: 0.9},
    visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 1,
            ease: [.14,.8,.4,1]
        },
    }
};

const compLogo = {
    hidden: {scale: 0.3, opacity: 0},
    visible: {scale: 1, opacity: 1,
        transition: {
            duration: 0.6,
            ease: [.14,.8,.4,1]
        }
}
}

const bgTextCont = {
    hidden: {},
    visible:{
        transition: {
            staggerChildren: 0.1,
        }
    }
}

const bgText1 = {
    hidden: {x: -300, opacity: 0},
    visible: {
        x: -40,
        opacity: 0.25,
        transition:{
            duration: 1,
            ease: [.14,.8,.4,1]
        }
    }
}

const bgText2 = {
    hidden: {x: 300, opacity: 0},
    visible: {
        x: 40,
        opacity: 0.45,
        transition:{
            duration: 0.8,
            ease: [.14,.8,.4,1]
        }
    }
}

const overlay = {
    hidden: {height: "0%", width: "0%"},
    visible: {height: "100%", width: "100%",
        transition: {
            delay: 2,
            duration: 0.8,
            ease: [.14,.8,.4,1]
        }
    }
}

const video = {
    hidden: {opacity: 0},
    visible: {opacity: 1,
        transition: {
            duration: 0.3,
            delay: 3,
            ease: [.14,.8,.4,1]
        }
    }
}

const infoBox = {
    hidden: {x: 300, opacity: 0},
    visible: {x: 0, opacity: 0.8,
        transition: {
            duration: 0.3,
            delay: 3.3,
            ease: [.14,.8,.4,1],
            staggerChildren: 0.15,
            delayChildren: 2.9,
        }
    }
}

const seperator = {
    hidden: {scaleX: 0},
    visible: {scaleX: 1,
    transition: {
        duration: 0.4,
        ease: [.14,.8,.4,1]
        }
    }
}

const title = {
    hidden: {opacity: 0},
    visible: {opacity: 1},
    transition: {
        duration: 0.2,
        ease: [.14,.8,.4,1]
    }
}
const VideoOverlay = (props) => {
    const [play, setPlay] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setPlay(true);
        }, 3000);

        return () => clearTimeout(timeout);
    },[])

    return(
        <>
        <motion.div className="video-overlay-container .item-4">
            <motion.div className="video-overlay" variants={overlay} initial="hidden" animate="visible" style={{borderRadius: "10px"}}>
                <motion.div className="video" variants={video} initial="hidden" animate="visible">
                    <ReactPlayer
                        url={props.video}
                        onError={(e)=>{e.target.onError = null; e.target.src = defVid;}}
                        height="100%" width="auto"
                        playing={play} muted
                        onEnded={(e) => props.refresh(Math.random())}
                        style={{borderRadius: "10px", background: "transparent"}}>
                    </ReactPlayer>
                </motion.div>
            </motion.div>
        </motion.div>
        <motion.div className="name-overlay-container" variants={infoBox}>
            <motion.span style={{fontSize: "1.2rem", fontWeight: 400}} variants={title}>{props.name}</motion.span>
            <motion.span className="name-overlay-seperator" variants={seperator}/>
            <motion.span style={{fontWeight: 300}} variants={title}>{props.title}</motion.span>
        </motion.div>
        </>
    )
}

function AutoCard({ id, name, title, backgroundColor, image, videolink, index, refresh}) {
    var background = backgroundColor;

    if(backgroundColor === "#FDFDFD")
    {
        background = "var(--prim-acc-color)";
    }


    return (
        <>
        {index === 4 ? (<VideoOverlay video={videolink} name={name} title={title} refresh={refresh}/>)

        :(
        <motion.li className = {"auto-grid-item item-"+ index} variants={gridItem} style={{border: "2px solid " + background}}>
            <div className="grid-container">
                <motion.div className="background-text-container">
                    <motion.div className="company-logo-full" layoutId={`company-logo-${id}`}>
                        <motion.img src={image} onError={(e)=>{e.target.onError = null; e.target.src = defImg}} alt="" variants={compLogo}/>
                    </motion.div>
                    <motion.div className="background-text" variants={bgTextCont} style={{color: background}}>
                        <motion.div className="names" variants={bgText1}>{name} {name} {name} {name} {name}</motion.div>
                        <motion.div className="names sec" variants={bgText2}>{name} {name} {name} {name} {name}</motion.div>
                        <motion.div className="names" variants={bgText1}>{name} {name} {name} {name} {name}</motion.div>
                        <motion.div className="names sec" variants={bgText2}>{name} {name} {name} {name} {name}</motion.div>
                        <motion.div className="names" variants={bgText1}>{name} {name} {name} {name} {name}</motion.div>
                        <motion.div className="names sec" variants={bgText2}>{name} {name} {name} {name} {name}</motion.div>
                        <motion.div className="names" variants={bgText1}>{name} {name} {name} {name} {name}</motion.div>  
                    </motion.div>
                </motion.div>
                
            </div>
        </motion.li>
        )}
        </>
    );
}

function AutoMode() {
    const [companies, setCompanies] = useState(null);
    const [imageHasLoaded, setImageHasLoaded] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);


    useEffect((imageHasLoaded) => {
        const timer = setTimeout(() => {
            setImageHasLoaded(!imageHasLoaded);
        }, 500)
        return () => {
            return () => clearTimeout(timer);
        }
    }, [refreshTrigger]);
/*
    useEffect(() => {
        const requestOptions = {
            headers: {'Content-Type': 'application/json', 'Accept':'application/json'},
        };
        fetch('http://localhost:5500/getAutoData', requestOptions)
            .then(function(res){
                return res.json();
            })
            .then(companies=> {
                setCompanies(companies)
            })            
            .catch(err => console.error(err));
    }, [refreshTrigger]);
*/
    useEffect(() => {
        const requestOptions = {
            headers: {'Content-Type': 'application/json', 'Accept':'application/json'},
        };
        fetch('http://localhost:5500/run', requestOptions)
            .then(function(res){
                return res.json();
            })
            .then(companies=> {
                setCompanies(companies)
            })            
            .catch(err => console.error(err));
    }, [refreshTrigger]);

return(
    <>
    <AnimatePresence exitBeforeEnter>
    {imageHasLoaded && companies && companies.length>0 ?
    (
    <motion.div className="auto-container" variants = {autoContainer} initial = "hidden" animate = "visible" exit="exit" key={refreshTrigger}>
    <NavLink to="/companies" className="auto-link"/>
        <motion.ul className="auto-grid" variants = {gridWrapper} initial = "hidden" animate = "visible">
            {companies.map((card, index) => (
                <AutoCard key={card.id} {...card} index={index} refresh={setRefreshTrigger}/>
            ))}
        </motion.ul>
    </motion.div>
    )
    :
    (<DelayedFallback/>)
}
    </AnimatePresence>
    </>
    )
}

export default AutoMode;