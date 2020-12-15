// Welcome to my recreation of the Google dinosaur game!

// initializing variables and the sprite images they correspond to
var dinosaur = new Image();
var ground = new Image();
var cactus = new Image();

// setting up canvas
var canvas = document.getElementById('mainCanvas');

// loading all the images of the dinosaur, ground, and cactus
dinosaur.onload = function() {
  context.drawImage(dinosaur, 150, 310);
}
dinosaur.src = "dino.png";

ground.onload = function() {
  context.drawImage(ground, 150, 350);
}
ground.src = "ground.png";

cactus.onload = function() {
  context.drawImage(cactus, 450, 290);
}
cactus.src = "cactus.png";

// setting values for the variables in list form for both position and velocity
var groundPos = [0, 350, 2404, 28];
var groundVel = [0, 0, 0, 0];

var cactusPos = [0, 0, 36, 73];
var cactusVel = [0, 0, 0, 0];

// creating a Dino class for dino-related methods
class Dino {
  constructor(posX, posY, widthX, widthY, velY) {
    // initializing variables again for this class
    this.posX = posX;
    this.posY = posY;
    this.widthX = widthX;
    this.widthY = widthY;
    this.velY = velY;
  }

  jump() {
    /*
    Parameters: none, because it relies on user input with pressing keys to be called on
    Returns: none, but it will change variables
    Purpose: makes the dinosaur look like it's jumping
    */
    if (this.posY >= 300) {
      this.velY = -2;
    }
  }
  detectCollision() {
    /*
    Parameters: none
    Returns: will cause the game to end with a "Game Over" message
    Purpose: ends the game
    */
    if ((this.posX + this.widthX >= cactusPos[0]) && (this.posY + this.widthY >= 290) && (this.posX + this.widthX <= cactusPos[0] + 24)) {
      alert("GAME OVER");
      document.location.reload();
      clearInterval(interval);
    }
  }
}

// an instance of the dino
let dino = new Dino(150, 310, 24, 24, 0);

function keyDown(event) {
  /*
    Parameters: an event object containing info about the event triggering the event listener
    Returns: no returns, but it will modify global variables
    Purpose: makes a responsive animation
  */
  keyCode = event.which;
  keyStr = event.key;

  // set the space bar and the up arrow key to trigger the jump method
  if (keyStr == 'ArrowUp' || keyStr == ' ') {
    dino.jump();
  }
}

function drawAll() {
  /*
    Parameters: none, but it relies on other functions
    Returns: none, but it repeats
    Purpose: the main drawing loop
  */

  // makes the dinosaur travel back to the ground due to "gravity"
  if (dino.posY <= 220) {
    dino.velY = 2;
  }
  if (dino.posY > 310) {
    dino.posY = 310;
    dino.velY = 0;
  }
  dino.posY += dino.velY;

  // ground and cactithat moves to the left of the screen
  if (groundPos[0] >= 0) {
    groundVel[2] = -2;
  }
  groundPos[0] += groundVel[2];

  if (cactusPos[0] >= 0) {
    cactusVel[2] = -2;
  }
  cactusPos[0] += cactusVel[2];

  // draws the dinosaur on the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(dinosaur, dino.posX, dino.posY);

  // draws the ground in a continuous motion
  if (groundPos[0] > -1000) {
    context.drawImage(ground, groundPos[0], groundPos[1]);
  } else {
    groundPos[0] += 1000;
  }
  // randomly generates cacti that come from the right side of the screen
  if ((Math.random() < 0.01) && (cactusPos[0] <= dino.posX)) {
    cactusPos[0] = canvas.width + Math.floor(Math.random() * 100);
  }
  context.drawImage(cactus, cactusPos[0], 290);

  // calls on the method so the game will end when dino collides with cactus
  dino.detectCollision();

  // loop
  window.requestAnimationFrame(drawAll);
}


// get width/height of the browser window
windowWidth = window.innerWidth;
windowHeight = window.innerHeight;

// get canvas, and set the width and height from the window
canvas = document.getElementById("mainCanvas");

// set dimensions and border of the canvas
canvas.width = windowWidth - 20;
canvas.height = windowHeight - 20;
canvas.style.border = "1px solid black";

// set up the context for the animation
context = canvas.getContext("2d");

// set up event listener for when user presses a key
document.addEventListener("keydown", keyDown);

// animation engine
window.requestAnimationFrame(drawAll);
