import React from "react";
import { companies } from "./data";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const gridwrapper = {
    hidden: { opacity: 1},
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.1,
        delayChildren: 0.1,
        staggerChildren: .12,
      }
    }
  };
  
  const griditem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

function Card({ id, name, backgroundColor, image}) {

  return (
    /*<li className="grid-item">
      <div className="grid-container">
        <motion.div className="grid-content" layoutId={`grid-content-${id}`}>
          <motion.div
            className="company-logo"
            layoutId={`company-logo-${id}`}
          >
            <img className="card-image" src={`media/${id}.png`} alt="" />
          </motion.div>
          <motion.div
            className="title-container"
            layoutId={`title-container-${id}`}
          >
            <span>{name}</span>
          </motion.div>
        </motion.div>
      </div>
      <Link to={id} className={`card-open-link`} />
    </li>*/
    <motion.li className="grid-item" variants={griditem}>
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
	  <Link to={id} className={`card-open-link`} />
    </motion.li>
  );
}

export function Grid({ selectedId }) {
  return (
    <motion.ul className="grid" variants = {gridwrapper} initial = "hidden" animate = "visible">
      {companies.map(card => (
        <Card key={card.id} {...card} isSelected={card.id === selectedId} />
      ))}
    </motion.ul>
  );
}