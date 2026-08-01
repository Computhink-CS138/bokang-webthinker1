let shapeColour = 'blue';

function setup() {
    createCanvas(400, 400);
    background(220);
}

function draw() {
    fill(shapeColour);
    
}

function mousePressed() {
    let ranNum = colur(random(255), random(255), random(255))
    fill(ranNum);
    ellipse(200, 200, 80, 80);
}

function mouseReleased() {
    let ranNum = colur(random(255), random(255), random(255))
    fill(ranNum);
    ellipse(200, 200, 80, 80);
}
