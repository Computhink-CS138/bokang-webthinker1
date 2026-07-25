
let colourValue; 
let Colour = 0

function setup() {
    createCanvas(600, 400);
    background(220);
    noLoop(); // Stops continuous drawing
  }
  
function draw() {
  // Recap 1: Repeating Circles
  // circle(75, 200, 100);
  // circle(225, 200, 100);
  // circle(375, 200, 100);
  // circle(540, 200, 100);


  // Task 1: Colour Gradient
// let num = 0 
// for (let i = 0; i < 5; i++) {
//   console.log(i);
//   fill(20, 20  + i * 30, 50)
//   circle(50 + i * 50, 100, 40);
// }

  // Task 2: Colour Loop
  for (row = 0; row < 8; row++) {
    for (col = 0; col < 14; col++) { 
      if ((row + col) % 2 == 0){
        fill(0);
      } else {
       fill(255)
      }
      rect(col * 50, row * 50, 50, 50);
   }
  }



  // Task 3: Row of Circles

  // Task 4: Grid of Circles
}