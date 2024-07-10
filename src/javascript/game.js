// Importa funções e variáveis de outros módulos
import { update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection, SNAKE_SPEED, setSnakeColor } from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { outsideGrid } from './grid.js';

// Seleciona todas as células do seletor de cores (elementos <td> dentro do elemento com id 'color-picker')
const colorPickerCells = document.querySelectorAll('#color-picker td');

// Adiciona um evento de clique a cada célula do seletor de cores
colorPickerCells.forEach(cell => {
    cell.addEventListener('click', () => {
        const color = cell.getAttribute('data-color');
        setSnakeColor(color); // Utilize a função importada do snake.js
    });
});

// Seleciona elementos do DOM
const gameBoard = document.querySelector('#game-board');
const levelBar = document.querySelector('#level-bar');
const levelLabel = document.querySelector('#level-number');
const muteButton = document.querySelector('#mute-button');

let lastRenderTime = 0;
let gameOver = false;
let level = 1;
let foodEaten = 0;

// Carrega os sons do jogo
const eatSound = new Audio('src/sounds/eat-sound.mp3');
const deadSound = new Audio('src/sounds/dead-game.mp3');
const levelUpSound = new Audio('src/sounds/level-up.mp3');
let isMuted = false;

// Adiciona um evento de clique ao botão de mudo
muteButton.addEventListener('click', () => {
    isMuted = !isMuted;
    [eatSound, deadSound, levelUpSound].forEach(sound => {
        sound.muted = isMuted;
    });
    muteButton.innerHTML = isMuted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
    muteButton.classList.toggle('muted', isMuted);
});

// Inicia o loop de animação
requestAnimationFrame(main);

// Função principal do jogo
function main(currentTime) {
    if (gameOver) {
        if (deadSound && !isMuted) deadSound.play();
        if (confirm('VOCE PERDEU, OTARIO!')) {
            location.reload();
        }
        return;
    }

    // Solicita o próximo frame de animação
    requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    lastRenderTime = currentTime;

    update();
    draw();
}

// Atualiza o estado do jogo
function update() {
    updateSnake();
    updateFood();
    checkDeath();
    updateLevel();
}

// Desenha o estado atual do jogo
function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

// Verifica se a cobra colidiu com a borda ou com ela mesma
function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
    if (gameOver && deadSound && !isMuted) {
        deadSound.play();
    }
}

// Atualiza o nível do jogo
function updateLevel() {
    if (foodEaten >= 5) {
        level++;
        foodEaten = 0;
        if (levelUpSound && !isMuted) levelUpSound.play();
        levelLabel.textContent = level;
        increaseSpeed();
    }
    // Atualiza a barra de nível
    levelBar.style.width = `${(foodEaten / 5) * 100}%`;
}

// Aumenta a velocidade da cobra
function increaseSpeed() {
    SNAKE_SPEED *= 1.5;
}

// Incrementa o contador de alimentos comidos
export function incrementFoodEaten() {
    foodEaten++;
    if (eatSound && !isMuted) eatSound.play();
}
