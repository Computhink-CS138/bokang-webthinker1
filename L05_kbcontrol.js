let rectSize = 50;

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(220);
}

function keyPressed() {
    rectSize = 100;
}

function keyReleased() {
    rectSize = 0;
}