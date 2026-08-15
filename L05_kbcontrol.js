function setup() {
    createCanvas(200, 200);
    background(220);
}
let x = 0
function draw() {
    background(220);
    if (keyIsDown(RIGHT_ARROW)) {
        x += 1
    }
    circle(width / 2 + x, height / 2, 100);
    if (keyIsDown(RIGHT_ARROW)) {
    x -= 1
    }
    circle(width / 2 + x, height / 2, 100);
}





// function mouseMoved() {
//     if (mouseX < 74) {
//         fill("red")
//     }
//     else if (mouseX >= 75 && mouseX < 125){
//         fill("green")
//     }
//     else if (mouseX >= 126) {
//         fill("blue")
//     }
// }

// function keyPressed() {
//     if (key == "w") {
//         fill(255, 255, 255);
//     }else if (key == "r"){
//         fill("red");
//     }else if (key == "g") {
//         fill("green")
//     }else {
//         fill("yellow");
//     }
// }


// function 
// function draw() {
//     background(220);
// }

// function keyPressed() {
//     let numCircle = random(1, 20);
//     for (let i = 0; i < numCircle; i++) {
//         let colour1 = random(0, 255);
//         let colour2 = random(0, 255);
//         let colour3 = random(0, 255);
//         let rectSize = random(10, 50);
//         let random1 = random(0, 400);
//         let random2 = random(0, 400);
//         fill(colour1, colour2, colour3);
//         ellipse(random1, random2, rectSize, rectSize);
        
//     }
// }

// function keyReleased() {
//     background(220); 
// }

// function keyPressed() {
//     console.log("key:", key);
//     console.log("keycode:", keyCode);
//     if (key == 'c') {
//         circle(200, 200, 50);
//     elif (keyCode == 32)
//         square(200, 200, 50);
    
    
//     }
// }


