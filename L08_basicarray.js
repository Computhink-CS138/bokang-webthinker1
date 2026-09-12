let squareX = 0;
let squareY = 0;
let speed = 5;

function setup() {
    createCanvas(600, 400);
    background(220);
}

function draw() {
   
    if (squareX > width) {
        speed *= -1;
    }

    squareX += speed;
    squareY += speed;

    fill(255, 255, 0);
    rect(squareX, squareY, 100, 100);

}



