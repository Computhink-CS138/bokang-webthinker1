let Ypos

function setup() {
    createCanvas(600, 400);
    textSize(24);
    textAlign(LEFT, CENTER);
    fill("rgb(255, 255, 0)");

    Ypos = hieght;
}

function draw() {
    background(0);

    text("asd", width / 2, Ypos);
}