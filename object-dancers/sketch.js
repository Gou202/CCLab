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
    this.bounce = 0;
    this.sway = 0;
    this.headTilt = 0;
  }

  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    this.t += this.speed;
    this.bounce = sin(this.t * 2) * 8;
    this.sway = sin(this.t) * 12;
    this.headTilt = sin(this.t * 2) * 0.1;
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

    // legs do not move
    stroke(20);
    strokeWeight(10);
    line(-10, 25, -10, 70);
    line(10, 25, 10, 70);

    // shoes
    noStroke();
    fill(255);
    ellipse(-10, 80, 18, 8);
    ellipse(10, 80, 18, 8);

    // body leaning for dab
    push();
    rotate(-0.25);

    // white shirt
    noStroke();
    fill(245);
    rect(0, 0, 38, 58, 8);

    // blue jacket
    fill(40, 90, 190);
    rect(0, 0, 50, 65, 10);

    // shirt opening
    fill(245);
    rect(0, 3, 18, 50, 4);

    // necklace
    noFill();
    stroke(230, 190, 60);
    strokeWeight(2);
    arc(0, -18, 18, 14, 0, PI);

    // left arm across face
    push();
    translate(-8, -18);
    rotate(-0.8);
    stroke(40, 90, 190);
    strokeWeight(10);
    line(0, 0, 35, -10);
    pop();

    // right arm up
    push();
    translate(18, -20);
    rotate(-1.9);
    stroke(40, 90, 190);
    strokeWeight(10);
    line(0, 0, 45, 0);
    pop();

    pop();

    // head
    push();
    translate(0, -55);
    rotate(this.headTilt - 0.2);

    // brown hair behind head
    noStroke();
    fill(95, 55, 25);
    ellipse(0, -8, 54, 40);
    arc(0, -2, 56, 50, PI, TWO_PI);

    // face
    fill(255, 220, 180);
    ellipse(0, 0, 50, 50);

    // bangs
    fill(95, 55, 25);
    arc(0, -12, 50, 30, PI, TWO_PI);
    ellipse(-12, -8, 14, 18);
    ellipse(0, -12, 16, 18);
    ellipse(12, -8, 14, 18);

    // one visible eye
    fill(0);
    ellipse(-10, -3, 5, 7);

    // smile
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(-5, 8, 14, 10, 0, PI);

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