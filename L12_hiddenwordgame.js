let nounfield;



function setup() {
    createCanvas(600, 400);
    background();
    let offsetX = this.canvas.offsetLeft;
    let offsetY = this.canvas.offsetTop;
    textFeild = createInput();
    placeFeild.position(width / 2 + offsetX, height / 2 + offsetX);

    fill(255, 255, 0);
    textSize(40);
    textAlign(CENTER, CENTER);

    nounfield.position(width / 2 + offsetX, height * 0.2 + offsetY);
    
    submitButton = createButton("Guess");
    submitButton.position(width / 2 + offsetX, height * 0.2 + offsetY + 250);
    submitButton.mousePressed(generateStory);
}

function draw() {

}