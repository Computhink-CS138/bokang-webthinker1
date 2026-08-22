let x = 0
let y = 100
let direction = "up"

function setup() {
    createCanvas(400, 400);
    background(220);
}

function draw() {
    background(220);
    if (keyIsDown(UP_ARROW)) {
        y -= 2;
        direction = "up";
    }

    if (keyIsDown(DOWN_ARROW)) {
        y += 2;
        direction = "down";
    }

    if (keyIsDown(LEFT_ARROW)) {
        x -= 2;
        direction = "down";
    }

    y = constrain(y, 0, height);

    if (direction == "up") {
        triangle(75, y + 25, 100, y - 25, 125, y + 25);
    } else if (direction == "down") {
        triangle(75, y - 25, 100, y + 25, 125, y - 25);
    }
}
