import React from 'react';

export default function Dice(props){
    const style = props.dice.locked ? "dice locked" : "dice"
    return(
        <div className={style} onClick={() => props.toggleLock(props.dice.id)}>
            <h1>{props.dice.num}</h1>
        </div>
    )
}