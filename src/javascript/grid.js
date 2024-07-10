// Define o tamanho do grid
const GRID_SIZE = 21;

// Gera uma posição aleatória no grid
export function randomGridPosition() {
    return {
        x: Math.floor(Math.random() * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1
    };
}

// Verifica se uma posição está fora do grid
export function outsideGrid(position) {
    return position.x < 1 || position.x > GRID_SIZE || position.y < 1 || position.y > GRID_SIZE;
}
