import React, { useState } from 'react'
import './titlebar.css'

const ipcRenderer = window.require('electron').ipcRenderer

const Titlebar = () => {

    const [isMaximized, setIsMaximized] = useState()

    ipcRenderer.on('maximized', () => {
        setIsMaximized(true)
    })

    ipcRenderer.on('unmaximized', () => {
        setIsMaximized(false)
    })

    const minimizeHandler = () => {
        ipcRenderer.invoke('minimize-event')
    }

    const maximizeHandler = () => {
        ipcRenderer.invoke('maximize-event')
    }

    const unmaximizeHandler = () => {
        ipcRenderer.invoke('unmaximize-event')
    }

    const closeHandler = () => {
        ipcRenderer.invoke('close-event')
    }

    return (
        <div className="Titlebar">
            <div className="Title-Bar">
                <div className="title-bar-btn">
                    <div className= 'close-btn' onClick={closeHandler}>
                        <i className="fas fa-times"></i>
                    </div> 
                    {isMaximized ?
                        <div className="option"  onClick={unmaximizeHandler}>
                            <i className="far fa-square"></i>
                        </div>
                        :
                        <div className="option" onClick={maximizeHandler}>
                            <i className="far fa-square"></i>
                        </div>
                    }
                    <div className="option" onClick={minimizeHandler}>
                        <i className="far fa-window-minimize"></i>
                    </div>
                </div>
                <div
                    style={isMaximized ? { display: 'none' } : {}}
                    className="resizer">
                </div>
            </div>
        </div >
    )
}

export default Titlebar