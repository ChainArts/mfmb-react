import React from "react";
import loading from "./media/loading_small.gif";

export const DelayedFallback = () => {

  return (
    <>
        <div className="placeholder">
            <img src={loading} alt="Loading..."/>
        </div>
    </>
    )
  }
export default DelayedFallback