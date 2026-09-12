let squareX = 0;
let squareY = 0;
let speed = 5;

function setup() {
    createCanvas(600, 400);
    background(220);

    textSize(40);

    text("Hello!", width / 2, height / 2); // (string, x pos, y pos);
}

function draw() {
    background(220);

    if (squareX > width - 100) {
        speed *= -1;
    } else if (squareX < width - 100) {
        speed *= 1;
    }

    if (squareY > height - 100) {
        speed *= -1;
    } else if (square )

    squareX += speed;
   

    fill(255, 255, 0);
    rect(squareX, squareY, 100, 100);

}



