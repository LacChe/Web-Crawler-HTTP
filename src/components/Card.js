import React from 'react';

export default function Card(props){
    return (
        <div className="card">
            <img className="card-img" src={require(`../images/${props.img}`)} alt="swimmer" />
            <div className="card-info">
                <div className="card-info--top-row">
                    <img src={require("../images/star.png")} alt="star" />
                    <p className="card-info--top-row--rating">{props.rating.toFixed(1)}</p>
                    <p className="card-info--top-row--other-text">({props.count}) &middot; {props.area}</p>
                </div>
                <p className="card-info--title">{props.title}</p>
                <div className="card-info--price">
                    <p className="card-info--price--pricing-start">From ${props.price}</p>
                    <p className="card-info--price--pricing-end">/ person</p>
                </div>
            </ div>
            {props.status && <p className="status">{props.status}</p>}
        </div>
    )
}