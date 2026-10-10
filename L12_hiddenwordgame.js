let textField;
let placeField;


function setup() {
    createCanvas(600, 400);
    background(100);


    let offsetX = this.canvas.offsetLeft;
    let offsetY = this.canvas.offsetTop;

    textField = createInput();
    textField.position(width / 2 + offsetX - 80, height / 2 + offsetY);
    
    submitButton = createButton("Guess");
    submitButton.position(width / 2 + offsetX + 100, height / 2 + offsetY);
    submitButton.mousePressed(generateStory);
}

function draw() {

}

function submitGuess() {
    
}