// Designed by Maximilian Roll
// https://gitlab.com/ChainArts
// September 2, 2020
// HTL Hollabrunn

import './App.css';
import React from 'react';
//import Titlebar from './titlebar/titlebar';
import Navbar from './navbar/navbar';
import Content from './ContentGrid/content';
// eslint-disable-next-line
import About from './about/about';
// eslint-disable-next-line
import Switch from 'react-router-dom';
// eslint-disable-next-line
import WebBrowser from './webBrowser/webBrowser';

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
            {/*</Switch> 
            <WebBrowser></WebBrowser> */}  
            

        </div>
    );
}

export default App;
