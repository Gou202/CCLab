class GavynDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;

    this.t = 0;
    this.speed = 0.08;

    this.bounce = 0;
    this.sway = 0;
    this.headTilt = 0;
  }

  update() {
    this.t += this.speed;

    this.bounce = sin(this.t * 2) * 8;
    this.sway = sin(this.t) * 12;
    this.headTilt = sin(this.t * 2) * 0.1;
  }

  display() {
    push();
    translate(this.x + this.sway, this.y + this.bounce);

    // legs do not move
    stroke(255);
    strokeWeight(5);
    line(-10, 30, -10, 75);
    line(10, 30, 10, 75);

    // shoes
    noStroke();
    fill(255);
    ellipse(-10, 80, 18, 8);
    ellipse(10, 80, 18, 8);

    // pants
    stroke(20);
    strokeWeight(10);
    line(-10, 25, -10, 70);
    line(10, 25, 10, 70);

    // body leaning for dab
    push();
    rotate(-0.25);

    rectMode(CENTER);

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

    // brown hair back
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

    // eye
    fill(0);
    ellipse(-10, -3, 5, 7);

    // smile
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(-5, 8, 14, 10, 0, PI);

    pop();

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