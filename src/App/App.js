// Designed by Maximilian Roll
// https://gitlab.com/ChainArts
// September 2, 2020
// HTL Hollabrunn

import React, { Suspense, useState } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { AnimateSharedLayout, AnimatePresence, motion } from "framer-motion";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { Company } from "./components/company";
import { Grid } from "./components/grid";
import Navbar from './components/navbar/navbar';
import About from './pages/about/about';
import Jobs from './pages/jobs/jobs';
import AutoMode from './pages/autoMode/autoMode';

function Companies({ match }) {
    let { id } = match.params;
    const imageHasLoaded = useState(true);
    
    return(
    <>
    <Suspense fallback={<h1>loading</h1>}>
        <AnimateSharedLayout type="crossfade">
            <motion.div className="currCategory" initial={{opacity: 0}} animate={{opacity: 1}}>FIRMEN</motion.div>
            <SimpleBar className= "content-wrapper" scrollbarMaxSize={300}>
                <Grid selectedId={id}/>
                <AnimatePresence>
                    {id && imageHasLoaded && <Company id={id} key="company"/>}
                    
                </AnimatePresence>
            </SimpleBar>
        </AnimateSharedLayout>
    </Suspense>
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
                <Switch>
                    <Route exact path={["/companies/:id", "/"]} component={Companies}/>
                    <Route path="/automode" component={AutoMode}/>
                    <Route path="/about" component={About}/>
                    <Route path="/jobs" component={Jobs}/>
                </Switch>
            </AnimatePresence>    
        </div>
    );
}

export default App;
