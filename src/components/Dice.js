import React from 'react';

export default function Dice(props){
    return(
        <div className="dice">
            <h1>{props.diceNumber}</h1>
        </div>
    )
}