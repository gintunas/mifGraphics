var ctx = document.getElementById("canvas").getContext("2d");
let red = "#F16A70";
let green = "#B1D877";
let blue = "#8CDCDA";
let white = "#FCF6F5";
let initialStep, initial;

canvas.width = window.innerWidth/2.7;
canvas.height = canvas.width;

const setCanvasWidth = () =>{
    canvas.width = window.innerWidth/3;
    canvas.height = canvas.width;
    draw();
}

let form = document.getElementById("fractal_form");
function handleForm(event) { 
    event.preventDefault();
    draw();
} 
form.addEventListener('submit', handleForm);

let draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let steps = document.getElementById("input1").value;
    console.log(steps);
    if (steps != null){
        initial = true;
        generateFractal(steps);
    }
}

function generateFractal(steps, color) {
    if (steps > 0) {
        steps = steps - 1;
        if (initial) {
            initialStep = steps;
            initial = false;
        }
        ctx.save();
        ctx.translate(canvas.width * 0.75, canvas.height * 0.25);
        ctx.rotate(-Math.PI / 2);
        ctx.scale(0.25, -0.25);
        if (steps == initialStep) {
            color = red;
        }
        generateFractal(steps, color);
        ctx.restore();

        ctx.save();
        ctx.translate(0, canvas.height / 2)
        ctx.rotate(-Math.PI / 2);
        ctx.scale(0.5, 0.5);
        if (steps == initialStep) {
            color = green;
        }
        generateFractal(steps, color);
        ctx.restore();

        ctx.save();
        ctx.transform(0.5, 0, 0, 0.5, 0, canvas.height / 2);
        if (steps == initialStep) {
            color = blue;
        }
        generateFractal(steps, color);
        ctx.restore();

        ctx.save();
        ctx.transform(0.5, 0, 0, -0.5, canvas.width / 2, canvas.height);
        if (steps == initialStep) {
            color = white;
        }
        generateFractal(steps, color);
        ctx.restore();
    }
    else drawFigure(color);
}

function drawFigure(color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}