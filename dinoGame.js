//Need to Add: a class for dino? with setters and getters?
// dino collision

var dino = new Image();
var ground = new Image();
var cactus = new Image();
var canvas = document.getElementById('mainCanvas');
//var context = canvas.getContext('2d'); this gets repeated later on?

dino.onload = function() {
  context.drawImage(dino, 150, 310);
}
dino.src = "dino.png";


ground.onload = function() {
  context.drawImage(ground, 150, 350);
}
ground.src = "ground.png";

cactus.onload = function() {
  context.drawImage(cactus, 450, 290);
}
cactus.src = "cactus.png";

var dinoPos = [150, 310, 24, 24];
var dinoVel = [0, 0, 0, 0];

var groundPos = [0, 350, 2404, 28];
var groundVel = [0, 0, 0, 0];

var cactusPos = [0, 0, 36, 73];
var cactusVel = [0, 0, 0, 0];

class Dino{
  constructor(posX, posY){
      this.posX = posX;
      this.posY = posY;
  }
  //
}

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
      dinoVel[1] = -2;
    }
  }

  if (keyStr == 'b'){
    console.log(dinoPos);
    console.log(cactusPos);
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

  if (dinoPos[1] <= 220) {
    dinoVel[1] = 2;
  }
  if (dinoPos[1] > 310) {
    dinoPos[1] = 310;
    dinoVel[1] = 0;
  }
  dinoPos[1] += dinoVel[1];

  if (groundPos[0] >= 0) {
    groundVel[2] = -2;
  }
  groundPos[0] += groundVel[2];


  if (cactusPos[0] >= 0) {
    cactusVel[2] = -2;
  }
  cactusPos[0] += cactusVel[2];

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(dino, dinoPos[0], dinoPos[1]);

  if (groundPos[0] > -1000) {
    context.drawImage(ground, groundPos[0], groundPos[1]);
  } else {
    groundPos[0] += 1000;
  }

  if ((Math.random() < 0.01) && (cactusPos[0] <= dinoPos[0])) {
    cactusPos[0] = canvas.width + Math.floor(Math.random() * 100);
  }
  context.drawImage(cactus, cactusPos[0], 290);

  if ((dinoPos[0] + dinoPos[2] >= cactusPos[0]) && (dinoPos[1] + dinoPos[3] >= 290) && (dinoPos[0] + dinoPos[2] <= cactusPos[0] + 24)) {
    console.log(dinoPos, cactusPos);
    alert("GAME OVER");
    document.location.reload();
    clearInterval(interval);
  }
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
