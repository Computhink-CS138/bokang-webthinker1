random
let colour = random(0, 255);
let rectSize = random(10, 50);
let numCircle = random(1, 20);
function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(220);
    for (i = 0; 1 < numCircle, i++;) {
        circle(i, i, rectSize);
        fill(colour);
    }
}

function keyPressed() {
    rectSize = random();
}

function keyReleased() {
    rectSize = 0;
}