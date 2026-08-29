let picoImage;
let popSound; 
let x;
let y;


function preload() {
    picoImage = loadImage('assets/pico-a.png');
    popSound = loadSound('assets/pop.mp3');
}

function setup() {
    createCanvas(600, 400);
}

function draw() {
    background("gray");
        if (keyIsDown(UP_ARROW)) {
        y -= 5;
    }

    if (keyIsDown(DOWN_ARROW)) {
        y += 5;
    }

    if (keyIsDown(LEFT_ARROW)) {
        x -= 5;
    }

    if (keyIsDown(RIGHT_ARROW)) {
        x += 5;
    }


    y = constrain(y, 0, width - 100);
    x = constrain(x, 0, height - 100);
    image(picoImage, width / 2, height / 2, 100, 100); // (image, x, y, width, height);

}

