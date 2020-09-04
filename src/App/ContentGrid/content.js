import React from "react";
import SimpleBar from 'simplebar-react';
import 'simplebar-core/dist/simplebar.css';
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
              <SimpleBar autoHide={false} style={{maxHeight: '100%'}}>
                <Router>
                  <Route path={["/:id", "/"]} component={Companies}/>
                </Router>
              </SimpleBar>
            </div>
        </AnimateSharedLayout>
    );
}