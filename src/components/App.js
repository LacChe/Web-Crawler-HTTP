import React from 'react';
import Nav from "./Nav.js";
import ImageCloud from "./ImageCloud.js";
import CenterText from "./CenterText.js";

export default function App(){
    return (
        <div className="app">
            <Nav />
            <ImageCloud />
            <CenterText />
        </div>
    )
}