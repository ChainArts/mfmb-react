// Designed by Maximilian Roll
// https://gitlab.com/ChainArts
// September 2, 2020
// HTL Hollabrunn

import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Content from './ContentGrid/content';
import Navbar from './navbar/navbar';
import About from './about/about';

function App() {
    return (
        <div className="App">
            <header/>
            <Router>
                <Navbar/>
                <Switch>
                    <Route exact path="/" component={Content}/>
                    <Route path="/about" component={About}/>
                </Switch>
            </Router>  
            

        </div>
    );
}

export default App;
