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

    // add properties for your dancer here:
    this.t = 0;
    this.armAngle = 0;
    this.elbowAngle = 0;
    this.legAngle = 0;
    this.kneeAngle = 0;
    this.bounce = 0;
    this.bodyShift = 0;
    this.armMove = 0.8;
    this.elbowMove = 0.4;
    this.legMove = 0.4;
    this.kneeMove = 0.4;
    this.bounceMove = 8;
    this.speed = 0.02;
  }

  update() {

    this.t += this.speed;

    if (frameCount % 60 === 0) {
      this.armMove = random(0.5, 0.9);
      this.elbowMove = random(0.3, 0.5);
      this.legMove = random(0.2, 0.5);
      this.kneeMove = random(0.2, 0.5);
      this.bounceMove = random(5, 8);
      this.speed = random(0.07, 0.11);
    }

    this.armAngle = sin(this.t) * this.armMove;
    this.elbowAngle = sin(this.t * 2) * this.elbowMove;
    this.legAngle = sin(this.t * 1.3) * this.legMove;
    this.kneeAngle = abs(sin(this.t * 2.2)) * this.kneeMove;
    this.bounce = sin(this.t * 2) * this.bounceMove;
    this.bodyShift = sin(this.t) * 6;
  }

  display() {
    push();
    translate(this.x + this.bodyShift, this.y + this.bounce);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️

    rectMode(CENTER);

    // body
    noStroke();
    fill(34, 139, 34);
    rect(0, 0, 40, 60, 10);

    // shirt
    fill(34, 139, 34);
    rect(0, 5, 16, 35, 4);

    // left arm
    push();
    translate(-20, -20);
    stroke(210, 180, 140);
    strokeWeight(8);
    rotate(this.armAngle);
    line(0, 0, 0, 25);

    translate(0, 25);
    rotate(this.elbowAngle);
    line(0, 0, 0, 20);
    pop();

    // right arm
    push();
    translate(20, -20);
    stroke(210, 180, 140);
    strokeWeight(8);
    rotate(-this.armAngle);
    line(0, 0, 0, 25);

    translate(0, 25);
    rotate(-this.elbowAngle);
    line(0, 0, 0, 20);
    pop();

    // left leg
    push();
    translate(-10, 30);
    stroke(30);
    strokeWeight(8);
    rotate(this.legAngle);
    line(0, 0, 0, 25);

    translate(0, 25);
    rotate(this.kneeAngle);
    line(0, 0, 0, 20);

    // left shoe
    noStroke();
    fill(255);
    ellipse(4, 22, 16, 8);
    pop();

    // right leg
    push();
    translate(10, 30);
    stroke(30);
    strokeWeight(8);
    rotate(-this.legAngle);
    line(0, 0, 0, 25);

    translate(0, 25);
    rotate(this.kneeAngle);
    line(0, 0, 0, 20);

    // right shoe
    noStroke();
    fill(255);
    ellipse(4, 22, 16, 8);
    pop();

    // head
    push();
    translate(0, -50);

    // face
    noStroke();
    fill(210, 180, 140);
    ellipse(0, 0, 40, 40);

    // hair
    fill(95, 55, 25);
    arc(0, -6, 42, 28, PI, TWO_PI);
    ellipse(-18, -5, 8, 18);
    ellipse(18, -5, 8, 18);

    // eyes
    fill(0);
    ellipse(-7, -2, 4, 4);
    ellipse(7, -2, 4, 4);

    // mouth
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(0, 6, 12, 8, 0, PI);

    pop();

    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    // this.drawReferenceShapes()

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