let shapeColour = 'blue';
let ranNum = colour(random(255), random(255), random(255))
fill(ran)
function setup() {
    createCanvas(400, 400);
    background(220);
}

function draw() {
    fill(shapeColour);
    ellipse(200, 200, 80, 80);
}

function mousePressed() {
    shapeColour = random(0, 255, 255);
}

function mouseReleased() {
    shapeColour = random(0, 255, 255);
}
