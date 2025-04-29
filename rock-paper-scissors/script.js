let score = 0;
let rounds = 0;
let isPlaying = true;

const choices = ['rock', 'paper', 'scissors'];
const emojis = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

const scoreElement = document.getElementById('score');
const roundsElement = document.getElementById('rounds');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset-button');
const playerDisplay = document.querySelector('.player-display');
const computerDisplay = document.querySelector('.computer-display');
const choiceButtons = document.querySelectorAll('.choice-btn');

function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) return 'Empate';
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) return 'Ganaste';
    return 'Perdiste';
}

function updateDisplay(playerChoice, computerChoice) {
    playerDisplay.textContent = emojis[playerChoice];
    computerDisplay.textContent = emojis[computerChoice];
}

function animateChoices() {
    playerDisplay.style.transform = 'scale(1.2)';
    computerDisplay.style.transform = 'scale(1.2)';
    setTimeout(() => {
        playerDisplay.style.transform = 'scale(1)';
        computerDisplay.style.transform = 'scale(1)';
    }, 200);
}

function playRound(playerChoice) {
    if (!isPlaying) return;
    
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);
    
    rounds++;
    roundsElement.textContent = rounds;
    
    updateDisplay(playerChoice, computerChoice);
    animateChoices();
    
    if (result === 'Ganaste') {
        score++;
        scoreElement.textContent = score;
        messageElement.textContent = '¡Felicidades! ¡Ganaste esta ronda! 🎉';
        messageElement.className = 'message success';
    } else if (result === 'Perdiste') {
        messageElement.textContent = '¡Ups! Perdiste esta ronda 😢';
        messageElement.className = 'message error';
    } else {
        messageElement.textContent = '¡Empate! 🤝';
        messageElement.className = 'message';
    }
    
    if (rounds >= 5) {
        isPlaying = false;
        choiceButtons.forEach(btn => btn.disabled = true);
        resetButton.style.display = 'block';
        
        if (score >= 3) {
            messageElement.textContent = `¡Felicidades! Ganaste el juego ${score}-${rounds-score}! 🎉`;
            messageElement.className = 'message success';
        } else {
            messageElement.textContent = `¡Game Over! Perdiste el juego ${score}-${rounds-score} 😢`;
            messageElement.className = 'message error';
        }
    }
}

function resetGame() {
    score = 0;
    rounds = 0;
    isPlaying = true;
    scoreElement.textContent = score;
    roundsElement.textContent = rounds;
    messageElement.textContent = '';
    messageElement.className = '';
    playerDisplay.textContent = '❓';
    computerDisplay.textContent = '❓';
    resetButton.style.display = 'none';
    choiceButtons.forEach(btn => btn.disabled = false);
}

choiceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (isPlaying) {
            playRound(btn.dataset.choice);
        }
    });
});

resetButton.addEventListener('click', resetGame); 