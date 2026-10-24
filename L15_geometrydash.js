let playerX = 100;
let playerY;
let playerSize = 30;
let velocity = 0;
let isGrounded = false;

function setup() {
    createCanvas;
    textAlign(CENTER, CENTER);
    playerY = height - playerSize;
}

function draw() {
    background(0);

    rect(playerX, playerY, playerSize, playerSize);
}

