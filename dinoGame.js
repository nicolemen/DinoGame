var dino = new Image();
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

dino.onload = function (){
  context.drawImage(dino,50,50);
}

// this isn't working :CCCC
dino.src = ‘dino.png';

var dinoPos = [50,100, 50, 50];
var dinoVel = [0, 0, 0, 0];


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
    dinoPos[1] += dinoVel[1];

    if (dinoPos[1] <= 85){
      dinoVel += 1;
    }
    if(dinoPos[1] >= 100){
      dinoVel -= 1;
    }
  }
  dinoPos[1] += dinoVel[1];
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



  jump();


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
