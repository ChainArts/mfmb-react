import React from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export const ParticleBackground = () => {
    const particlesInit = async (main) => {
        await loadFull(main);
    }
    return(
    <Particles style={{position: "absolute", height: "100%", color: "var(--sec-acc-color)"}}
    init={particlesInit}
    options={{
	    "particles": {
            "color": "#deb992",
	        "number": {
                "value": 150,
	            "density": {
	                "enable": false,
	            }
	        },
	        "line_linked": {
	            "enable": false
	        },
	        "move": {
                "enable": true,
                "random": "true",
	            "direction": "top",
                "speed": 0.5,
                "out_mode": "out",
	        },
	        "size": {
                "value": 2,
                "random": true,
                "size-min": 1,
	        },
	        "opacity": {
	            "anim": {
	                "enable": true,
	                "speed": 1,
	                "opacity_min": 0.05
	            }
	        }
	    },
	    "interactivity": {
	        "events": {
	            "onclick": {
	                "enable": true,
	                "mode": "push"
	            }
	        },
	        "modes": {
	            "push": {
	                "particles_nb": 1
	            }
	        }
	    },
	    "retina_detect": true
	}} />
)}


export default ParticleBackground;