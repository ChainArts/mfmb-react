import React from 'react';
import Particles from 'react-particles-js';

export const ParticleBackground = () => {
    
    return(
    <Particles style={{position: "absolute", height: "100%", color: "var(--sec-acc-color)"}}
    params={{
	    "particles": {
            "color": "#deb992",
	        "number": {
                "value": 100,
	            "density": {
	                "enable": false,
	            }
	        },
	        "line_linked": {
	            "enable": false
	        },
	        "move": {
                "random": "true",
	            "direction": "top",
                "speed": 0.15,
                "out_mode": "out",
	        },
	        "size": {
                "value": 1.5,
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