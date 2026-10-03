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

    nounfield.position(width / 2, height * 0.2 + offsetY);
    verbfield.position(width / 2, height * 0.2 + offsetY + 50);
    adjfield.position(width / 2, height * 0.2 + offsetY + 100);
    acvfield.position(width / 2, height * 0.2 + offsetY + 150);
    placefield.position(width / 2, height * 0.2 + offsetY + 200);

    text("Enter a noun")
}

function draw() {
    background(100);
}