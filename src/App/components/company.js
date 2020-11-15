import React from "react";
import QRCode from 'qrcode.react';
import { motion } from "framer-motion";
import { LoremIpsum } from "react-lorem-ipsum";
import { NavLink } from "react-router-dom";
import { companies } from "../data";

export function Company({ id }) {
    const { name, image, backgroundColor, website } = companies.find(item => item.id === id);
  return (
    <>
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
        transition={{ duration: 0.2, delay: 0.15 }}
        style={{ pointerEvents: "auto" }}
        className="overlay"
    >
    <NavLink to="/" activeClassName="overlay-link"/>
    
    
    <div className="grid-container open">
        <motion.div className="company-content" layoutId={`company-container-${id}`}>
            <div className="company-logo">
                <img src={"../"+image} alt=""/>
            </div>
            <div className="company-name" style={{backgroundColor: backgroundColor}}>
                {(backgroundColor < '#AAAAAA') ?
                    (<span style={{color:  '#efefef'}}>{name}</span>)
                :
                    (<span style={{color: '#2a2a2a'}}>{name}</span>)
                }
            </div>
            <motion.div className="content-container" animate>
                <motion.div className="react-player" animate>
                    <span>React-Player</span>
                </motion.div>
                <motion.div className="company-qr-code" animate>
                    <span style={{display: "block"}}>{website}</span>
                    <QRCode
                        id = {id}
                        value = {website}
                        bgColor="#2a2b32"
                        fgColor="#eeeeee"
                        size={200}
                        includeMargin={true}
                    />
                </motion.div>
                </motion.div>
                <LoremIpsum
                    p={10}
                    avgWordsPerSentence={6}
                    avgSentencesPerParagraph={4}
                    />
            </motion.div>
      </div>
      </motion.div>
      </>
  );
}
