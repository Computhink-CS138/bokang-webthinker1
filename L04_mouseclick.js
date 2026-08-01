let shapeColour = 'blue';
let ranNum = colour(random(255), random(255), random(255))
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
