// Importa funções de outros módulos
import { onSnake, expandSnake } from './snake.js';
import { randomGridPosition } from './grid.js';
import { incrementFoodEaten } from './game.js';

// Gera uma posição aleatória para o alimento
let food = getRandomFoodPosition();

// Define a taxa de expansão da cobra ao comer o alimento
const EXPANSION_RATE = 1;

// Atualiza o estado do jogo
export function update() {
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE);
        food = getRandomFoodPosition();
        incrementFoodEaten();
    }
}

// Desenha o alimento no tabuleiro do jogo
export function draw(gameBoard) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

// Gera uma posição aleatória para o alimento que não esteja ocupada pela cobra
function getRandomFoodPosition() {
    let newFoodPosition;
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
}
