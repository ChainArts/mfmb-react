import React from 'react';
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import defImg from "./media/default.png"

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
    hidden: { y: 80, opacity: 0, rotateZ: 1},
    visible: {
        rotateZ: 0,
        y: 0,
        opacity: 1,
        transition: {
            staggerChildren: 0.25,
            duration: 0.8,
            ease: [.14,.8,.4,1]
        },
    },

};

const gridInfos = {
    hidden: {x: -50, opacity: 0},
    visible: {x: 0, opacity: 1,
        transition:{
            staggerChildren: 0.4,
            ease: [.14,.8,.4,1]
        } 
    } 
}

const gridContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
            ease: [.14,.8,.4,1]
        }
    }
}

const compLogo = {
    hidden: {scale: 0.3, opacity: 0},
    visible: {scale: 1, opacity: 1,
        transition: {
            duration: 0.6,
            ease: [.14,.8,.4,1]
        }
    }
}

const compName = {
    hidden: {x: 200, opacity: 0},
    visible: {x: 0, opacity: 1,
        transition: {
            duration: 0.6,
            ease: [.14,.8,.4,1]
        }
    }
}

const compSep = {
    hidden: {scaleY: 0},
    visible: {scaleY: 1,
        transition: {
            duration: 0.6,
            ease: [.14,.8,.4,1]
        }
    }
}

function Card({ id, name, title, backgroundColor, image }) {
    var color = '#efefef';
    var background = backgroundColor;

    if(backgroundColor > '#AAAAAA')
        color = '#2a2a2a';
        
    if(backgroundColor === "#FDFDFD")
    {
        background = "linear-gradient(120deg, var(--prim-acc-color) 25%,var(--sec-acc-color) 100%)";
        color = "#efefef";
    }

    return (  
    <motion.li layout className="grid-item" variants={gridItem} whileTap={{scale: 0.97}} layoutId={`card-container-${id}`}>
    <NavLink to={"companies/"+id } className={"card-open-link"}>
        <motion.div className="grid-container" variants={gridContainer}>
            <motion.div className="company-logo" layoutId={`company-logo-${id}`}>
                <motion.img src={image} onError={(e)=>{e.target.onError = null; e.target.src = defImg}} alt="..." loading="lazy" variants={compLogo}/>
            </motion.div>
            <motion.div layout className="company-name" style={{background: background, color: color}} layoutId={`company-header-${id}`}>
                <motion.span layoutId={`company-title-${id}`} variants={compName} className="comp-title">
                    <motion.span style={{fontWeight: "400"}}>{name}</motion.span>
                    <motion.span style={{fontSize: "1.2rem"}}>{title}</motion.span>
                </motion.span>
                <motion.div variants={gridInfos} className="infos">
                    <motion.div className="name-seperator" style={{backgroundColor: color}} variants={compSep}/>
                    <motion.div style={{display: "flex"}} variants={compSep}>
                        <span>INFOS</span>
                        <HiArrowRight style={{fontSize: "1.4rem"}}/>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    </NavLink>
    </motion.li>
  );
}

export function Grid({ selectedId, companies }) {
    return(
        <motion.ul className="grid" variants = {gridWrapper} initial = "hidden" animate = "visible">
            {companies.map(card => (
                <Card key={card.id} {...card} isSelected={card.id === selectedId}/>
            ))}
        </motion.ul>
    );
}

export default Grid;