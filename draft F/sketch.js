let clawY = 60;
let clawTargetY = 60;
let clawState = "idle";
let grabbedItem = null;
let pullCount = 0;
let shipX = 400;
let shipY = 60;
let treeGrown = false;

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
}

function draw() {
  background(10, 10, 30);
  shipX = mouseX;
  drawStars();
  drawGarbagePile();
  drawDirtPile();
  updateClaw();
  drawSpaceship();
  drawClaw();

  if (treeGrown) {
    drawTree();
  }
  drawInstructions();
}

function drawStars() {
  fill(255);
  noStroke();
  for (let i = 0; i < 70; i++) {
    circle((i * 97) % width, (i * 53) % height, 3);
  }
}

function drawSpaceship() {
  push();
  translate(shipX, shipY);
  fill(160);
  ellipse(0, 0, 120, 42);
  fill(100, 200, 255);
  ellipse(0, -10, 45, 24);
  fill(180);
  rect(0, 18, 20, 8);
  pop();
}

function drawClaw() {
  stroke(200);
  strokeWeight(4);
  line(shipX, shipY + 15, shipX, clawY);
  fill(180);
  circle(shipX, clawY, 22);
  line(shipX, clawY, shipX - 18, clawY + 24);
  line(shipX, clawY, shipX + 18, clawY + 24);

  if (grabbedItem != null) {
    drawItem(grabbedItem, shipX, clawY + 45);
  }
}

function drawGarbagePile() {
  noStroke();
  fill(70, 50, 40);
  ellipse(300, 520, 360, 130);
  fill(90, 70, 60, 120);
  for (let i = 0; i < 25; i++) {
    ellipse(random(160, 440), random(480, 550), random(10, 24), random(8, 18));
  }
}

function drawDirtPile() {
  noStroke();
  fill(90, 55, 25);
  ellipse(650, 530, 180, 70);
  fill(120, 80, 40);
  ellipse(650, 515, 120, 40);
}

function drawTree() {
  noStroke();
  fill(120, 70, 30);
  rect(650, 455, 28, 100);
  fill(40, 160, 70);
  ellipse(650, 390, 120, 100);
  fill(60, 190, 80);
  ellipse(610, 410, 80, 70);
  ellipse(690, 410, 80, 70);
}

function drawItem(type, x, y) {
  push();
  translate(x, y);
  noStroke();

  if (type == "phone") {
    fill(30);
    rect(0, 0, 28, 45, 4);
    fill(100, 200, 255);
    rect(0, 0, 18, 32, 2);
  } else if (type == "bottle") {
    fill(100, 220, 180);
    rect(0, 8, 20, 36, 4);
    rect(0, -18, 10, 12, 2);
  } else if (type == "can") {
    fill(180, 180, 200);
    rect(0, 0, 25, 32, 4);
  } else if (type == "trash") {
    fill(120);
    ellipse(0, 0, 35, 25);
  } else if (type == "seed") {
    fill(120, 80, 30);
    ellipse(0, 0, 18, 25);
    fill(80, 200, 100);
    ellipse(8, -10, 12, 7);
  }
  pop();
}

function updateClaw() {
  if (clawState == "dropping") {
    clawY += 7;
    if (clawY >= clawTargetY) {
      clawY = clawTargetY;
      clawState = "grabbing";
      if (pullCount == 3) {
        grabbedItem = "seed";
      } else {
        grabbedItem = random(["phone", "bottle", "can", "trash"]);
      }
    }
  } else if (clawState == "grabbing") {
    clawState = "rising";
  } else if (clawState == "rising") {
    clawY -= 7;
    if (clawY <= 60) {
      clawY = 60;
      clawState = "holding";
    }
  }
}

function keyPressed() {
  if (key == " ") {
    if (clawState == "idle") {
      pullCount++;
      clawY = 60;
      clawTargetY = 460;
      clawState = "dropping";
      grabbedItem = null;
    } else if (clawState == "holding") {
      if (grabbedItem == "seed" && shipX > 580) {
        grabbedItem = null;
        treeGrown = true;
        clawState = "idle";
      } else {
        grabbedItem = null;
        clawState = "idle";
      }
    }
  }
}

function drawInstructions() {
  fill(255);
  noStroke();
  textSize(16);
  if (treeGrown == false) {
    text(
      "Press SPACE to use the claw. On the 3rd pull, move the seed to the dirt pile and press SPACE.",
      width / 2,
      25
    );
  } else {
    text("You planted the seed!", width / 2, 25);
  }
}
