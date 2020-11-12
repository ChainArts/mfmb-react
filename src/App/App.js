// Designed by Maximilian Roll
// https://gitlab.com/ChainArts
// September 2, 2020
// HTL Hollabrunn

import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Content from './pages/content/content';
import Navbar from './navbar/navbar';
import About from './pages/about/about';

function App() {
    return (
        <div className="App">
            <header/>
            <Navbar/>
                <Switch>
                    <Route exact path="/" component={Content}/>
                    <Route path="/about" component={About}/>
                </Switch>
        </div>
    );
}

export default App;
