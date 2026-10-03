let nounfield;
let verbfield;
let adjfield;
let acvfield;
let placefield;

function setup() {
    createCanvas(600, 400);

    fill(255, 255, 0);
    textSize(40);
    textAlign(CENTER, CENTER);

    nounfield = createInput();
    verbfield = createInput();
    adjfield = createInput();
    acvfield = createInput();
    placefield = createInput();

    let offsetX = this.canvas.offsetLeft;
    let offsetY = this.canvas.offsetTop;

    nounfield.position(width / 2, height / 2 + offsetY);
    let inputX = this.canvas.offsetLeft + (width / 2) - 80;
    let inputY = this.canvas.offsetTop + (height / 2) - 10;
    inputText.position(inputX, inputY);
}

function draw() {

}