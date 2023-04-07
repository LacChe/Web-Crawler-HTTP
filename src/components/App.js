import React from 'react';
import Nav from "./Nav.js";
import ImageCloud from "./ImageCloud.js";
import CenterText from "./CenterText.js";
import Card from "./Card.js";

export default function App(){
    return (
        <div className="app">
            <Nav />
            <ImageCloud />
            <CenterText />
            <Card />
        </div>
    )
}