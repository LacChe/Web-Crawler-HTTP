import React from 'react';

let status = "SOLD OUT";
let rating = 5.0;
let count = 6;
let area = "USA";
let title = "Title of the experience.";
let price = 136;

export default function Nav(){
    return (
        <div className="card">
            <p className="status">{status}</p>
            <img src={require("../images/swimmer.png")} alt="swimmer" />
            <div className="card-info">
                <div className="card-info--top-row">
                    <img src={require("../images/star.png")} alt="star" />
                    <p className="card-info--top-row--rating">{rating.toFixed(1)}</p>
                    <p className="card-info--top-row--other-text">({count}) &middot; {area}</p>
                </div>
                <p className="card-info--title">{title}</p>
                <div className="card-info--price">
                    <p className="card-info--price--pricing-start">From ${price}</p>
                    <p className="card-info--price--pricing-end">/ person</p>
                </div>
            </ div>
        </div>
    )
}