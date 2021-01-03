// Designed by Maximilian Roll
// https://gitlab.com/ChainArts
// September 2, 2020
// HTL Hollabrunn

import React, { Suspense } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
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
    const imageHasLoaded = true;
    
    return(
    <>
    <Suspense fallback={<h1>loading</h1>}>
        <AnimateSharedLayout type="crossfade">
            <SimpleBar className= "content-wrapper" scrollbarMaxSize={300}>
                <Grid selectedId={id} />
                <AnimatePresence>
                    {id && imageHasLoaded && <Company id={id} key="company"/>}
                    
                </AnimatePresence>
            </SimpleBar>
        </AnimateSharedLayout>
    </Suspense>
    </>
    )
}

function App() {
    return (
        <div className="App">
            <header/>
            <Navbar/>
                <Switch>
                    <Route exact path={["/companies/:id", "/"]} component={Companies}/>
                    <Route path="/automode" component={AutoMode}/>
                    <Route path="/about" component={About}/>
                    <Route path="/jobs" component={Jobs}/>
                </Switch>
        </div>
    );
}

export default App;
