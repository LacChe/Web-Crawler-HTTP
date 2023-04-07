import React from 'react';
import Nav from "./Nav.js";
import ImageCloud from "./ImageCloud.js";
import CenterText from "./CenterText.js";
import Card from "./Card.js";
import CardData from "./cardData.js";

export default function App(){
    let cards = CardData.map(data => {
        return <Card 
            img={data.img} 
            status={data.status}
            rating={data.rating}
            count={data.count}
            area={data.area}
            title={data.title}
            price={data.price}
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