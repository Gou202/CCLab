let scanned = [];
let frames = [];
let curFrame = 0;

let x = 400;
let y = 250;
let angle = 0;
let s = 0.25;

function preload() {
  for (let i = 1; i <= 4; i++) {
    scanned.push(loadImage("20260320114846-" + i + ".jpg"));
  }
}

function setup() {
  createCanvas(800, 500);
  imageMode(CENTER);

  eraseBg(scanned, 20);
  frames = crop(scanned, 0, 0, scanned[0].width, scanned[0].height);
}

function draw() {
  background(255);
  curFrame = floor((frameCount / 10) % frames.length);
  let d = dist(mouseX, mouseY, x, y);
  if (d < 150) {
    s = 0.35;
  } else {
    s = 0.25;
  }
  if (mouseIsPressed) {
    angle = angle + 0.05;
  }
  push();
  translate(x, y);
  rotate(angle);
  scale(s);
  image(frames[curFrame], 0, 0);
  pop();
}

function mousePressed() {
  x = mouseX;
  y = mouseY;
}

function crop(imgs, x, y, w, h) {
  let cropped = [];
  for (let i = 0; i < imgs.length; i++) {
    cropped.push(imgs[i].get(x, y, w, h));
  }
  return cropped;
}

function eraseBg(imgs, threshold = 10) {
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    img.loadPixels();
    for (let j = 0; j < img.pixels.length; j += 4) {
      let d = 255 - img.pixels[j];
      d += 255 - img.pixels[j + 1];
      d += 255 - img.pixels[j + 2];
      if (d < threshold) {
        img.pixels[j + 3] = 0;
      }
    }
    img.updatePixels();
  }
}
