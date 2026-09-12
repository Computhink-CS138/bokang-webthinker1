let squareX = 0;
let squareY = 0;

function setup() {
    createCanvas(600, 400);
    background(220);
}

function draw() {
    squareX += 10;
    squareY += 10;
    
    fill(255, 255, 0);
    rect(squareX, squareY, 100, 100);

}



