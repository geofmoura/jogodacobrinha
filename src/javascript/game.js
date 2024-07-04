import { update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection, SNAKE_SPEED } from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { outsideGrid } from './grid.js';

const gameBoard = document.querySelector('#game-board');
const levelBar = document.querySelector('#level-bar');
const levelLabel = document.querySelector('#level-number');

let lastRenderTime = 0;
let gameOver = false;
let level = 1;
let foodEaten = 0;

const eatSound = new Audio('src/sounds/eat-sound.mp3');
const deadSound = new Audio('src/sounds/dead-game.mp3');
const levelUpSound = new Audio('src/sounds/level-up.mp3');

requestAnimationFrame(main);

function main(currentTime) {
    if (gameOver) {
        if (deadSound) deadSound.play();
        if (confirm('VOCE PERDEU, OTARIO!')) {
            location.reload();
        }
        return;
    }

    requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    lastRenderTime = currentTime;

    update();
    draw();
}

function update() {
    updateSnake();
    updateFood();
    checkDeath();
    updateLevel();
}

function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
    if (gameOver && deadSound) {
        deadSound.play();
    }
}

function updateLevel() {
    if (foodEaten >= 5) {
        level++;
        foodEaten = 0;
        if (levelUpSound) levelUpSound.play();
        levelLabel.textContent = level;
    }
    levelBar.style.width = `${(foodEaten / 5) * 100}%`;
}

export function incrementFoodEaten() {
    foodEaten++;
    if (eatSound) eatSound.play();
}
