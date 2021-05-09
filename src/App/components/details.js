import React from "react";
import QRCode from 'qrcode.react';
import ReactPlayer from 'react-player';
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";
import defImg from "./media/default.png";
import defVid from "./media/defVid.mp4";

const overlayBackdrop = {
    hidden: {scaleX: 0, originX: 0},
    visible: {scaleX: 1,
        transition: {
            duration: 0.8, ease: [.14,.8,.4,1]
        },
        transitionEnd: {
            originY: 1
        }
    },
    exit:{
        scaleY: 0,
        y: 100,
        transition: {
            duration: 0.6, delay: 0, ease: [.14,.8,.4,1]
        }
    }
};

const companyCard = {
    hidden: {scale: 1.05},
    visible: {scale: 1,
        transition: {
            duration: 0.4, delay: 0.2
        }
    },
    exit: {
        opacity: 0,
        transititon: {
            duration: 0.15, ease: [.14,.8,.4,1]
        }
    }
};

const reactPlayer = {
    hidden: {x: "-37rem", opacity: 0, scale: 0.5},
    visible: { x: "0rem", opacity:1, scale: 1,
        transition: {
            duration: 0.5, delay: 0.2, ease: [.14,.8,.4,1]
        },
        transitionEnd: {
            originY: 1
        }
    },
    exit:{
        y: "30rem", opacity: 0, scaleY: 0,
        transition: {
            duration: 0.3, ease: [.14,.8,.4,1]
        }
    }
};

const qrCode = {
    hidden: {x: "-37rem", opacity: 0, scale: 0.5},
    visible: { x: "0rem", opacity:1, scale: 1,
        transition: {
            duration: 0.5, delay: 0.3, ease: [.14,.8,.4,1]
        },
        transitionEnd: {
            originY: 1
        }
    },
    exit:{
        y: 500, opacity: 0, scaleY: 0,
        transition: {
            duration: 0.3, ease: [.14,.8,.4,1]
        }
    }
};

const gridSeperator ={
    hidden: {scaleX: 0},
    visible: {scaleX: 0.9,
        transition: {
            duration: 0.5, delay: 0.5, ease: [.14,.8,.4,1]
        }
    },
    exit:{
        scaleX: 0,
        transition: {
            duration: 0.2, ease: [.14,.8,.4,1]
        }
    }
}

const iframeCont = {
    hidden: {scaleX: 0.32, scaleY: 0, y: -100,  borderRadius: 10, originX: 0, originY: 0},
    visible: {y: 0, scaleY: 1, scaleX: 1,
        transition: {
            duration: 0.6, delay: 0.2, ease: [.14,.8,.4,1],
        },
        transitionEnd:{
            originY: 1
        }
    },
    exit:{
        scaleY: 0, y: 100,
        transition: {
            duration: 0.3, delay: 0.05, ease: [.14,.8,.4,1]
        },
    }
};

const exitIcoCont = {
    hidden: {scale: 0},
    visible: {scale: 1,
        transition: {
            duration: 0.2, delay: 0.3, ease: [.14,.8,.4,1.25],
        }
    },
    exit:{
        scale: 0,
        transition: {
            duration: 0.15, ease: [.14,.8,.4,1]
        }
    }
};

const exitIcoDash = {
    hidden: {scale: 0},
    visible: {scale: 1},
    exit:{
        scale: 0,
        transition: {
            duration: 0.15, ease: [.14,.8,.4,1]
        }
    }
};

const options = {
    hidden: {opacity: 0, scale: 0.9},
    visible: {opacity: 1, scale: 1,    
        transition:{
        delay: 0.6,
        duration: 0.3, ease: [.14,.8,.4,1]
    }
    }
}

const vid = {
    hidden: {opacity: 0},
    visible: {opacity: 1,
        transition: {
            delay: 0.6,
            duration: 0.3, ease: [.14,.8,.4,1]
        }
    }
}

function ReactPlayerFrame(props){
    return(
        <motion.div layout style={{width: "100%", height: "100%", textAlign: "center", maxHeight: "44.5rem"}} variants={vid} initial="hidden" animate="visible">
            <ReactPlayer 
                controls
                url = {props.videolink}
                onError = {(e)=>{e.target.onError = null; e.target.src = defVid; e.target.controls = false}}
                width="100%" height="100%"
                loop playing muted 
                >
            </ReactPlayer>
        </motion.div>
    )
}

export function Details({ id, companies }) {
    const {name, title, image, backgroundColor, website, videolink, content} = companies.find(item => item.id === id);
    const fallbackSrc = defImg;

    var color = '#efefef';
    if(backgroundColor > '#888888')
        color = '#2a2a2a';
    
    var accentColor = backgroundColor;
    var background = backgroundColor;
    if(backgroundColor === "#FDFDFD")
    {
        accentColor = "var(--sec-acc-color)";
        background = "linear-gradient(120deg, var(--prim-acc-color) 50%,var(--sec-acc-color) 100%)";
        color = '#EFEFEF'
    }

    return (
    <>
    <motion.div
        className="overlay"
    >
    <motion.div className="grid-container open">
    <motion.div className="overlay-backdrop" variants={overlayBackdrop} initial="hidden" animate="visible" exit="exit"/>
    <motion.div className="company-content" layoutId={`company-container-${id}`}>
        <NavLink to="/companies" className="card-open-link">
            <motion.div className="company" variants={companyCard} initial="hidden" animate="visible" exit="exit" whileTap={{scale: 0.97}}>
                <motion.div className="close-ico-wrap" variants={exitIcoCont} initial="hidden" animate="visible" exit="exit">
                    <motion.div className="close-ico" initial={{scale: 1}}>
                        <motion.div className="dash" style={{rotateZ: "-45deg"}} variants={exitIcoDash} initial="hidden" animate="visible" exit="exit" transition={{delay: 0.6, duration: 0.4, ease:[.14,.8,.4,1.25]}}></motion.div>
                        <motion.div className="dash" style={{rotateZ: "45deg"}} variants={exitIcoDash} initial="hidden" animate="visible" exit="exit" transition={{delay: 0.65, duration: 0.4, ease:[.14,.8,.4,1.25]}}></motion.div>
                    </motion.div>
                </motion.div>
                <motion.div className="company-logo" layoutId={`company-logo-${id}`}>
                    <img src={image} onError={(e)=>{e.target.onError = null; e.target.src = fallbackSrc}} alt=""/>
                </motion.div>
                <motion.div layout className="company-name" style={{background: background, color: color}} layoutId={`company-header-${id}`}>
                    <motion.span layoutId={`company-title-${id}`} className="comp-title" style={{textAlign: "center", maxWidth: "100%"}}>
                        <motion.span style={{fontWeight: "400", maxWidth: "100%"}}>{name}</motion.span>
                        <motion.span style={{fontSize: "1.2rem", maxWidth: "100%"}}>{title}</motion.span>
                    </motion.span>
                </motion.div>
            </motion.div>
        </NavLink>
        <motion.div className="react-player grid-item" variants={reactPlayer} initial="hidden" animate="visible" exit="exit">
            {content !== "" ?
                <ReactPlayerFrame videolink={videolink}/> 
                :
                <div className="iframe-placeholder">No Additional Content!</div>
            }
        </motion.div>
        <motion.div className="company-options grid-item" variants={qrCode} initial="hidden" animate="visible" exit="exit">
            <NavLink to={{pathname: '/jobs', jobProps: {filter: name, setFilter: true}}}>
                <motion.div layout className="option" variants={options} initial="hidden" animate="visible" whileTap={{scale: 0.85}} style={{color: color, background: background}}>
                        <span>Jobs</span>
                        <HiChevronRight style={{fontSize: "1.6rem", lineHeight: "0"}}/>
                    </motion.div>
                </NavLink>
            <motion.div layout className="qr-code" variants={options} initial="hidden" animate="visible">
                <QRCode
                    id = {id}
                    value = {website}
                    bgColor="transparent"
                    fgColor="#eeeeee"
                    size={200}
                    includeMargin={true}
                />
            </motion.div>
            <motion.span className="company-link"variants={options} initial="hidden" animate="visible">{website}</motion.span>
        </motion.div>
        <motion.div className="grid-seperator" style={{backgroundColor: accentColor}} variants={gridSeperator} initial="hidden" animate="visible" exit="exit"/>
        <motion.div className="content-container grid-item" layout variants={iframeCont} initial="hidden" animate="visible" exit="exit">
        {content !== "" ?
                <motion.div className="iframe-container" initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.8, duration: 0.3}}>
                    <iframe title="test" src={content + "#toolbar=0"} width="100%" height="100%" scrolling="yes">Loading...</iframe>
                </motion.div>
                :
                <ReactPlayerFrame videolink={videolink}/>
            }
        </motion.div>
        </motion.div>
    </motion.div>
    </motion.div>
    </>
  );
}

export default Details
