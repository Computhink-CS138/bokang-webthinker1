// let picoImage;
// let popSound; 
// let x = 0;
// let y = 0;
// let picoWidth = 100;

// function preload() {
//     picoImage = loadImage('assets/pico-a.png');
//     popSound = loadSound('assets/pop.mp3');
// }

// function setup() {
//     createCanvas(600, 400);
// }

// function draw() {
//     background("gray");
//         if (keyIsDown(UP_ARROW)) {
//         y -= 5;
//     }

//     if (keyIsDown(DOWN_ARROW)) {
//         y += 5;
//     }

//     if (keyIsDown(LEFT_ARROW)) {
//         x -= 5;
//     }

//     if (keyIsDown(RIGHT_ARROW)) {
//         x += 5;
//     }
//     x = constrain(x, 0, width - 100);
//     y = constrain(y, 0, height - 100);

//     image(picoImage, x, y, picoWidth, 100);
//      // (image, x, y, width, height);

// }

// function keyPressed() {
//     if (keyCode === 32) {
//         popSound.play();
//         picoWidth = 50;
//     }
// }

// function keyReleased() {
//     if (key === " ") {
//         picoWidth = 100;
//     }
// }
let ballX = 300;
let ballY = 200;
let ballSize = 50;
let ballSpeedX = 5;
let ballSpeedY = 5;

function setup() {
    createCanvas(600, 400);
    background(220);
}

function draw() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballX <= 0 + ballSize / 2 || ballX >= width - ballSize / 2) {
        ballSpeedX *= -1;
    }
    if (ballY <= 0 - ballSize / 2 || ballY >= height - ballSize / 2) {
        ballSpeedY *= -1;
    }
    
    noStroke();
    fill(random(0), );

    circle(ballX, ballY, ballSize);
}



