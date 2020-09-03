import React from "react";
import "./content.css";
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { Company } from "./company";
import { Grid } from "./grid";
import {BrowserRouter as Router, Route} from "react-router-dom";;

function Store({ match }) {
    let { id } = match.params;
    const imageHasLoaded = true;
    
    return(
      <>
        <Grid selectedId={id} />
        <AnimatePresence>
          {id && imageHasLoaded && <Company id={id} key="item"/>}
      </AnimatePresence>
      </>
    )
  }

export default function Content() {
    return(
        <AnimateSharedLayout type="crossfade">
            <div className="content-wrapper">
                <Router>
                    <Route path={["/:id", "/"]} component={Store}/>
                </Router>
            </div>
        </AnimateSharedLayout>
    );
}