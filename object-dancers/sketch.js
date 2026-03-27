/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new GavynDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class GavynDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;

    this.t = 0;
    this.speed = 0.08;

    this.bounce = 0;
    this.sway = 0;
    this.armSwing = 0;
    this.legSwing = 0;
    this.headTilt = 0;
    this.eyeHeight = 6;
  }

  update() {
    this.t += this.speed;

    this.bounce = sin(this.t * 2) * 10;
    this.sway = sin(this.t) * 15;
    this.armSwing = sin(this.t * 3) * 0.7;
    this.legSwing = sin(this.t * 3 + PI) * 0.5;
    this.headTilt = sin(this.t * 2) * 0.15;

    if (sin(this.t * 4) > 0.93) {
      this.eyeHeight = 1;
    } else {
      this.eyeHeight = 6;
    }
  }

  display() {
    push();
    translate(this.x + this.sway, this.y + this.bounce);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️

    stroke(255);
    strokeWeight(4);

    // legs
    push();
    translate(0, 25);

    push();
    rotate(this.legSwing);
    line(-12, 20, -20, 65);
    pop();

    push();
    rotate(-this.legSwing);
    line(12, 20, 20, 65);
    pop();

    pop();

    // body
    noStroke();
    fill(80, 170, 255);
    rectMode(CENTER);
    rect(0, 0, 45, 70, 12);

    // arms
    stroke(255);
    strokeWeight(4);

    push();
    translate(-23, -10);
    rotate(this.armSwing);
    line(0, 0, -28, 25);
    pop();

    push();
    translate(23, -10);
    rotate(-this.armSwing);
    line(0, 0, 28, 25);
    pop();

    // head
    push();
    translate(0, -55);
    rotate(this.headTilt);

    noStroke();
    fill(255, 220, 180);
    ellipse(0, 0, 50, 50);

    // eyes
    fill(0);
    ellipse(-10, -5, 6, this.eyeHeight);
    ellipse(10, -5, 6, this.eyeHeight);

    // smile
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(0, 5, 18, 12, 0, PI);

    pop();

    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // comment this out when you don't want the guide anymore
    // this.drawReferenceShapes();

    pop();
  }

  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/