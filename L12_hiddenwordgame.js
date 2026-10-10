let textField;
let placeField



function setup() {
    createCanvas(600, 400);
    background(0);
    let offsetX = this.canvas.offsetLeft;
    let offsetY = this.canvas.offsetTop;
    textField = createInput();
    placeFeild.position(width / 2 + offsetX, height / 2 + offsetX);

    fill(255, 255, 0);
    textSize(40);
    textAlign(CENTER, CENTER);
    
    submitButton = createButton("Guess");
    submitButton.position(width / 2 + offsetX, height * 0.2 + offsetY + 250);
    submitButton.mousePressed(generateStory);
}

function draw() {

}