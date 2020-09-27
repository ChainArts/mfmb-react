// Designed by Maximilian Roll
// https://gitlab.com/ChainArts
// September 2, 2020
// HTL Hollabrunn

import './App.css';
import React from 'react';
//import Titlebar from './titlebar/titlebar';
import Navbar from './navbar/navbar';
import Content from './ContentGrid/content';
import About from './about/about';


function App() {
    return (
        <div className="App">
            <header>
		        {/* <Titlebar></Titlebar>*/}
	        </header>
            <Navbar></Navbar>
            {/*<About></About>*/}
            <Content></Content>

        </div>
    );
}

export default App;
