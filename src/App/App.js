// Designed by Maximilian Roll
// https://gitlab.com/ChainArts
// September 2, 2020
// HTL Hollabrunn

import './App.css';
import React from 'react';
//import Titlebar from './titlebar/titlebar'
import Navbar from './navbar/navbar'
import Content from './ContentGrid/content';

function App() {
    return (
        <div className="App">
            <header>
		        {/* <Titlebar></Titlebar>*/}
	        </header>
            <Navbar></Navbar>
            <Content></Content>
        </div>
    );
}

export default App;
