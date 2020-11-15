import React, { useState, useEffect } from 'react'
import './titlebar.css'
import {VscChromeMinimize,VscChromeClose,VscChromeMaximize} from "react-icons/vsc"

const ipcRenderer = window.require('electron').ipcRenderer

const Titlebar = () => {

    const [isMaximized, setIsMaximized] = useState(true)

    ipcRenderer.on('maximized', () => {
        setIsMaximized(true)
    })

    ipcRenderer.on('unmaximized', () => {
        setIsMaximized(false)
    })

    const minimizeHandler = () => {
        ipcRenderer.invoke('minimize-event')
    }

    const closeHandler = () => {
        ipcRenderer.invoke('close-event')
    }

    useEffect(() => {
        console.log(isMaximized)
        if(isMaximized)
        {
            ipcRenderer.invoke('unmaximize-event')
        }
        else
        {
            ipcRenderer.invoke('maximize-event')
        }
    }, [isMaximized])
    

    return (
        <div className="Titlebar">
            <div className="title-bar-btn">
                <div className= 'close-btn' onClick={closeHandler}>
                    <VscChromeClose/>
                </div> 
                     <div className="option"  onClick={e => setIsMaximized(!isMaximized)}>
                     {isMaximized ? <VscChromeMaximize/> : <VscChromeMaximize/>}
                </div>
                <div className="option" onClick={minimizeHandler}>
                    <VscChromeMinimize/>
                </div>
            </div>
            <div
                style={isMaximized ? { display: 'none' } : {}}
                className="resizer">
            </div>
        </div >
    )
}

export default Titlebar