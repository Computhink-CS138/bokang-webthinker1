// let hr;
// let min;
// let sec;
// let timeString;

// function setup() {
//     createCanvas(600, 400);
//     textSize(24);
//     textAlign(CENTER, CENTER);
//     fill("rgb(208, 0, 255)");
// }

// function draw() {
//     background(0);
//     hr = hour();
//     min = minute();
//     sec = second();

//     timeString = nf(hr, 2) + " : " + nf(min, 2) + " : " + nf(sec, 2);

//     text(timeString, width / 2, height / 2);
// }
///////////////////////////////////////////////////////////////////////////
// let intervalid;

// let x = 0;

// function setup() {
//     createCanvas(600, 400);

//     // draw circle every 1000ms (1sec)
//     intervalid = setInterval(drawCircle, 100);
// }

// function draw() {

// }




// function drawCircle() {
//     clear();
//     circle(x, 50, 20);
//     x += 10;
//     if (x > 200) {
//         x = 0;
//     }
// }

// function mousePressed() {

//     clearInterval(intervalid);
// }

let intervalId;

let countdownStart = false;

let timer = 5;

function setup() {
    
    createCanvas(600, 400);
    intervalId = setInterval(updateCountdown, 1000);
    
    fill(255, 0, 0);
    textSize(40);
}

function draw() {
    background("black");
    text(timer, width / 2, height / 2);
}

function mousePressed() {
    if (countdownStart = false) {
        countdownStart = true;
        timer = 5;
        intervalId = setInterval(updateCountdown, 1000);
    }
    
}


function updateCountdown() {
    clear();
    timer -= 1;


    if (timer <= 0) {
        clearInterval(intervalId);
        countdownStart = false;
    }
}
















