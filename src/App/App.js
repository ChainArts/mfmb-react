// Designed by Maximilian Roll
// https://gitlab.com/ChainArts
// September 2, 2020
// HTL Hollabrunn

import './App.css';
import React from 'react';
//import Titlebar from './titlebar/titlebar';
import Content from './ContentGrid/content';
import Navbar from './navbar/navbar';
// eslint-disable-next-line
import About from './about/about';
// eslint-disable-next-line
import Switch from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <header>
		        {/* <Titlebar></Titlebar>           For dev purposes*/}
	        </header>
            <Navbar></Navbar>
            {/*<Switch>
               <About></About>*/}
                <Content></Content>
            {/*</Switch>*/}  
            

        </div>
    );
}

export default App;
