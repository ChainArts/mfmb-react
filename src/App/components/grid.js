import React, { Suspense } from 'react';
import { companies } from "../data";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {HiArrowRight } from "react-icons/hi";

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
    hidden: { y: 80, opacity: 0},
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: [.14,.8,.4,1]
        },
    },
    exit: {
        y: -50, opacity: 0,
        transition: {
            duration: 0.2,
            ease: [.14,.8,.4,1]
        },
    }
};



function Card({ id, name, backgroundColor, image}) {
    var color;
    if(backgroundColor < '#AAAAAA')
        color = '#efefef';
    else
        color = '#2a2a2a';

    return (  
    <motion.li className="grid-item" variants={gridItem} whileTap={{scale: 0.97}} exit="exit" >
    <NavLink to={"companies/"+id} className={`card-open-link`}>
      <div className="grid-container">
        <motion.div className="company-logo" layoutId={`company-logo-${id}`}>
          <img src={image} alt=""/>
        </motion.div>
        <motion.div className="company-name" style={{backgroundColor: backgroundColor, color: color}} layoutId={`company-name-${id}`}>
            <span>{name}</span>
            <motion.div layout className="infos">
                <motion.div className="name-seperator" style={{backgroundColor: color}} initial={{height: 0}} animate={{height: "100%"}}/>
                <span>INFOS</span><HiArrowRight style={{fontSize: "1.4rem"}}/></motion.div>
        </motion.div>
      </div>
      </NavLink>
    </motion.li>
  );
}

export function Grid({ selectedId }) {
    return (
        <Suspense fallback={<h1>loading</h1>}>
        <motion.ul className="grid" variants = {gridWrapper} initial = "hidden" animate = "visible">
            {companies.map(card => (
                <Card key={card.id} {...card} isSelected={card.id === selectedId} />
            ))}
        </motion.ul>
        </Suspense>
    );
}