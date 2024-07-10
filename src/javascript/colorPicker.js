// Seleciona todas as células do seletor de cores (elementos <td> dentro do elemento com id 'color-picker')
const colorPickerCells = document.querySelectorAll('#color-picker td');

// Adiciona um evento de clique a cada célula do seletor de cores
colorPickerCells.forEach(cell => {
    cell.addEventListener('click', () => {
        const color = cell.getAttribute('data-color');
        setSnakeColor(color);
    });
});

// Define a função que altera a cor da cobra
function setSnakeColor(color) {
    const snakeElements = document.querySelectorAll('.snake');
    snakeElements.forEach(element => {
        element.style.backgroundColor = color;
    });
}
