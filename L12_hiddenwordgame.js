let textField;
let placeField;
let submitButton;

let wordArray = ["banana", "potato", "apple", "orange"];
let randomWord;
let displayHint;


function setup() {
    createCanvas(600, 400);
    background(100);


    let offsetX = this.canvas.offsetLeft;
    let offsetY = this.canvas.offsetTop;



    textField = createInput();
    textField.position(width / 2 + offsetX - 80, height / 2 + offsetY);
    textField.size(150, 30);
    textField.style("background-color", "lightblue");
    textField.style("font-size", "20px");
    textField.style("border", "1px solid black");
    textField.style("text-align", "center");
    
    submitButton = createButton("Guess");
    submitButton.position(width / 2 + offsetX + 100, height / 2 + offsetY);
    submitButton.mousePressed(submitGuess);

    randomWord = random(wordArray);
    displayHint = randomWord[0].toUpperCase() + " " + "_ ".repeat(randomWord.length - 1);

    fill(0);
    textSize(28);
    textAlign(CENTER, CENTER);

    text("Hint: " + displayHint, width / 2, height * 0.4);
}

function draw() {

}

function submitGuess() {
    let inputText = textField.value();

    fill(0);
    textSize(28);
    text(inputText, width / 2, height / 3);
}

function correctGuess(guess, word) {
    for (let i = 0; i < 10; i++);
}