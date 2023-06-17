import Ship from './ship.js';
import GameBoard from './gameBoard.js';

test('ship', () => {
    let ship = Ship(2, [2, 3], 'horizontal');
    expect(ship.length).toBe(2);
    expect(ship.orientation).toBe('horizontal');
    expect(ship.isSunk()).toBe(false);
    expect(ship.pos).toStrictEqual([2, 3]);
    expect(ship.contains([2, 3])).toBe(true);
    expect(ship.contains([3, 3])).toBe(true);
    expect(ship.contains([6, 3])).toBe(false);
    expect(ship.contains([3, 6])).toBe(false);
    expect(ship.hit([2, 3])).toBe(true);
    expect(ship.hit([6, 3])).toBe(false);
    expect(ship.hit([2, 3])).toBe(false);
    expect(ship.hit([3, 3])).toBe(true);
    expect(ship.isSunk()).toBe(true);
});

test('gameBoard', () => {
    let gameBoard = GameBoard();
    expect(gameBoard.ships[0].length).toBe(0);

    let s0 = gameBoard.addShip(0, 2, [2, 3], 'horizontal');
    expect(s0.length).toBe(2);
    expect(s0.pos).toStrictEqual([2, 3]);
    expect(s0.orientation).toBe('horizontal');
    expect(gameBoard.ships[0].length).toBe(1);

    gameBoard.addShip(0, 3, [4, 5], 'vertical');
    expect(gameBoard.ships[0].length).toBe(2);

    let s2 = gameBoard.addShip(0, 2, [3, 2], 'vertical');
    expect(s2).toBe(null);
    expect(gameBoard.ships[0].length).toBe(2);

    expect(gameBoard.hasRemainingShips(0)).toBe(true);
    expect(gameBoard.receiveAttack(1, [1, 1])).toBe(false);
    expect(gameBoard.receiveAttack(1, [2, 3])).toBe(true);
    expect(gameBoard.receiveAttack(1, [2, 3])).toBe(false);
    expect(gameBoard.receiveAttack(1, [3, 3])).toBe(true);
    expect(gameBoard.receiveAttack(1, [4, 5])).toBe(true);
    expect(gameBoard.receiveAttack(1, [4, 6])).toBe(true);
    expect(gameBoard.receiveAttack(1, [4, 7])).toBe(true);
    expect(gameBoard.hasRemainingShips(0)).toBe(false);

    gameBoard.clearBoard();
    expect(gameBoard.ships[0].length).toBe(0);
    expect(gameBoard.ships[1].length).toBe(0);

    let s3 = gameBoard.addShip(0, 2, [3, 2], 'vertical');
    expect(gameBoard.ships[0].length).toBe(1);

    let s4 = gameBoard.addShip(1, 2, [3, 2], 'vertical');
    expect(gameBoard.ships[1].length).toBe(1);

    expect(gameBoard.playRound([0, 0])).toStrictEqual({"nextPlayer": 1, "success": false, "winner": undefined});
    expect(gameBoard.playRound([3, 2])).toStrictEqual({"nextPlayer": 0, "success": true, "winner": undefined});
    expect(gameBoard.playRound([3, 2])).toStrictEqual({"nextPlayer": 1, "success": true, "winner": undefined});
    expect(gameBoard.playRound([3, 2])).toStrictEqual({"nextPlayer": 0, "success": false, "winner": undefined});
    expect(gameBoard.playRound([3, 3])).toStrictEqual({"nextPlayer": 1, "success": true, "winner": 0});
    expect(gameBoard.playRound([1, 1])).toStrictEqual({"nextPlayer": 1, "success": undefined, "winner": 0});
    expect(gameBoard.playRound([2, 1])).toStrictEqual({"nextPlayer": 1, "success": undefined, "winner": 0});
});