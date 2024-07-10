// Inicializa a direção de entrada
let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

// Obtém a direção de entrada
export function getInputDirection() {
    lastInputDirection = inputDirection;
    return inputDirection;
}

// Adiciona um evento de tecla pressionada para mudar a direção da cobra
addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (lastInputDirection.y !== 0) break;
            inputDirection = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (lastInputDirection.y !== 0) break;
            inputDirection = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (lastInputDirection.x !== 0) break;
            inputDirection = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (lastInputDirection.x !== 0) break;
            inputDirection = { x: 1, y: 0 };
            break;
    }
});
