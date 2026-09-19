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
    "Rebel spaceships, striking",
    "from a hidden base, have",
    "won their first victory",
    "against the evil Galactic", 
    "Empire"
];

function setup() {
    createCanvas(600, 400);
    textSize(24);
    textAlign(CENTER, CENTER);
    fill("rgb(255, 255, 0)");

    yPos = height;
}

function draw() {
    //reset canvas
    background(0);

  
    for (let i = 0; i < storyText.length; i++) {
        text(storyText[i], width / 2, yPos + 1 * 50);
    yPos -= 1;
}
}