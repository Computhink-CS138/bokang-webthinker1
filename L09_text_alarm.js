let hr;
let min;
let sec;
let timeString;

function setup() {
    createCanvas(600, 400);
    textSize(24);
    textAlign(CENTER, CENTER);
    fill("rgb(208, 0, 255)");
}

function draw() {
    background(0);
    hr = hour();
    min = minute();
    sec = second();

    timeString = nf(hr, 2)

    text(hr, width / 2, height / 2);
    text(min, width / 2, height / 2 + 50);
    text(sec, width / 2, height / 2 + 100);
}