// Designed by Maximilian Roll
// https://gitlab.com/ChainArts
// September 2, 2020
// HTL Hollabrunn

import React from 'react';
import Titlebar from './titlebar/titlebar'
import Navbar from './navbar/navbar'
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <Titlebar></Titlebar>
      </header>
      <Navbar></Navbar>
    </div>
  );
}

export default App;
