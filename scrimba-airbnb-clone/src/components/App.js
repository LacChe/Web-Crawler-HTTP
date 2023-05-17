import React from 'react';
import Nav from "./Nav.js";
import ImageCloud from "./ImageCloud.js";
import CenterText from "./CenterText.js";
import Card from "./Card.js";
import CardData from "./cardData.js";

export default function App(){
    let cards = CardData.map(data => {
        return <Card 
            {...data}
        />
    })
    return (
        <div className="app">
            <Nav />
            <ImageCloud />
            <CenterText />
            <div className="card-section">
                {cards}
            </div>
        </div>
    )
}