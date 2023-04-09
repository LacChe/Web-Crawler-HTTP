import React from 'react';
import Dice from './Dice.js'

export default function Game(){
    const dice = [1,2,3,4,5,6,1,2,3,4]

    return(
        <div>
            <div className="die roll1">
                {dice.slice(0, dice.length/2).map(num => <Dice diceNumber={num}/>)}
            </div>
            <div className="die roll2">
                {dice.slice(dice.length/2).map(num => <Dice diceNumber={num}/>)}
            </div>
            <button>Roll</button>
        </div>
    )
}