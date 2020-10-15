import React from "react";
import "./webBrowser.css";

const WebBrowser = () => {
    return(
        <div className="browser-container">
            <iframe className="page" name="webview" title="webview" src="http://orf.at"></iframe>
        </div>
    )


}

export default WebBrowser