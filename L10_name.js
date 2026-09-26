let inputText;
let displayText = "Your name here";

function setup() {
    createCanvas(600, 400);
    fill(255, 255, 0);
    textSize(40);
    textAlign(CENTER, CENTER);

    inputText = createInput();

    inputText.position(width / 2, height / 2);
    let inputX = this.canvas.offsetLeft + (width / 2) - 80;
    let inputY = this.canvas.offsetTop + (height / 2) - 80;
    inputText.position(inputX, inputY);

    inputText.input(updateText);
}

function draw() {
    background(0);

    text(displayText, width / 2, height * 0.3);
}

function updateText() {

    displayText = this.value();
    console.log(displayText);
}









