let hour;
let minute;
let second;

function setup() {
    createCanvas(600, 400);
    textSize(24);
    textAlign(CENTER, CENTER);
    fill("rgb(208, 0, 255)");
}

function draw() {
    hour = hour();
    minute = minute();
    second = second();

    text(hour, width / 2, height / 2)
}