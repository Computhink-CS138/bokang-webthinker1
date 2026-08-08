random
let rectSize = random();
let numCircle = random()
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