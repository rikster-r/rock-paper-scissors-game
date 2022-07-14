const hands = ['rock', 'paper', 'scissors'];
let compHand = document.querySelector('#comp-hand');
let playerHand = document.querySelector('#player-hand');
let compScore = document.querySelector('#comp-score');
let playerScore = document.querySelector('#player-score');
let roundText = document.querySelector('#round-result');
let gameResult = document.querySelector('#game-result');
let modal = document.querySelector('.modal')

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function computerPlay() {
    let randNum = Math.floor(Math.random() * hands.length);
    return hands[randNum]; //returns random hand
}

function playRound(playerSelection, computerSelection) {
    //check who wins, then show imgs and win/lose(x beats/loses to/ties with x) + class 
    let roundResult, roundAction;
    switch (true) {
        case playerSelection === computerSelection:
            roundResult = 'tie';
            roundAction = 'ties with';
            break;
        case playerSelection === 'rock' && computerSelection === 'scissors':
        case playerSelection === 'paper' && computerSelection === 'rock':
        case playerSelection === 'scissors' && computerSelection === 'paper':
            roundResult = 'win';
            roundAction = 'beats';
            break;
        case playerSelection === 'rock' && computerSelection === 'paper':
        case playerSelection === 'paper' && computerSelection === 'scissors':
        case playerSelection === 'scissors' && computerSelection === 'rock':
            roundResult = 'loss';
            roundAction = 'loses to';
            break;
    }

    roundText.innerHTML = `It's a ${roundResult}!<br>${capitalizeFirstLetter(playerSelection)} ${roundAction} ${computerSelection}`;
    playerHand.src = `images/${playerSelection}.png`;
    compHand.src = `images/${computerSelection}.png`;
    if (roundResult === 'win') {
        playerScore.textContent = Number(playerScore.textContent) + 1;
    } else if (roundResult === 'loss') {
        compScore.textContent = Number(compScore.textContent) + 1;
    }
}

function game(playerSelection) {
    let computerSelection = computerPlay();
    playRound(playerSelection, computerSelection);

    if (playerScore.textContent == 5) {
        gameResult.textContent = 'won';
        endGame();
    }

    if (compScore.textContent == 5) {
        gameResult.textContent = 'lost';
        endGame();
    }
}

function endGame() {
    modal.showModal();
}

document.querySelector('.choose-bar').addEventListener('pointerdown', (event) => {
    if (event.target.tagName === 'DIV') return;

    game(event.target.closest('button').id);
})

document.querySelector('.retry').addEventListener('pointerdown', () => {
    roundText.textContent = "";
    playerHand.src = 'images/question.png';
    compHand.src = 'images/question.png';
    playerScore = computerScore = 0;

    modal.close();
})