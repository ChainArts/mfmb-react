import React from "react";
import { companies } from "./data";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
    <li className="grid-item">
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
    </li>
  );
}

export function Grid({ selectedId }) {
  return (
    <div className="grid">
      {companies.map(card => (
        <Card key={card.id} {...card} isSelected={card.id === selectedId} />
      ))}
    </div>
  );
}