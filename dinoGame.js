//Need to Add: an example of object-oriented programming


var dino = new Image();
var ground = new Image();
var cactus = new Image();
var canvas = document.getElementById('mainCanvas');
//var context = canvas.getContext('2d'); this gets repeated later on?



dino.onload = function() {
  context.drawImage(dino, 150, 300);
  console.log('draw image');
}
dino.src = "dino.png";

//var repeat = context.createPattern(ground,'repeat-x');

ground.onload = function() {
  context.drawImage(ground, 150, 350);
  console.log('draw image');

}
ground.src = "ground.png";

cactus.onload = function() {
  context.drawImage(cactus, 450, 290);
  console.log('draw image');
}
cactus.src = "cactus.png";

var dinoPos = [150, 300, 50, 50];
var dinoVel = [0, 0, 0, 0];

var groundPos = [0,350,1118, 100];
var groundVel = [0,0,0,0];

function keyDown(event) {
  /*
    Parameters: an event object containing info about the event triggering the event listener
    Returns: no returns, but it will modify global variables
    Purpose: makes a responsive animation
  */
  keyCode = event.which;
  keyStr = event.key;
  console.log(event);
  console.log(keyCode);
  console.log(keyStr);

  if (keyStr == 'ArrowUp' || keyStr == ' ') {
    // dino.jump();
    if (dinoPos[1] >= 300) {
      dinoVel[1] = -1;
    }
  }


}

//function jump() {
/*
Parameters: none, because it relies on user input with pressing keys
Returns: none, but it will change global variables
Purpose: makes the dinosaur look like it's jumping
*/
// set upper height and then switch velocity

//}

function drawAll() {
  /*
    Parameters: none, but it relies on other functions
    Returns: none, but it repeats
    Purpose: the main drawing loop
  */

  if (dinoPos[1] <= 225) {
    dinoVel[1] = 1;
  }
  if (dinoPos[1] > 300) {
    dinoPos[1] = 300;
    dinoVel[1] = 0;
  }
  dinoPos[1] += dinoVel[1];

  if (groundPos[0] >= 0){
    groundVel[2] = -1;
  }
  groundPos[0] += groundVel[2];


  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(dino, dinoPos[0], dinoPos[1]);
  context.drawImage(ground, groundPos[0], groundPos[1]);
  context.drawImage(cactus, 450, 290);

  //context.rect(0,350,1118,100);
  //context.fillStyle = repeat;
  //context.fill();
  // loop
  window.requestAnimationFrame(drawAll);
}


// Get width/height of the browser window
windowWidth = window.innerWidth;
windowHeight = window.innerHeight;
console.log("Window is %d by %d", windowWidth, windowHeight);

// Get the canvas, set the width and height from the window
canvas = document.getElementById("mainCanvas");

canvas.width = windowWidth - 20;
canvas.height = windowHeight - 20;
canvas.style.border = "1px solid black";

// Set up the context for the animation
context = canvas.getContext("2d");

// Set up event listener for when user presses a key down.
// It then calls the function keyDown, passing it an event object.
document.addEventListener("keydown", keyDown);

// Fire up the animation engine
window.requestAnimationFrame(drawAll);
