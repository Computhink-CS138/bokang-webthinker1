function setup() {
    createCanvas(400, 400);
    background(220);
}
// let x = 0
// let y = 100
// let direction = "up"
// function draw() {
//     background(220);
//     if (keyIsDown(UP_ARROW)) {
//         y -= 2;
//         direction = "up";
//     }

//     if (keyIsDown(DOWN_ARROW)) {
//         y += 2;
//         direction = "down";
//     }
//     if (direction == "up") {
//         triangle(75, y + 25, 100, y - 25, 125, y + 25);
//     } else if (direction == "down") {
//         triangle(75, y - 25, 100, y + 25, 125, y -t 25);
//     }
// }





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

function keyReleased() {
    background(220); 
}

function keyPressed() {
    console.log("key:", key);
    console.log("keycode:", keyCode);
    if (key == 'c') {
        circle(200, 200, 50);
    elif (keyCode == 32)
        square(200, 200, 50);
    }
}


