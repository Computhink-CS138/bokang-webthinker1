let shapeColour = 'blue';
fill(ranNum);
function setup() {
    createCanvas(400, 400);
    background(220);
}

function draw() {
    fill(shapeColour);
    ;
}

function mousePressed() {
    shapeColour = ranNum;
}

function mouseReleased() {
    shapeColour = ranNum;
}
