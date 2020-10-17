var ctx = document.getElementById("canvas").getContext("2d");
let red = "#F16A70";
let green = "#B1D877";
let blue = "#8CDCDA";
let white = "#FCF6F5";
let initialStep, initial;
let mode;

canvas.width = window.innerWidth / 2.7;
canvas.height = canvas.width;

const setCanvasWidth = () => {
    canvas.width = window.innerWidth / 3;
    canvas.height = canvas.width;
    if (mode) draw();
    else anim(currentAnim);
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
    if (steps != null) {
        mode = true;
        currentAnim = null;
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

let currentAnim;

function anim(trans) {
    mode = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    switch (trans) {
        case 1:
            drawL(red);
            break;
        case 2:
            drawL(green);
            break;
        case 3:
            drawL(blue);
            break;
        case 4:
            drawL(white);
            break;
    }
    currentAnim = trans;
    mode = false;
}

function drawFigure(color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}

function drawL(color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, canvas.height);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.lineTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(canvas.width / 2, canvas.height / 4);
    ctx.lineTo(canvas.width * 3 / 4, canvas.height / 4);
    ctx.lineTo(canvas.width * 3 / 4, 0);
    ctx.fill();
    ctx.restore();
}

let startAnim = () => {
    switch (currentAnim) {
        case 1:
            animate({
                draw: (t) => {
                    ctx.translate(canvas.width * 0.75 * t, canvas.height * 0.25 * t);
                    ctx.rotate(-Math.PI / 2 * t);
                    ctx.scale(1 - 0.75 * t, 1 - 1.25 * t);
                    drawL(red);
                }
            });
            break;
        case 2:
            animate({
                draw: (t) => {
                    ctx.translate(0, canvas.height / 2 * t)
                    ctx.rotate(-Math.PI / 2 * t);
                    ctx.scale(1 - 0.5 * t, 1 - 0.5 * t);
                    drawL(green);
                }
            });
            break;
        case 3:
            animate({
                draw: (t) => {
                    ctx.translate(0, canvas.height / 2 * t);
                    ctx.scale(1 - 0.5 * t, 1 - 0.5 * t)
                    drawL(blue);
                }
            });
            break;
        case 4:
            animate({
                draw: (t) => {
                    ctx.translate(canvas.width / 2 * t, canvas.height * t);
                    ctx.scale(1 - 0.5 * t, 1 - 1.5 * t)
                    drawL(white);
                }
            });
            break;
        case 5:
            animate(
                {
                    draw: (t) => {
                        ctx.save();
                        ctx.translate(0, canvas.height / 2 * t)
                        ctx.rotate(-Math.PI / 2 * t);
                        ctx.scale(1 - 0.5 * t, 1 - 0.5 * t);
                        drawL(green);
                        ctx.restore();
                        ctx.save();
                        ctx.translate(0, canvas.height / 2 * t);
                        ctx.scale(1 - 0.5 * t, 1 - 0.5 * t)
                        drawL(blue);
                        ctx.restore();
                        ctx.save();
                        ctx.translate(canvas.width / 2 * t, canvas.height * t);
                        ctx.scale(1 - 0.5 * t, 1 - 1.5 * t)
                        drawL(white);
                        ctx.restore();
                        ctx.save();
                        ctx.translate(canvas.width * 0.75 * t, canvas.height * 0.25 * t);
                        ctx.rotate(-Math.PI / 2 * t);
                        ctx.scale(1 - 0.75 * t, 1 - 1.25 * t);
                        drawL(red);
                        ctx.restore();
                    }
                }
            );
    }
}

function animate({ draw }) {

    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        // timeFraction goes from 0 to 1
        let timeFraction = (time - start) / 1500;
        if (timeFraction > 1) timeFraction = 1;

        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw(timeFraction); // draw it
        ctx.restore();

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}
