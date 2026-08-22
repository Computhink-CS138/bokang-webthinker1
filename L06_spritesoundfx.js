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
        direction = "left";
    }

    if (keyIsDown(RIGHT_ARROW)) {
        x += 2;
        direction = "right";
    }

    y = constrain(y, 0, height);
    x = constrain(x, 0, height);

    if (keyIsDown(32)) {
        fill(200)
    } else {
        fill(50)
    }

    if (direction == "up") {
        rect(x, y, 50, 50);
    } else if (direction == "down") {
        rect(x, y, 50, 50);
    } else if (direction == "left") {
        rect(x, y, 50, 50);
    } else if (direction == "right") {
        rect(x, y, 50, 50);
    }
}
