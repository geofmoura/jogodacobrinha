// Importa a função getInputDirection do módulo input.js
import { getInputDirection } from "./input.js";

// Define a velocidade da cobra
export let SNAKE_SPEED = 5.5;

// Inicializa o corpo da cobra com uma posição inicial
const snakeBody = [
    { x: 11, y: 11 }
];
let newSegments = 0;
let snakeColor = '';

// Define a cor da cobra
export function setSnakeColor(color) {
    console.log(`Setting snake color to ${color}`);
    snakeColor = color;
}

// Atualiza o estado da cobra
export function update() {
    addSegments();
    
    // Obtém a direção de entrada do jogador
    const inputDirection = getInputDirection();
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] };
    }
    // Move a cabeça da cobra na direção da entrada
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

// Desenha a cobra no tabuleiro do jogo
export function draw(gameBoard) {
    snakeBody.forEach((segment, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        snakeElement.style.backgroundColor = snakeColor; // Aplicar a cor aqui

        if (index === 0) {
            snakeElement.classList.add('snake-head');
            const faceElement = document.createElement('div');
            faceElement.classList.add('snake-face');
            snakeElement.appendChild(faceElement);
        }

        // Adiciona o elemento ao tabuleiro do jogo
        gameBoard.appendChild(snakeElement);
    });
}

// Calcula a rotação da cabeça da cobra com base na direção do próximo segmento
function getFaceRotation() {
    const head = snakeBody[0];
    const nextSegment = snakeBody[1];
    
    if (!nextSegment) return 0; 

    if (nextSegment.x > head.x) {
        return 0; // Direita
    } else if (nextSegment.x < head.x) {
        return 180; // Esquerda
    } else if (nextSegment.y > head.y) {
        return 90; // Baixo
    } else if (nextSegment.y < head.y) {
        return -90; // Cima
    }

    return 0;
}

// Expande a cobra adicionando novos segmentos
export function expandSnake(amount) {
    newSegments += amount;
}

// Verifica se uma posição está ocupada pela cobra
export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false;
        return position.x === segment.x && position.y === segment.y;
    });
}

// Adiciona novos segmentos ao corpo da cobra
export function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
    }
    newSegments = 0;
}

//  Retorna a posição da cabeça da cobra
export function getSnakeHead() {
    return snakeBody[0];
}

// Verifica se a cabeça da cobra colidiu com o corpo dela mesma
export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true });
}
