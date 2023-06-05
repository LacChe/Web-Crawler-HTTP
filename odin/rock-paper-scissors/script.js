
const textDisplay = document.querySelector('#text');
const content = document.createElement('div');
content.textContent = 'Choose Rock Paper or Scissors.';

textDisplay.appendChild(content);


const rock = document.querySelector('#rock-button');
const paper = document.querySelector('#paper-button');
const scissors = document.querySelector('#scissors-button');

var score = 0;

rock.addEventListener('click', function playRock(e) {
    play('rock');
})

paper.addEventListener('click', function playRock(e) {
    play('paper');
})

scissors.addEventListener('click', function playRock(e) {
    play('scissors');
})

function playRound(playerSelection, computerSelection) {
    let win;
    switch(playerSelection) {
        case 'rock':
            switch(computerSelection) {
                case 'rock':
                    win = 0;
                    break;
                case 'paper':
                    win = -1;
                    break;
                case 'scissors':
                    win = 1;
                    break;
                default:
                    break;
            }
            break;
        case 'paper':
            switch(computerSelection) {
                case 'rock':
                    win = 1;
                    break;
                case 'paper':
                    win = 0;
                    break;
                case 'scissors':
                    win = -1;
                    break;
                default:
                    break;
            }
            break;
        case 'scissors':
            switch(computerSelection) {
                case 'rock':
                    win = -1;
                    break;
                case 'paper':
                    win = 1;
                    break;
                case 'scissors':
                    win = 0;
                    break;
                default:
                    break;
            }
            break;
        default:
            return 'error: move unknown';
    }
    return win;
}

function getComputerChoice() {
    var choices = ['rock', 'paper', 'scissors'];
    var choiceIndex = Math.floor(Math.random() * choices.length);
    return choices[choiceIndex];
}

function play(playerSelection) {
    const computerSelection = getComputerChoice();
    let win = playRound(playerSelection, computerSelection);
    score += typeof win === 'string' ? 0 : win;
    switch (win) {
        case -1:
            textDisplay.textContent = `Score: ${score} | You Lose, ${computerSelection} beats ${playerSelection}.`;
            break;
        case 0:
            textDisplay.textContent = `Score: ${score} | Draw!`;
            break;
        case 1:
            textDisplay.textContent = `Score: ${score} | You Win, ${playerSelection} beats ${computerSelection}.`;
            break;
        default:
            textDisplay.textContent = `error: "win" is ${win}`;
            break;
        
    }
}