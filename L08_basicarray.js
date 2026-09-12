let favouriteFoods = ["Pizza", "Burger", "Sushi", "Tacos", "pasta"];

function setup() {
    createCanvas(400, 400);
    textSize(24);
    textAlign(LEFT, TOP);
}

function draw() {
    background(220);

    fill(0);
    text("My favourite Foods", 50, 50);
    for (let i = 1; i < 11; i++) {
        text((i + 1) + "")
    }
}

for (let i = 1; i < 11; i++) {

}
