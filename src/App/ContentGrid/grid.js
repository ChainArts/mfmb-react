import React from "react";
import { companies } from "./data";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Card({ id, name}) {
  return (
    <li className="grid-item">
      <div className="card-content-container">
        <motion.div className="card-content" layoutId={`card-container-${id}`}>
          <motion.div
            className="card-image-container"
            layoutId={`card-image-container-${id}`}
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