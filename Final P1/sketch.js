//https://www.youtube.com/watch?v=wRHAitGzBrg
//https://www.youtube.com/watch?v=UWgDKtvnjIU
//https://www.youtube.com/watch?v=yahxL_yAx18
//https://www.youtube.com/watch?v=fBqaA7zRO58

let bgImg;
let forestImg;
let clawSound;
let grabSound;
let dropSound;
let plantSound;
let clawY = 60;
let clawTargetY = 60;
let clawState = "idle";
let grabbedItem = null;
let pullCount = 0;
let shipX = 400;
let shipY = 70;
let trashBits = [];
let droppingItems = [];
let plantedTrees = [];
const maxTrees = 4;
const trashPileX = 280;
const trashPileY = 560;
const trashPileW = 420;
const trashPileH = 140;
const dirtPileX = 1320;
const dirtPileY = 565;
const dirtPileW = 240;
const dirtPileH = 90;
const treeSpots = [
  { x: dirtPileX - 95, y: 520, s: 0.8 },
  { x: dirtPileX - 25, y: 500, s: 0.95 },
  { x: dirtPileX + 55, y: 510, s: 0.85 },
  { x: dirtPileX + 125, y: 525, s: 0.75 }
];

class DroppingItem {
  constructor(type, x, y, targetY, mode) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.vy = 2;
    this.targetY = targetY;
    this.mode = mode;
  }
  update() {
    this.vy += 0.35;
    this.y += this.vy;
  }
  display() {
    drawItem(this.type, this.x, this.y);
  }
  hasLanded() {
    return this.y >= this.targetY;
  }
}

function preload() {
  bgImg = loadImage("trashcity.png");
  forestImg = loadImage("forest.jpeg");
  clawSound = loadSound("claw.mp3");
  grabSound = loadSound("grab.mp3");
  dropSound = loadSound("drop.mp3");
  plantSound = loadSound("plant.mp3");
}

function setup() {
  createCanvas(1600, 700);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  for (let i = 0; i < 40; i++) {
    trashBits.push({
      x: random(trashPileX - 160, trashPileX + 160),
      y: random(500, 585),
      w: random(12, 28),
      h: random(8, 20),
      c: color(random(70, 110), random(55, 85), random(45, 70), 180),
    });
  }
}

function draw() {
  drawBackgroundImage();
  drawPlantedTrees();
  if (!allTreesPlanted()) {
    shipX = constrain(mouseX, 70, width - 70);
    drawGarbagePile();
    drawDirtPile();
    updateClaw();
    updateDroppingItems();
    drawSpaceship();
    drawClaw();
  }
  drawInstructions();
}

function allTreesPlanted() {
  return plantedTrees.length >= maxTrees;
}

function drawBackgroundImage() {
  if (allTreesPlanted() && forestImg) {
    drawCoverImage(forestImg);
  } else if (bgImg) {
    image(bgImg, 0, 0, width, height);
  } else {
    background(30);
  }
  noStroke();
  fill(255, 120, 40, 55);
  rectMode(CORNER);
  rect(0, 0, width, height);
  rectMode(CENTER);
  fill(0, 25);
  rectMode(CORNER);
  rect(0, 0, width, height);
  rectMode(CENTER);
}

function drawCoverImage(img) {
  let scale = max(width / img.width, height / img.height);
  let w = img.width * scale;
  let h = img.height * scale;
  let x = (width - w) / 2;
  let y = (height - h) / 2;
  image(img, x, y, w, h);
}

function drawSpaceship() {
  push();
  translate(shipX, shipY);
  noStroke();
  fill(100, 120, 130, 120);
  ellipse(0, 8, 140, 35);
  fill(160);
  ellipse(0, 0, 120, 42);
  fill(100, 200, 255);
  ellipse(0, -10, 45, 24);
  fill(230, 210, 80);
  circle(-38, 8, 10);
  circle(0, 12, 10);
  circle(38, 8, 10);
  fill(180);
  rect(0, 18, 20, 8);
  pop();
}

function drawClaw() {
  stroke(210);
  strokeWeight(4);
  line(shipX, shipY + 15, shipX, clawY);
  fill(180);
  noStroke();
  circle(shipX, clawY, 22);
  stroke(180);
  strokeWeight(4);
  line(shipX, clawY, shipX - 18, clawY + 24);
  line(shipX, clawY, shipX + 18, clawY + 24);
  if (grabbedItem != null) {
    drawItem(grabbedItem, shipX, clawY + 45);
  }
}

function drawGarbagePile() {
  noStroke();
  fill(60, 45, 38, 230);
  ellipse(trashPileX, trashPileY, trashPileW, trashPileH);
  fill(85, 65, 55, 180);
  ellipse(
    trashPileX - 40,
    trashPileY - 12,
    trashPileW * 0.72,
    trashPileH * 0.55
  );
  for (let bit of trashBits) {
    fill(bit.c);
    ellipse(bit.x, bit.y, bit.w, bit.h);
  }
  fill(80);
  rect(trashPileX - 80, trashPileY - 20, 35, 15);
  fill(120);
  ellipse(trashPileX + 70, trashPileY - 15, 35, 18);
  fill(90, 120, 130);
  rect(trashPileX + 10, trashPileY - 35, 22, 30, 3);
}

function drawDirtPile() {
  noStroke();
  fill(90, 55, 25, 240);
  ellipse(dirtPileX, dirtPileY, dirtPileW, dirtPileH);
  fill(120, 80, 40, 220);
  ellipse(dirtPileX, dirtPileY - 12, dirtPileW * 0.65, dirtPileH * 0.42);
}

function drawPlantedTrees() {
  for (let tree of plantedTrees) {
    drawOneTree(tree.x, tree.y, tree.s);
  }
}

function drawOneTree(x, y, s) {
  push();
  noStroke();
  fill(120, 70, 30);
  rect(x, y - 40 * s, 22 * s, 80 * s);
  fill(40, 160, 70);
  ellipse(x, y - 95 * s, 110 * s, 95 * s);
  fill(60, 190, 80);
  ellipse(x - 32 * s, y - 72 * s, 70 * s, 60 * s);
  ellipse(x + 32 * s, y - 72 * s, 70 * s, 60 * s);
  pop();
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
    fill(120);
    rect(0, -6, 18, 4);
  } else if (type == "trash") {
    fill(120);
    ellipse(0, 0, 35, 25);
    fill(90);
    ellipse(-7, -4, 10, 7);
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
    clawY += 8;
    if (clawY >= clawTargetY) {
      clawY = clawTargetY;
      clawState = "grabbing";
      if (!allTreesPlanted() && pullCount % 3 == 0) {
        grabbedItem = "seed";
      } else {
        grabbedItem = random(["phone", "bottle", "can", "trash"]);
      }
      if (grabSound.isLoaded()) {
        grabSound.play();
        setTimeout(function () {
          grabSound.stop();
        }, 300);
      }
    }
  } else if (clawState == "grabbing") {
    clawState = "rising";
  } else if (clawState == "rising") {
    clawY -= 8;
    if (clawY <= 60) {
      clawY = 60;
      clawState = "holding";
    }
  }
}

function updateDroppingItems() {
  for (let i = droppingItems.length - 1; i >= 0; i--) {
    let item = droppingItems[i];
    item.update();
    item.display();
    if (item.hasLanded()) {
      item.y = item.targetY;
      if (item.mode == "plant" && plantedTrees.length < maxTrees) {
        let spot = treeSpots[plantedTrees.length];
        plantedTrees.push(spot);
      }
      droppingItems.splice(i, 1);
    }
  }
}

function keyPressed() {
  if (key === " ") {
    if (clawState == "idle" && !allTreesPlanted()) {
      if (clawSound.isLoaded()) {
        clawSound.play();
        setTimeout(function () {
          clawSound.stop();
        }, 900);
      }
      pullCount++;
      clawY = 60;
      clawTargetY = 495;
      clawState = "dropping";
      grabbedItem = null;
    } else if (clawState == "holding") {
      if (grabbedItem == "seed") {
        if (dist(shipX, 0, dirtPileX, 0) < 140) {
          if (plantSound.isLoaded()) {
            plantSound.play();
            setTimeout(function () {
              plantSound.stop();
            }, 1000);
          }
          droppingItems.push(
            new DroppingItem("seed", shipX, clawY + 45, dirtPileY - 22, "plant")
          );
          grabbedItem = null;
          clawState = "idle";
        } else {
          if (dropSound.isLoaded()) {
            dropSound.play();
            setTimeout(function () {
              dropSound.stop();
            }, 500);
          }
          droppingItems.push(
            new DroppingItem("seed", shipX, clawY + 45, height - 35, "trash")
          );
          grabbedItem = null;
          clawState = "idle";
        }
      } else if (grabbedItem != null) {
        if (dropSound.isLoaded()) {
          dropSound.play();
        }
        droppingItems.push(
          new DroppingItem(grabbedItem, shipX, clawY + 45, height - 35, "trash")
        );
        grabbedItem = null;
        clawState = "idle";
      }
    }
  }
}

function drawInstructions() {
  fill(255);
  noStroke();
  textSize(18);
  if (allTreesPlanted()) {
    text("All trees planted! The forest is restored.", width / 2, 28);
  } else {
    text(
      "Move with the mouse. Press SPACE to use the claw. Every 3rd pull gives a seed. Plant " +
        (maxTrees - plantedTrees.length) +
        " more tree(s).",
      width / 2,
      28
    );
  }
}