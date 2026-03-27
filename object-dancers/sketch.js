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
    this.speed = 0.08;
    this.sway = 0;
    this.bounce = 0;
    this.bodyTilt = 0;
    this.headTilt = 0;

    this.lUpperArm = 0;
    this.lLowerArm = 0;
    this.rUpperArm = 0;
    this.rLowerArm = 0;

    this.lUpperLeg = 0;
    this.lLowerLeg = 0;
    this.rUpperLeg = 0;
    this.rLowerLeg = 0;

    this.lArmOffset = 0;
    this.rArmOffset = 0;
    this.lLegOffset = 0;
    this.rLegOffset = 0;
    this.headOffset = 0;
  }

  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    this.t += this.speed;

    if (frameCount % 25 === 0) {
      this.lArmOffset = random(-0.5, 0.5);
      this.rArmOffset = random(-0.5, 0.5);
      this.lLegOffset = random(-0.35, 0.35);
      this.rLegOffset = random(-0.35, 0.35);
      this.headOffset = random(-0.2, 0.2);
    }

    this.sway = sin(this.t * 1.3) * 12;
    this.bounce = sin(this.t * 2.4) * 10;
    this.bodyTilt = sin(this.t * 1.7) * 0.15;
    this.headTilt = sin(this.t * 2.1) * 0.12 + this.headOffset;

    this.lUpperArm = sin(this.t * 2.4) * 0.9 + this.lArmOffset;
    this.lLowerArm = sin(this.t * 3.1 + 1) * 0.7;

    this.rUpperArm = sin(this.t * 2.8 + PI) * 0.9 + this.rArmOffset;
    this.rLowerArm = sin(this.t * 3.4 + 2) * 0.7;

    this.lUpperLeg = sin(this.t * 2.2) * 0.5 + this.lLegOffset;
    this.lLowerLeg = abs(sin(this.t * 2.9)) * 0.6;

    this.rUpperLeg = sin(this.t * 2.2 + PI) * 0.5 + this.rLegOffset;
    this.rLowerLeg = abs(sin(this.t * 2.9 + 1.3)) * 0.6;
  }

  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x + this.sway, this.y + this.bounce);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️

    rectMode(CENTER);

    push();
    rotate(this.bodyTilt);

    // legs
    this.drawLeg(-12, 28, this.lUpperLeg, this.lLowerLeg);
    this.drawLeg(12, 28, this.rUpperLeg, this.rLowerLeg);

    // body
    noStroke();
    fill(30, 110, 210);
    rect(0, 0, 52, 68, 10);

    // shirt
    fill(245);
    rect(0, 4, 20, 46, 4);

    // necklace
    fill(230, 190, 60);
    ellipse(0, -20, 10, 10);

    // arms
    this.drawArm(-24, -18, this.lUpperArm, this.lLowerArm);
    this.drawArm(24, -18, this.rUpperArm, this.rLowerArm);

    pop();

    // head
    push();
    translate(0, -56);
    rotate(this.headTilt);

    // brown hair
    noStroke();
    fill(95, 55, 25);
    ellipse(0, -6, 54, 42);

    // face
    fill(255, 220, 180);
    ellipse(0, 0, 48, 50);

    // bangs
    fill(95, 55, 25);
    arc(0, -12, 48, 28, PI, TWO_PI);
    ellipse(-11, -8, 14, 16);
    ellipse(0, -11, 16, 18);
    ellipse(11, -8, 14, 16);

    // eyes
    fill(0);
    ellipse(-9, -3, 5, 7);
    ellipse(9, -3, 5, 7);

    // mouth
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(0, 8, 16, 10, 0, PI);

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

  drawArm(x, y, upperAngle, lowerAngle) {
    push();
    translate(x, y);
    stroke(30, 110, 210);
    strokeWeight(10);
    strokeCap(ROUND);

    rotate(upperAngle);
    line(0, 0, 0, 28);

    translate(0, 28);
    rotate(lowerAngle);
    line(0, 0, 0, 24);

    noStroke();
    fill(255, 220, 180);
    ellipse(0, 24, 10, 10);

    pop();
  }

  drawLeg(x, y, upperAngle, lowerAngle) {
    push();
    translate(x, y);
    stroke(25);
    strokeWeight(11);
    strokeCap(ROUND);

    rotate(upperAngle);
    line(0, 0, 0, 28);

    translate(0, 28);
    rotate(lowerAngle);
    line(0, 0, 0, 26);

    noStroke();
    fill(255);
    ellipse(0, 28, 16, 8);

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