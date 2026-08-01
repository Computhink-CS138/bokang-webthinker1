let shapeColour = 'blue';

function setup() {
    createCanvas(400, 400);
    background(220);
}

function draw() {
    fill(shapeColour);
    ellipse(200, 200, 80, 80);
}

function mousePressed() {
    shapeColour = 'red';
}

function mouseReleased() {
    shapeColour
}