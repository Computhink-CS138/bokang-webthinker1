let squareX = 0;
let squareY = 0;
let speed = 5;

function setup() {
    createCanvas(400, 400);
    background(220);

    textSize(10);
    textAlign(CENTER, CENTER);
    text("Hello!", width / 2, height / 2); // (string, x pos, y pos);
    text("My name is bokang", 50, 50);
    text("My age is 13", 50, 100);
    text("I like playing video games", 50, 150);
}

function text() {
    text("My name is bokang", 50, 50);
    text("My age is 13", 50, 100);
    text("I like playing video games", 50, 150);
}
