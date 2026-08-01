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
    let ranNum = colour(random(255), random(255), random(255))
    fill(ranNum);
    ellipse(200, 200, 80, 80);
}

function mouseReleased() {
    shapeColour = ranNum;
}
