import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import './automode.css';
import { NavLink } from 'react-router-dom';
import DelayedFallback from '../../components/delayedFallback';

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
const VideoOverlay = (props) => {
    return(
        <motion.div className="video-overlay-container">
            <motion.div className="video-overlay">
                <video height="auto" width="auto" autoPlay muted style={{borderRadius: "10px"}}>
                    <source src="./public/video/osram.mp4"/>
                </video>
            </motion.div>
        </motion.div>
    )
}

function AutoCard({ id, backgroundColor, image, videolink}) {
    /*var color = '#efefef';
    if(backgroundColor > '#AAAAAA')
        color = '#2a2a2a';
    */
    return (
        <>  
    <motion.li className="grid-item" variants={gridItem} exit="exit" >
        <div className="grid-container">
        {id === "5" ? (
            <VideoOverlay videolink = {videolink}/>):
        (
        <motion.div className="company-logo-full" layoutId={`company-logo-${id}`}>
            <img src={"/"+image} alt="" loading="lazy"/>
        </motion.div>
        )
        }
      </div>
    </motion.li>
    </>
  );
}

function AutoMode() {
    const [companies, setCompanies] = useState(null);
    const [imageHasLoaded, setImageHasLoaded] = useState(false);

    useEffect((imageHasLoaded) => {
        const timer = setTimeout(() => {
            setImageHasLoaded(!imageHasLoaded);
        }, 500)
        return () => {
            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        const requestOptions = {
            headers: {'Content-Type': 'application/json', 'Accept':'application/json'},
        };
        fetch('http://localhost:5500/getAutoData', requestOptions)
            .then(function(res){
                return res.json();
            })
            .then(companies=> {
                setCompanies(companies)
            })            
            .catch(err => console.error(err));
    }, []);

return(
    <>
    {imageHasLoaded && companies && companies.length>0 ?
    (
    <motion.div className="auto-container">
    <NavLink to="/companies" className="auto-link"/>
    
        <motion.ul className="auto-grid" variants = {gridWrapper} initial = "hidden" animate = "visible">
            {companies.map(card => (
                <AutoCard key={card.id} {...card}/>
            ))}
        </motion.ul>
        <VideoOverlay/>
    
    </motion.div>
    )
    :
    (<DelayedFallback/>)
}
    </>
    )
}

export default AutoMode;