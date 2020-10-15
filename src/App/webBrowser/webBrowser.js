import React from "react";
import "./webBrowser.css";

const WebBrowser = () => {
    return(
        <div className="browser-container">
            <webview className="page" src="https://orf.at"></webview>
        </div>
    )


}

export default WebBrowser