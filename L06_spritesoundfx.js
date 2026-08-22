// let x = 100
// let y = 100
// let direction = "up"

// function setup() {
//     createCanvas(400, 400);
//     background(220);
// }

// function draw() {
//     background(220);
//     if (keyIsDown(UP_ARROW)) {
//         y -= 5;
//         direction = "up";
//     }

//     if (keyIsDown(DOWN_ARROW)) {
//         y += 5;
//         direction = "down";
//     }

//     if (keyIsDown(LEFT_ARROW)) {
//         x -= 5;
//         direction = "left";
//     }

//     if (keyIsDown(RIGHT_ARROW)) {
//         x += 5;
//         direction = "right";
//     }

//     y = constrain(y, 50, 350 - 50);
//     x = constrain(x, 50, 350 - 50);

//     if (keyIsDown(32)) {
//         fill(200)
//     } else {
//         fill(50)
//     }

//     if (direction == "up") {
//         rect(x, y, 50, 50);
//     } else if (direction == "down") {
//         rect(x, y, 50, 50);
//     } else if (direction == "left") {
//         rect(x, y, 50, 50);
//     } else if (direction == "right") {
//         rect(x, y, 50, 50);
//     }
// }

let soundEffect, bigMusic, staticImage;

function preload() {
    soundEffect = loadSound('assets/pop.mp3');
    bigMusic = loadSound('assets/bossaNova.mp3');
    staticImage = loadSound('assets/pop.mp3');
}

function setup() {
    createCanvas(200, 200);
    BigM
}