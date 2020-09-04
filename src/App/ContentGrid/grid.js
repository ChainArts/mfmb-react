import React from "react";
import { companies } from "./data";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Card({ id, name}) {
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
          <img src={`media/${id}.png`} alt=""/>
        </div>
        <div className="company-name">
          <span>{name}</span>
        </div>
      </div>
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