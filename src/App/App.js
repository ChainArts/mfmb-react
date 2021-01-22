// Designed by Maximilian Roll
// https://gitlab.com/ChainArts
// September 2, 2020
// HTL Hollabrunn

import React, { Suspense, lazy, useState, useEffect} from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { AnimateSharedLayout, AnimatePresence, motion } from "framer-motion";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import DelayedFallback from './components/delayedFallback';
import Company from "./components/company";
import Grid from './components/grid'
import Navbar from './components/navbar/navbar';

const About = lazy(() => import('./pages/about/about'));
const Jobs = lazy(() => import('./pages/jobs/jobs'));
const AutoMode = lazy(() => import('./pages/autoMode/autoMode'));

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
        fetch('http://localhost:5500/getData', requestOptions)
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
    <motion.div className="currCategory" initial={{opacity: 0}} animate={{opacity: 1}}>FIRMEN</motion.div>
        <AnimateSharedLayout type="crossfade">
            {imageHasLoaded && companies && companies.length>0 ?(
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
