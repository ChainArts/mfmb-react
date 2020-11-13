import React from "react";
import { companies } from "../../data";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const gridWrapper = {
    hidden: {},
    visible: { 
        transition: {
            delay: 0.1,
            delayChildren: 0.05,
            staggerChildren: .10,
            ease: [.14,.8,.4,1]
      }
    }
};
  
const gridItem = {
    hidden: { y: 50, opacity: 0},
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            ease: [.14,.8,.4,1]
        },
    },
};

function Card({ id, name, backgroundColor, image}) {

  return (
    <motion.li className="grid-item" variants={gridItem} whileTap={{scale: 0.95}}>
    <NavLink to={id} className={`card-open-link`}>
      <div className="grid-container">
        <div className="company-logo">
          <img src={image} alt=""/>
        </div>
        <div className="company-name" style={{backgroundColor: backgroundColor}}>
            {(backgroundColor < '#AAAAAA') ?
              (<span style={{color:  '#efefef'}}>{name}</span>)
              :
              (<span style={{color: '#2a2a2a'}}>{name}</span>)
            }
        </div>
      </div>
      </NavLink>
    </motion.li>
  );
}

export function Grid({ selectedId }) {
  return (
    <motion.ul className="grid" variants = {gridWrapper} initial = "hidden" animate = "visible">
      {companies.map(card => (
        <Card key={card.id} {...card} isSelected={card.id === selectedId} />
      ))}
    </motion.ul>
  );
}