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

    nounfield.position(width / 2 + offsetX, height * 0.2 + offsetY);
    verbfield.position(width / 2 + offsetX, height * 0.2 + 50 + offsetY);
    adjfield.position(width / 2 + offsetX, height * 0.2 + 100 + offsetY);
    acvfield.position(width / 2 + offsetX, height * 0.2 + 150 + offsetY);
    placefield.position(width / 2 + offsetX, height * 0.2 + 200 + offsetY);

    submitButton = createButton("Generate Story");
    submitButton.position(width / 2 + offsetX, height * 0.2 + offsetY + 250);
    submitButton.mousePressed(buttonExample);

}

function draw() {
    background(200);

    text("Enter a noun:", width * 0.2, height * 0.2);
    text("Enter a verb:", width * 0.2, height * 0.2 + 50);
    text("Enter an adjetive:", width * 0.2, height * 0.2 + 100);
    text("Enter a adverb:", width * 0.2, height * 0.2 + 150);
    text("Enter a place:", width * 0.2, height * 0.2 + 200);
}

function buttonExample() {
    console.log("Button clicked!");
}

function generateStory() {
    let noun = nounfield.value();
    let verb = verbfield.value();
    let adjetive = adjfield.value();
    let adverb = acvfield.value();
    let place = placefield.value();

    let 

    console.log("");


}






