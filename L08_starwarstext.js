let yPos;
let storyText = [
    "A long time ago in a galaxy far, ",
    "far away...",
    "",
    "EPISODE 1",
    "THE BEGINNING",
    "",
    "",
    "It was a period of civil war",
    "Rebel spaceships",
    "  "
]

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

    text("asd", width / 2, yPos);
    yPos -= 1;
}