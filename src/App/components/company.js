import React from "react";
import QRCode from 'qrcode.react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { motion } from "framer-motion";
import { LoremIpsum } from "react-lorem-ipsum";
import { NavLink } from "react-router-dom";
import { companies } from "../data";

export function Company({ id }) {
    const { name, image, backgroundColor, website, videolink } = companies.find(item => item.id === id);
  return (
    <>
    <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0, transition: { duration: 0.2, ease: [.14,.8,.4,1]} }}
        transition={{duration: 0.2, ease: [.14,.8,.4,1]}}
        className="overlay"
    >
    <div className="grid-container open">
    <motion.div className="company-content" layoutId={`company-container-${id}`}>
        <motion.div className="company">
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
        <motion.div className="react-player grid-item" animate>
            <video height="100%" width="100%" controls loop autoPlay muted>
                <source src={"../"+videolink}/>

            </video>
        </motion.div>
        <motion.div className="company-qr-code grid-item" animate>
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
        <motion.div className="content-container grid-item" animate>
            <SimpleBar className="insert-content" scrollbarMaxSize={150}>
            <LoremIpsum
                p={10}
                avgWordsPerSentence={6}
                avgSentencesPerParagraph={4}
            />
            </SimpleBar>
        </motion.div>
        </motion.div>
    </div>
    </motion.div>
    </>
  );
}
