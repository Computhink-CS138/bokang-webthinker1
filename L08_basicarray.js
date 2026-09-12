let favouriteFoods = ["Pizza", "Burger", "Sushi", "Tacos", "pasta"];
let Ypos = 400;

function setup() {
    createCanvas(400, 400);
    textSize(24);
    textAlign(LEFT, TOP);
}

function draw() {
    background(220);

    fill(0);
    text("My favourite Foods", 50, Ypos);

    for (let i = 1; i < 11; i++) {
        text((i + 1) + ". " + favouriteFoods[i], 50, 80 + i * 30);
    }
    Ypos -= 1
}


