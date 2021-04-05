// Designed by Maximilian Roll
// https://gitlab.com/ChainArts
// September 2, 2020
// HTL Hollabrunn

import React, { Suspense, useState, useEffect} from 'react';
import './App.css';
import { Route, Switch, withRouter, Redirect, useLocation } from 'react-router-dom';
import { AnimateSharedLayout, AnimatePresence, motion } from "framer-motion";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import ParticleBackground from "./components/particleBackground";
import DelayedFallback from './components/delayedFallback';
import Details from "./components/details";
import Grid from './components/grid'
import Navbar from './components/navbar/navbar';
import IdleTimer from './components/idleTimer';
import AutoMode from './pages/autoMode/autoMode';
import Jobs from './pages/jobs/jobs';
import About from './pages/about/about';

//Sets timeout till automatic redirect
export const globalTimeout = 180;

function Companies({ match }) {
    const [companies, setCompanies] = useState(null);
    const [imageHasLoaded, setImageHasLoaded] = useState(false);
    const location = useLocation();
    let { id } = match.params;

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
        fetch('http://localhost:5500/getData', requestOptions)
            .then(function(res){
                return res.json();
            })
            .then(companies=> {
                setCompanies(companies)
            })            
            .catch(err => console.error(err));
    }, []);

    const [isTimeout, setIsTimeout] = useState(false);

    useEffect(() => {
        const timer = new IdleTimer({
            timeout: globalTimeout,
            onTimeout: () => {
                setIsTimeout(true);
            },
            onExpired: () => {
                setIsTimeout(true);
            }

        })
        return () => {
            timer.cleanUp();
        }
    }, []);
    
    return(
    <>
    {isTimeout ? <Redirect to="/automode"/>:
    <AnimateSharedLayout type="crossfade"> 
        <motion.div className="currCategory mobile-hide" 
            initial={{opacity: 0, right: "-15rem"}} 
            animate={{opacity: 1, right: "-13rem"}} 
            transition={{delay: 2, duration: 0.6, ease: [.14,.8,.4,1]}}>
            <span>FIRMEN</span>
        </motion.div>
            {imageHasLoaded && companies && companies.length > 0 ? (
                <SimpleBar className={location.pathname !== '/companies'  ? "content-wrapper simple-hidden":"content-wrapper"} scrollbarMaxSize={300}>
                    <Grid selectedId={id} companies={companies}/>
                    <AnimatePresence exitBeforeEnter>
                        {id && <Details id={id} key="company" companies={companies}/>}
                    </AnimatePresence>
                </SimpleBar>)
                :
                (<DelayedFallback/>)
            }
        </AnimateSharedLayout>
    }
    </>
    )
}

function App({location}) {
 
    const [updateActive, setUpdateActive] = useState(0);

    useEffect(() => {
        const requestOptions = {
            headers: {'Content-Type': 'application/json', 'Accept':'application/json'},
        };

        let updateInterval = setTimeout (() => {
            setUpdateActive(1)
            fetch('http://localhost:5500/update', requestOptions)
            .then(function(res){
                return res.json();
            })            
            .catch(err => console.error(err));
        }, 900000); /*Update every 15 minutes*/
        return () => {
            clearInterval(updateInterval);
            setUpdateActive(0);
        }
       
        }, [updateActive]);



    return (
        <div className="App">
            <ParticleBackground/>
            <header/>
            {location.pathname !== "/automode" && <Navbar/>}
            <AnimatePresence exitBeforeEnter>
            <Suspense fallback={<DelayedFallback />}>
                <Switch>
                    <Route exact path={["/companies/:id", "/companies"]} component={Companies}/>
                    <Route path="/automode" component={AutoMode}/>
                    <Route path="/about" component={About}/>
                    <Route path="/jobs" component={Jobs}/>
                    <Redirect to="/companies"/>
                </Switch>
            </Suspense>
            </AnimatePresence>
        </div>
    );
}

export default withRouter(App);
