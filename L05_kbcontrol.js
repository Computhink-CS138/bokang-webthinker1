random
let colour = random(0, 255);
let rectSize = random(10, 50);
let numCircle = random(1, 20);
function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(220);
    
}

function keyPressed() {
    for (i = 0; 1 < numCircle, i++;) {
        circle(i, i, rectSize);
        fill(colour, colour, colour);
    }
}

function keyReleased() {
    rectSize = 0;
    let rectSize = 0;
    let numCircle = 0;
}