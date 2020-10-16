import React from "react";
import "./webBrowser.css";


const WebBrowser = ({source}) => {

    if(!source){
        return(
         <div className="browser-container">
            <div className="logo">
                <img src="./loading_small.gif" alt=""/>
                <span>Loading...</span>
            </div>
            
         </div>
        )
    }

    const src = source;

    return(
        <div className="browser-container">
            <iframe src={src}  className="page"></iframe>
        </div>
    )


}

export default WebBrowser