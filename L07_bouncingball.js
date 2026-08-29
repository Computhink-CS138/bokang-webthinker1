let picoImage;
let popSound; 
let x = 200;
let y = 300;


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


    image(picoImage, x, y, 100, 100);
     // (image, x, y, width, height);

}

