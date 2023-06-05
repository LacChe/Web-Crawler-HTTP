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

function game() {
    var score = 0;
    for(let i = 0; i < 5; i++) {
        const playerSelection = prompt('input "rock" "paper" or "scissors"');
        const computerSelection = getComputerChoice();
        let win = playRound(playerSelection, computerSelection);
        score += typeof win === 'string' ? 0 : win;
        switch (win) {
            case -1:
                console.log(`Turn ${i} Score: ${score} | `,`You Lose, ${computerSelection} beats ${playerSelection}.`);
                break;
            case 0:
                console.log(`Turn ${i} Score: ${score} | `,`Draw!`);
                break;
            case 1:
                console.log(`Turn ${i} Score: ${score} | `,`You Win, ${playerSelection} beats ${computerSelection}.`);
                break;
            default:
                console.log(`error: "win" is ${win}`);
                break;
            
        }
    }
}

game();