let t = 0
let x, y
let x2
let y2
let clickCount = 0
let vialBroken = false
//https://www.youtube.com/watch?v=Rk-_syQluvc
let vialX = 400
let vialY = 250
let vialW = 180
let vialH = 360
let r = 85

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.id("p5-canvas");
    canvas.parent("p5-canvas-container");
    x = width / 2
    y = height / 2
    x2 = random(-2, 2)
    y2 = random(-2, 2)
}

function draw() {
    Background()
    let madLevel = min(clickCount / 3, 1)
    moveCreature()
    //https://www.youtube.com/watch?v=NIXc_THhTqc
    if (!vialBroken) {
        keepInVial()
        drawVial()
    } else {
        keepOnScreen()
    }

    drawCreature(madLevel)
    if (!vialBroken) {
        drawGlassVial()
    } else {
        drawBrokenVial()
    }
    t += 0.05
}

function mousePressed() {
    clickCount++
    //https://www.youtube.com/watch?v=EXUMDu94kFs
    if (clickCount >= 3) {
        vialBroken = true
    }
}

function moveCreature() {
    if (vialBroken) {
        x2 += (mouseX - x) * 0.01
        y2 += (mouseY - y) * 0.01
        //https://www.youtube.com/watch?v=xMZX7uJtF5Q

        x2 = constrain(x2, -5, 5)
        y2 = constrain(y2, -5, 5)
    } else {
        x2 += random(-0.1, 0.1)
        y2 += random(-0.1, 0.1)
        x2 = constrain(x2, -2, 2)
        y2 = constrain(y2, -2, 2)
    }
    x += x2
    y += y2
}

function keepInVial() {
    if (x < vialX - vialW / 2 + r || x > vialX + vialW / 2 - r) { x2 *= -1; }
    if (y < vialY - vialH / 2 + r || y > vialY + vialH / 2 - r) { y2 *= -1; }
}

function keepOnScreen() {
    if (x < r || x > width - r) { x2 *= -1; }
    if (y < r || y > height - r) { y2 *= -1; }
}

function Background() {
    background(0)
    stroke(40, 80, 140, 60)
    noFill()
    for (let y3 = 0; y3 < height; y3 += 25) {
        beginShape()
        for (let x3 = 0; x3 <= width; x3 += 25) {
            let wave = sin(x3 * 0.01 + t + y3 * 0.02) * 8
            vertex(x3, y3 + wave)
        }
        endShape()
    }
    noStroke()
    fill(80, 150, 255, 25)
    ellipse(width / 2, height / 2, 280, 420)
}

function drawVial() {
    rectMode(CENTER)
    noStroke()
    fill(18, 28, 45, 210);
    rect(vialX, vialY, vialW - 14, vialH - 14, 28)
}

function drawCreature(madLevel) {
    fill(140 * madLevel, 0, 0)
    stroke(255 * madLevel, 255 * (1 - madLevel), 150 * (1 - madLevel))
    strokeWeight(2)

    //body
    beginShape()
    for (let a = 0; a < TWO_PI; a += 0.1) {
        let radius = 70 + sin(a * 3 + t * 2) * 6
        let px = x + cos(a) * radius
        let py = y + sin(a) * radius
        vertex(px, py)
    }
    endShape(CLOSE)

    //eyes
    noStroke();
    fill(255);
    ellipse(x - 24, y - 12, 36, 20)
    ellipse(x + 24, y - 12, 36, 20)
    let eyeX = constrain(map(mouseX, 0, width, -6, 6), -6, 6);
    let eyeY = constrain(map(mouseY, 0, height, -5, 5), -5, 5);
    fill(255 * madLevel, 0, 0);
    ellipse(x - 24 + eyeX, y - 12 + eyeY, 10, 10)
    ellipse(x + 24 + eyeX, y - 12 + eyeY, 10, 10)
    if (clickCount > 0) {
        stroke(255 * madLevel, 0, 0)
        line(x - 42, y - 26, x - 10, y - 18)
        line(x + 10, y - 18, x + 42, y - 26)
    }
}

function drawGlassVial() {
    rectMode(CENTER);
    noStroke();
    fill(180, 230, 255, 35)
    rect(vialX, vialY, vialW, vialH, 35)
    stroke(220, 245, 255, 170)
    strokeWeight(3)
    noFill()
    rect(vialX, vialY, vialW, vialH, 35)
    noStroke()
    fill(120, 130, 160)
    rect(vialX, vialY - vialH / 2 - 12, vialW * 0.45, 24, 8)
}

function drawBrokenVial() {
    stroke(220, 245, 255, 170)
    strokeWeight(2)
    noFill()
    line(vialX - vialW / 2, vialY - vialH / 2 + 40, vialX - vialW / 2 - 10, vialY + vialH / 2 - 20)
    line(vialX + vialW / 2, vialY - vialH / 2 + 50, vialX + vialW / 2 + 10, vialY + vialH / 2 - 10)
    line(vialX - 35, vialY - vialH / 2, vialX, vialY - vialH / 2 - 20)
    line(vialX, vialY - vialH / 2 - 20, vialX + 35, vialY - vialH / 2)
}