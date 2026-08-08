function setup() {
    createCanvas(400, 400);
    background(220);
}

// function draw() {
//     background(220);
// }

function keyPressed() {
    let numCircle = random(1, 20);
    for (let i = 0; i < numCircle; i++) {
        let colour = random(0, 255);
        let rectSize = random(10, 50);
        let random1 = random(0, 400);
        let random2 = random(0, 400);
        fill(colour, colour, colour);
        ellipse(random1, random2, rectSize, rectSize);
        
    }
}

function keyReleased() {
    background(220); 
}