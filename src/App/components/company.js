import React from "react";
import QRCode from 'qrcode.react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { companies } from "../data";

const overlayBackdrop = {
    hidden: {scaleX: 0, originX: 0, borderRadius: 10},
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

const overlayShadow = {
    hidden: {boxShadow: "0px 0px 0px #111", scale: 1.05},
    visible: { boxShadow: "0px 2px 11px #111", scale: 1,
        transition: {
            duration: 0.4, delay: 0.2
        }
    },
    exit:{
        boxShadow: "0px 0px 0px #111",
        transition: {
            duration: 0.05, delay: 0, ease: [.14,.8,.4,1]
        }
    }
};

const reactPlayer = {
    hidden: {x: "-37rem", opacity: 0, scale: 0},
    visible: { x:0, opacity:1, scale: 1,
        transition: {
            duration: 0.5, delay: 0.15, ease: [.14,.8,.4,1]
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
    visible: { x:0, opacity:1, scale: 1,
        transition: {
            duration: 0.5, delay: 0.3, ease: [.14,.8,.4,1]
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
            duration: 0.2, delay: 0.3, ease: [.14,.8,.4,1],
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

export function Company({ id }) {
    const { name, image, backgroundColor, website, videolink } = companies.find(item => item.id === id);
    var accentColor = backgroundColor;
    if(backgroundColor === "#232529")
    {
        accentColor = "#e20080";   
    }
    return (
    <>
    <motion.div
        className="overlay"
    >
    <motion.div className="grid-container open">
    <motion.div className="overlay-backdrop" variants={overlayBackdrop} initial="hidden" animate="visible" exit="exit"/>
    <motion.div className="company-content" layoutId={`company-container-${id}`}>
    <NavLink to="/" className="card-open-link">
        <motion.div className="company" variants={overlayShadow} initial="hidden" animate="visible" exit="exit">
            <motion.div className="close-ico-wrap" variants={exitIcoCont} initial="hidden" animate="visible" exit="exit">
                <motion.div className="close-ico" initial={{scale: 1}}>
                    <motion.div className="dash" style={{rotateZ: "-45deg"}} variants={exitIcoDash} initial="hidden" animate="visible" exit="exit" transition={{delay: 0.6, duration: 0.4, ease:[.14,.8,.4,1]}}></motion.div>
                    <motion.div className="dash" style={{rotateZ: "45deg"}} variants={exitIcoDash} initial="hidden" animate="visible" exit="exit" transition={{delay: 0.65, duration: 0.4, ease:[.14,.8,.4,1]}}></motion.div>
                </motion.div>
            </motion.div>
            <motion.div className="company-logo" layoutId={`company-logo-${id}`}>
                <img src={"../"+image} alt=""/>
            </motion.div>
            <motion.div className="company-name" style={{backgroundColor: backgroundColor}} layoutId={`company-name-${id}`}>
                {(backgroundColor < '#AAAAAA') ?
                    (<span style={{color:  '#efefef'}}>{name}</span>)
                    :
                    (<span style={{color: '#2a2a2a'}}>{name}</span>)
                }
            </motion.div>
        </motion.div>
        </NavLink>
        <motion.div className="react-player grid-item" variants={reactPlayer} initial="hidden" animate="visible" exit="exit">
            <video height="100%" width="auto" controls loop autoPlay muted style={{borderRadius: "10px"}}>
                <source src={"../"+videolink}/>
            </video>
        </motion.div>
        <motion.div className="company-qr-code grid-item" variants={qrCode} initial="hidden" animate="visible" exit="exit">
            <span style={{display: "block"}}>{website}</span>
            <QRCode
                id = {id}
                value = {website}
                bgColor="#3b3e43"
                fgColor="#eeeeee"
                size={200}
                includeMargin={true}
            />
        </motion.div>
        <motion.div className="grid-seperator" style={{backgroundColor: accentColor}} variants={gridSeperator} initial="hidden" animate="visible" exit="exit"/>
        <motion.div className="content-container grid-item" layout variants={iframeCont} initial="hidden" animate="visible" exit="exit">
            <div className="content-left" >
            <SimpleBar className="iframe-content" scrollbarMaxSize={150}>
                <div className="iframe-container">
                    <span>IFrame Content</span>
                </div>
            </SimpleBar>
            </div>
            <motion.div className="content-right">

            </motion.div>
        </motion.div>
        </motion.div>
    </motion.div>
    </motion.div>
    </>
  );
}
