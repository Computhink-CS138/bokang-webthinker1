random
let colour = random(0, 255);
let rectSize = random();
let numCircle = random(1, 20);
function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(220);
}

function keyPressed() {
    rectSize = random();
}

function keyReleased() {
    rectSize = 0;
}