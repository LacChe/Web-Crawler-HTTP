var gridBtn = [];

var game = (function createGame() {
    var currentTurn = 'X';
    var scoreX = 0;
    var scoreO = 0;

    var winner = '';
    var winPos = [];

    var grid = [];

    function checkWin() {
        // check X
        // check coloumn
        for(let i = 0; i < 3; i++){
            if(grid[i] === 'X' && grid[i + 3] === 'X' && grid[i + 6] === 'X' ){
                winner = 'X';
                winPos = [i, i+3, i+6];
                scoreX++;
                return;
            }
        }
        // check row
        for(let i = 0; i < 7; i+=3){
            if(grid[i] === 'X' && grid[i + 1] === 'X' && grid[i + 2] === 'X' ){
                winner = 'X';
                winPos = [i, i+1, i+2];
                scoreX++;
                return;
            }
        }
        // check cross
        if(grid[0] === 'X' && grid[4] === 'X' && grid[8] === 'X' ){
            winner = 'X';
            winPos = [0, 4, 8];
            scoreX++;
            return;
        }
        if(grid[2] === 'X' && grid[4] === 'X' && grid[6] === 'X' ){
            winner = 'X';
            winPos = [2, 4, 6];
            scoreX++;
            return;
        }

        // check O
        // check coloumn
        for(let i = 0; i < 3; i++){
            if(grid[i] === 'O' && grid[i + 3] === 'O' && grid[i + 6] === 'O' ){
                winner = 'O';
                winPos = [i, i+3, i+6];
                scoreO++;
                return;
            }
        }
        // check row
        for(let i = 0; i < 7; i+=3){
            if(grid[i] === 'O' && grid[i + 1] === 'O' && grid[i + 2] === 'O' ){
                winner = 'O';
                winPos = [i, i+1, i+2];
                scoreO++;
                return;
            }
        }
        // check cross
        if(grid[0] === 'O' && grid[4] === 'O' && grid[8] === 'O' ){
            winner = 'O';
            winPos = [0, 4, 8];
            scoreO++;
            return;
        }
        if(grid[2] === 'O' && grid[4] === 'O' && grid[6] === 'O' ){
            winner = 'O';
            winPos = [2, 4, 6];
            scoreO++;
            return;
        }
    }

    function getScore() {
        return {
            scoreX,
            scoreO
        }
    }

    function getTurn() {
        return currentTurn;
    }

    function getWinner() {
        return winner;
    }

    function playRound(i) {
        if(grid[i] !== undefined || winner !== '') return;
        grid[i] = currentTurn;
        currentTurn = currentTurn === 'X' ? 'O' : 'X';
        checkWin();
    }

    function reset() {
        currentTurn = 'X';
        grid = [];
        winner = '';
        winPos = [];
    }

    function getGrid() {
        return grid;
    }

    function getWinPos() {
        return winPos;
    }

    return {
        getGrid,
        getScore,
        getTurn,
        playRound,
        reset,
        getWinner,
        getWinPos
    }
})();

function setupButtons(){
    for (let i = 0; i < 9; i++){
        let btn = document.querySelector(`#grid-${i}`);

        btn.addEventListener('click', function(){
            game.playRound(i);
            updateUI();
        });

        gridBtn[i] = btn;
    }

    let resetBtn = document.querySelector(`#reset-btn`);
    resetBtn.addEventListener('click', function(){
        game.reset();
        for (let i = 0; i < 9; i++){
            gridBtn[i].textContent = '';
            gridBtn[i].classList.remove('winPos');
        }
    });
}

function updateUI() {
    for (let i = 0; i < 9; i++){
        gridBtn[i].textContent = game.getGrid()[i];
        if(game.getWinPos().includes(i)) {
            gridBtn[i].classList.add('winPos');
        }
    }
    let scoreX = document.querySelector('#scoreX');
    let scoreO = document.querySelector('#scoreO');
    scoreX.textContent = game.getScore().scoreX;
    scoreO.textContent = game.getScore().scoreO;
}

setupButtons();
updateUI();