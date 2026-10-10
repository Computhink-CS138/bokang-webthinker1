let textField;
let placeField;


function setup() {
    createCanvas(600, 400);
    background(100);


    let offsetX = this.canvas.offsetLeft;
    let offsetY = this.canvas.offsetTop;

    textField = createInput();
    placeField.position(width / 2 + offsetX - 80, height / 2 + offsetX);

    fill(255, 255, 0);
    textSize(40);
    textAlign(CENTER, CENTER);
    
    submitButton = createButton("Guess");
    submitButton.position(width / 2 + offsetX, height * 0.2 + offsetY + 250);
}

function draw() {

}