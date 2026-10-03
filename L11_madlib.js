let nounfield;
let verbfield;
let adjfield;
let acvfield;
let placefield;

let offsetX = this.canvas.offsetLeft;
let offsetY = this.canvas.offsetTop;
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

    nounfield.position(width / 2 + offsetX, height * 0.2);
    verbfield.position(width / 2 + offsetX, height * 0.2 + 50);
    adjfield.position(width / 2 + offsetX, height * 0.2 + 100);
    acvfield.position(width / 2 + offsetX, height * 0.2 + offsetY + 150);
    placefield.position(width / 2 + offsetX, height * 0.2 + offsetY + 200);

}

function draw() {
    background(100);

    text("Enter a noun:", width * 0.2, height * 0.2 + offsetY);
    text("Enter a verb:", width * 0.2,height * 0.2 + offsetY);
    text("Enter an adjetive:", width * 0.2,height * 0.2 + offsetY);
    text("Enter a adverb:", width * 0.2,height * 0.2 + offsetY);
    text("Enter a place:", width * 0.2,height * 0.2 + offsetY);
}