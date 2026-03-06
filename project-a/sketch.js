let x;
let y;
let speedX = 3;
let speedY = 2;

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.id("p5-canvas");
    canvas.parent("p5-canvas-container");
    angleMode(DEGREES)
    x = width / 2;
    y = height / 2;
}

function draw() {
    background('gray')
    //vial
    stroke(200)
    noFill()
    rect(300, 50, 200, 400, 20)
    //move around
    x += speedX
    y += speedY
    if (x < 320 || x > 480) {
        speedX *= -1
    }
    if (y < 70 || y > 430) {
        speedY *= -1
    }
    drawCreature(x, y)
}
function drawCreature(x, y) {
    push()
    translate(x, y)
    drawBody()
    drawArms()
    pop()
}
//tim
function drawBody() {
    noStroke()
    //mad
    if (mouseIsPressed) {
        fill('rgb(170,13,13)')
    } else {
        fill(0)
    }
    let w = 60 + sin(frameCount * 2) * 5;
    let h = 80 + sin(frameCount * 2 + 90) * 5
    ellipse(0, 0, w, h);
    //eyes
    fill('white')
    if (mouseIsPressed) {
        ellipse(-10, -15, 25, 8)
        ellipse(10, -15, 25, 8)
    } else {
        ellipse(-10, -15, 20, 12)
        ellipse(10, -15, 20, 12)
    }
}
//arm
function drawArms() {
    stroke(mouseIsPressed ? 150 : 0)
    strokeWeight(6)
    let speed = mouseIsPressed ? 6 : 3
    //https://www.youtube.com/watch?v=TaN5At5RWH8
    //https://www.youtube.com/watch?v=atS_A9HHAVo
    let leftAngle = sin(frameCount * speed) * 25 + 180
    let rightAngle = sin(frameCount * speed) * -25
    push()
    rotate(leftAngle)
    line(0, 0, 40, 0)
    pop()
    push();
    rotate(rightAngle)
    line(0, 0, 40, 0)
    pop();
}