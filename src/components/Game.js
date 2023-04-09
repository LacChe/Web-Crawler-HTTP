import React from 'react';
import Dice from './Dice.js'

export default function Game(){
    const [diceList, setDiceList] = React.useState(
        [
            {
                id: 0,
                num: Math.ceil(Math.random() * 6),
                locked: false
            },
            {
                id: 1,
                num: Math.ceil(Math.random() * 6),
                locked: false
            },
            {
                id: 2,
                num: Math.ceil(Math.random() * 6),
                locked: false
            },
            {
                id: 3,
                num: Math.ceil(Math.random() * 6),
                locked: false
            },
            {
                id: 4,
                num: Math.ceil(Math.random() * 6),
                locked: false
            },
            {
                id: 5,
                num: Math.ceil(Math.random() * 6),
                locked: false
            },
            {
                id: 6,
                num: Math.ceil(Math.random() * 6),
                locked: false
            },
            {
                id: 7,
                num: Math.ceil(Math.random() * 6),
                locked: false
            },
            {
                id: 8,
                num: Math.ceil(Math.random() * 6),
                locked: false
            },
            {
                id: 9,
                num: Math.ceil(Math.random() * 6),
                locked: false
            }
        ]
    )

    const [won, setWon] = React.useState(false);

    function toggleLock(id){
        setDiceList(oldDice => {
                let arr = oldDice.map(dice => 
                {
                    if(dice.id !== id){ 
                        return dice;
                    } else {
                        return {
                            ...dice,
                            locked: !dice.locked
                        }
                    }
                })
                checkWin(arr);
                return arr;
            }
        )
    }

    function roll(){
        setDiceList(oldDice => oldDice.map(dice => 
            {
                if(won){
                    setWon(() => false)
                    return {
                        ...dice,
                        locked: false,
                        num: Math.ceil(Math.random() * 6)
                    }
                } else if(dice.locked){ 
                    return dice;
                } else {
                    return {
                        ...dice,
                        num: Math.ceil(Math.random() * 6)
                    }
                }
            })
        )
    }

    function checkWin(arr){
        const firstVal = arr[0].num
        for(let i = 0; i < arr.length; i++){
            if(!arr[i].locked || arr[i].num !== firstVal){
                setWon(() => false)
                return
            }
        }
        setWon(() => true)
    }

    return(
        <div>
            <div className="dice-box roll1">
                {diceList.slice(0, diceList.length/2).map(item => <Dice key={item.id} dice={item} toggleLock={toggleLock}/>)}
            </div>
            <div className="dice-box roll2">
                {diceList.slice(diceList.length/2).map(item => <Dice key={item.id} dice={item} toggleLock={toggleLock}/>)}
            </div>
            <button onClick={roll}>{won ? "Reset Game" : "Roll"}</button>
        </div>
    )
}