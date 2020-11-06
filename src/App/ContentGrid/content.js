import React from "react";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import 'simplebar-core/dist/simplebar-core';
import "./content.css";
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { Company } from "./company";
import { Grid } from "./grid";
import {BrowserRouter as Router, Route} from "react-router-dom";

function Companies({ match }) {
    let { id } = match.params;
    const imageHasLoaded = true;
    
    return(
    <>
        <Grid selectedId={id} />
        <AnimatePresence exitBeforeEnter>
            {id && imageHasLoaded && <Company id={id} key="item"/>}
        </AnimatePresence>
    </>
    )
  }

export default function Content() {
    return(    
        <AnimateSharedLayout type="crossfade">
            <SimpleBar className="content-wrapper" autoHide={false} scrollbarMaxSize={250} style={{maxHeight: '100%'}}>
              <Router>
                <Route path={["/:id", "/"]} component={Companies}/>
              </Router>
            </SimpleBar>
        </AnimateSharedLayout>
    );
}