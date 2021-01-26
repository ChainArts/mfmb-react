// Designed by Maximilian Roll
// https://gitlab.com/ChainArts
// September 2, 2020
// HTL Hollabrunn

import React, { Suspense, lazy, useState, useEffect} from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { AnimateSharedLayout, AnimatePresence, motion } from "framer-motion";
import SimpleBar from 'simplebar-react';
import ParticleBackground from "./components/particleBackground";
import 'simplebar-react/dist/simplebar.min.css';
import DelayedFallback from './components/delayedFallback';
import Company from "./components/company";
import Grid from './components/grid'
import Navbar from './components/navbar/navbar';
import AutoMode from './pages/autoMode/autoMode';

const About = lazy(() => import('./pages/about/about'));
const Jobs = lazy(() => import('./pages/jobs/jobs'));

function Companies({ match }) {
    const [companies, setCompanies] = useState(null);
    const [imageHasLoaded, setImageHasLoaded] = useState(false);

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
        fetch('http://pendragon:5500/getData', requestOptions)
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
    <motion.div className="currCategory mobile-hide" 
        initial={{opacity: 0, right: "-15rem"}} 
        animate={{opacity: 1, right: "-13rem"}} 
        transition={{delay: 2, duration: 0.6, ease: [.14,.8,.4,1]}}>
            <span>FIRMEN</span>
        </motion.div>
        <AnimateSharedLayout type="crossfade">
            {imageHasLoaded && companies && companies.length > 0 ? (
                <SimpleBar className= "content-wrapper" scrollbarMaxSize={300}>
                    <Grid selectedId={id} companies={companies}/>
                    <AnimatePresence>
                        {id && <Company id={id} key="company" companies={companies}/>}
                    </AnimatePresence>
                </SimpleBar>)
                :
                (<DelayedFallback/>)
            }
        </AnimateSharedLayout>
    </>
    )
}

/*function redirectAuto(){
    const[count, setCount] = useState(0);
    const countRef = useRef(count);
    countRef.current = count;

    const getCountTimeout = () => {
        setTimeout(()=> {
            setTimeoutCount(countRef.current);
            console.log("redirect")
            return (<Redirect to="/automode"/>)
        }, 2000);
        return () => clearTimeout(timer);
    };
}*/

function App() {
    return (
        <div className="App">
            <ParticleBackground/>
            <header/>
            <Navbar/>
            <AnimatePresence>
            <Suspense fallback={<DelayedFallback />}>
                <Switch>
                    <Route exact path={["/companies/:id", "/"]} component={Companies}/>
                    <Route path="/automode" component={AutoMode}/>
                    <Route path="/about" component={About}/>
                    <Route path="/jobs" component={Jobs}/>
                </Switch>
            </Suspense>
            </AnimatePresence>
        </div>
    );
}

export default App;
