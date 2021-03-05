import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import ReactPlayer from 'react-player';
import { NavLink } from 'react-router-dom';
import DelayedFallback from '../../components/delayedFallback';
import defImg from "./../../components/media/default.png"
import defVid from "./../../components/media/defVid.mp4";
import './automode.css';

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
    hidden: {x: -500, opacity: 0},
    visible: {
        x: -40,
        opacity: 1,
        transition:{
            duration: 1,
            ease: [.14,.8,.4,1]
        }
    }
}

const bgText2 = {
    hidden: {x: 500, opacity: 0},
    visible: {
        x: 40,
        opacity: 1,
        transition:{
            duration: 0.8,
            ease: [.14,.8,.4,1]
        }
    }
}

const overlay = {
    hidden: {height: "0%", width: "0%"},
    visible: {height: "32%", width: "32%",
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
const VideoOverlay = (props) => {
    return(
        <motion.div className="video-overlay-container .item-4">
            <motion.div className="video-overlay" variants={overlay} initial="hidden" animate="visible" style={{borderRadius: "10px"}}>
                <motion.div className="video" variants={video} initial="hidden" animate="visible">
                    <ReactPlayer 
                        url={defVid}
                        onError={(e)=>{e.target.onError = null; e.target.url = defVid;}}
                        height="100%" width="auto" 
                        loop playing muted 
                        style={{borderRadius: "10px", background: "var(--second-layer-transparent)"}}>
                    </ReactPlayer>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

function AutoCard({ id, name, backgroundColor, image, videolink, index}) {
    var background = backgroundColor;

    if(backgroundColor === "#FDFDFD")
    {
        background = "var(--prim-acc-color)";
    }
    return (
        <>  
        <motion.li className = {"auto-grid-item item-"+ index} variants={gridItem} style={{border: "2px solid " + background}}>
            <div className="grid-container">
                <motion.div className="background-text-container">
                    <motion.div className="company-logo-full" layoutId={`company-logo-${id}`}>
                        <motion.img src={image} onError={(e)=>{e.target.onError = null; e.target.src = defImg}} alt="" variants={compLogo}/>
                    </motion.div>
                    <motion.div className="background-text" variants={bgTextCont}>
                        <motion.div className="names" variants={bgText1}>{name} {name} {name} {name} {name}</motion.div>
                        <motion.div className="names sec" variants={bgText2}>{name} {name} {name} {name} {name}</motion.div>
                        <motion.div className="names" variants={bgText1}>{name} {name} {name} {name} {name}</motion.div>
                        <motion.div className="names sec" variants={bgText2}>{name} {name} {name} {name} {name}</motion.div>
                        <motion.div className="names" variants={bgText1}>{name} {name} {name} {name} {name}</motion.div>
                        <motion.div className="names sec" variants={bgText2}>{name} {name} {name} {name} {name}</motion.div>
                        <motion.div className="names" variants={bgText1}>{name} {name} {name} {name} {name}</motion.div>  
                    </motion.div>
                </motion.div>
                {index === 4 &&  <VideoOverlay video={videolink} style={{opacity: "1 !important"}}/>}
            </div>
        </motion.li>
        </>
    );
}

function AutoMode() {
    const [companies, setCompanies] = useState(null);
    const [imageHasLoaded, setImageHasLoaded] = useState(false);

    useEffect((imageHasLoaded) => {
        const timer = setTimeout(() => {
            setImageHasLoaded(!imageHasLoaded);
        }, 500)
        return () => {
            return () => clearTimeout(timer);
        }
    }, []);

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
    }, []);

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
    }, []);

return(
    <>
    {imageHasLoaded && companies && companies.length>0 ?
    (
    <motion.div className="auto-container">
    <NavLink to="/companies" className="auto-link"/>
    
        <motion.ul className="auto-grid" variants = {gridWrapper} initial = "hidden" animate = "visible">
            {companies.map((card, index) => (
                <AutoCard key={card.id} {...card} index={index}/>
            ))}
        </motion.ul>
        <VideoOverlay/>
    </motion.div>
    )
    :
    (<DelayedFallback/>)
}
    </>
    )
}

export default AutoMode;