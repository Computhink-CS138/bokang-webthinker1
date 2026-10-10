let textField;
let placeField;


function setup() {
    createCanvas(600, 400);
    background(100);


    let offsetX = this.canvas.offsetLeft;
    let offsetY = this.canvas.offsetTop;

    textField = createInput();
    placeField.position(width / 2 + offsetX - 80, height / 2 + offsetY);
    
    submitButton = createButton("Guess");
    submitButton.position(width / 2 + offsetX + 100, height / 2 + offsetY);
}

function draw() {

}