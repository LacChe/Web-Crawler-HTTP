import Ship from './ship.js';

export default function GameBoard() {
    let currentPlayer = 0;
    let winner;
    let ships = [[], []];

    let addShip = function addShip(player, lengthParam, posParam, orientationParam) {
        let newShip = Ship(lengthParam, posParam, orientationParam);
        if(checkCollide(player, newShip)) return null;

        ships[player].push(newShip);
        return newShip;
    }

    function checkCollide(player, s0) {
        // check all ships of player
        for(let s = 0; s < ships[player].length; s++) {
            let s1 = ships[player][s];
            // check all coors of ship from array ...
            for(let s1Offset = 0; s1Offset < s1.length; s1Offset++){
                let s1X = s1.pos[0];
                let s1Y = s1.pos[1];
                if(s1.orientation === 'horizontal') {
                    s1X += s1Offset;
                } else {
                    s1Y += s1Offset;
                }
                // ... against all coors from passed in ship
                for(let s0Offset = 0; s0Offset < s0.length; s0Offset++){
                    let s0X = s0.pos[0];
                    let s0Y = s0.pos[1];
                    if(s0.orientation === 'horizontal') {
                        s0X += s0Offset;
                    } else {
                        s0Y += s0Offset;
                    }
                    // if match return true
                    if(s0X === s1X && s0Y === s1Y) return true;
                }
            }
        }
        return false;
    }

    let receiveAttack  = function receiveAttack(attackingPlayer, pos) {
        let defendingPlayer = attackingPlayer === 0 ? 1 : 0;
        let hit = false;
        ships[defendingPlayer].forEach(ship => {
            if(ship.hit(pos)) hit = true;
        });
        return hit;
    }

    let hasRemainingShips = function hasRemainingShips(player) {
        let has = false;
        ships[player].forEach(ship => {
            if(!ship.isSunk()) has = true;
        });
        return has;
    }

    let playRound = function playRound(arr) {
        let success;
        if(winner !== 0 && winner !== 1) {
            success = receiveAttack(currentPlayer, arr);
            if(!hasRemainingShips(currentPlayer === 0 ? 1 : 0)) {
                winner = currentPlayer;
            }
            currentPlayer = currentPlayer === 0 ? 1 : 0; 
        }
        return {
            winner,
            success,
            nextPlayer: currentPlayer,
        }
    }
    let clearBoard = function clearBoard() {
        ships[0] = [];
        ships[1] = [];
        currentPlayer = 0;
        winner;
    }

    return {
        ships,
        addShip,
        receiveAttack,
        hasRemainingShips,
        playRound,
        clearBoard,
    };
}