const canvas = document.querySelector('.canvas');
const colorInp = document.querySelector('#color');
const strokeInp = document.querySelector('#stroke');
const ssBtn = document.querySelector('.ssBtn');
const image = document.querySelector('.image');
const clrBtn = document.querySelector('.clrBtn');

const canvasPos = canvas.getBoundingClientRect();

let color = '';
let stroke = '';
let isDrawing = false;

colorInp.addEventListener('input', (e) => {
    color = e.target.value;
});

strokeInp.addEventListener('input', (e) => {
    stroke = e.target.value;
});

// Touch event listener
canvas.addEventListener('touchmove', (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    drawPoint(touch.clientX, touch.clientY);
});

// Mouse event listeners
canvas.addEventListener('mousedown', () => {
    isDrawing = true;
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

canvas.addEventListener('mousemove', (event) => {
    if (isDrawing) {
        drawPoint(event.clientX, event.clientY);
    }
});

// Drawing Logic
function drawPoint(x, y) {
    const point = document.createElement('div');
    point.classList.add('point');
    point.style.top = `${y}px`;
    point.style.left = `${x}px`;
    point.style.background = `${color}`;
    point.style.height = `${stroke}px`;
    point.style.width = `${stroke}px`;

    // Check if point is within canvas bounds
    if (x < canvasPos.right && x > canvasPos.left && y > canvasPos.top && y < canvasPos.bottom) {
        canvas.appendChild(point);
    }
}

ssBtn.addEventListener('click', () => {
    html2canvas(canvas).then((canvas) => {
        const base64image = canvas.toDataURL("image/png");
        image.src = base64image;
    });
});

clrBtn.addEventListener('click', () => {
    const points = document.querySelectorAll('.point');
    points.forEach((p) => {
        canvas.removeChild(p);
    });
});