import { getInputDirection } from "./input.js";

export let SNAKE_SPEED = 5.5;

const snakeBody = [
    { x: 11, y: 11 }
];
let newSegments = 0;
let snakeColor = '';

export function update() {
    addSegments();
    
    const inputDirection = getInputDirection();
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] };
    }
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard) {
    snakeBody.forEach((segment, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        snakeElement.style.backgroundColor = snakeColor;
        
        if (index === 0) {
            snakeElement.classList.add('snake-head');
        }
        
        gameBoard.appendChild(snakeElement);
    });
}

export function setSnakeColor(color) {
    console.log(`Setting snkae color to ${color}`);
    snakeColor = color;
}

export function expandSnake(amount) {
    newSegments += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false;
        return position.x === segment.x && position.y === segment.y;
    });
}

export function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
    }
    newSegments = 0;
}

export function getSnakeHead() {
    return snakeBody[0];
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true });
}
