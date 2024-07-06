const colorPickerCells = document.querySelectorAll('#color-picker td');

colorPickerCells.forEach(cell => {
    cell.addEventListener('click', () => {
        const color = cell.getAttribute('data-color');
        setSnakeColor(color);
    });
});

function setSnakeColor(color) {
    const snakeElements = document.querySelectorAll('.snake');
    snakeElements.forEach(element => {
        element.style.backgroundColor = color;
    });
}
