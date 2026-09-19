let yPos;

function setup() {
    createCanvas(600, 400);
    textSize(24);
    textAlign(LEFT, CENTER);
    fill("rgb(255, 255, 0)");

    yPos = height;
}

function draw() {
    //reset canvas
    background(0);

    text("asd", width / 2, Ypos);
    yPos -= 1;
}