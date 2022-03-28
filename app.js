const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

const colors = document.getElementsByClassName("jsColor");

const range = document.getElementById("jsRange");

const modebtn = document.getElementById("jsMode");
const clearbtn = document.getElementById("jsClear");
const savebtn = document.getElementById("jsSave");

const CANVAS_WIDTH = 700, CANVAS_HEIGHT = 700;
const INITIAL_COLOR = "#2c2c2c";

canvas.width = 700;
canvas.height = 700;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;

const startPainting = event => {
    if (filling) return;
    painting = true;
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

const stopPainting = event => {
    painting = false;
}

const onMouseMove = event => {
    if (painting) {
        const x = event.offsetX;
        const y = event.offsetY;
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

const onMouseDown = event => {
    startPainting(event);
}

const onMouseEnter = event => {
    if (painting) {
        if (event.buttons & 1) {
            startPainting(event);
        }
        else stopPainting(event);
    }
}

const onCanvasClick = event => {
    if (filling)
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

const clearCanvas = event => {
    const before = ctx.fillStyle;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = before;
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseenter", onMouseEnter);
    canvas.addEventListener("click", onCanvasClick);

    clearCanvas(null);
}

Array.from(colors).forEach(element => {
    element.addEventListener("click", event => {
        ctx.strokeStyle = event.target.style.backgroundColor;
        ctx.fillStyle = event.target.style.backgroundColor;
    });
});

if (range) {
    range.addEventListener("input", event => {
        ctx.lineWidth = range.value;
    })
}

filling = false;

if (modebtn) {
    modebtn.addEventListener("click", event => {
        if (filling) {
            filling = false;
            modebtn.innerText = "PAINT";
        }
        else {
            filling = true;
            modebtn.innerText = "FILL";
        }
    })
}

if (clearbtn) {
    clearbtn.addEventListener("click", clearCanvas);
}

if (savebtn) {
    savebtn.addEventListener("click", event => {
        const atag = document.createElement("a");
        atag.href = canvas.toDataURL("image/png");
        atag.download = "PaintJS.png";
        atag.click();
    })
}