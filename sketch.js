
var ui;
var toolbox;
var WIDTH = 640;
var HEIGHT = 480;
var STATUS_MSG;
var canvas;
var cImg = undefined;

function preload() {
  fontIBM = loadFont('Px437_IBM_DOS_ISO8.ttf');

  canvas = new RDSCanvas(65, 1, 574, 462);
  toolbox = new Toolbox(ui);
  toolbox.palette = new Palette(0,223);
  toolbox.addTool(new FlatPlane());
  toolbox.addTool(new Pyramid());
  toolbox.addTool(new Circle());
  toolbox.addTool(new Elipsoid());
  toolbox.addTool(new Poligon());
  toolbox.addTool(new Poligon3d());
  toolbox.addTool(new Plane());
  toolbox.addTool(new Cylinder());
  toolbox.addTool(new Freehand());
  toolbox.addTool(new Text());
  toolbox.addTool(new Grabbing());
  toolbox.addTool(new ClearScreen());
  toolbox.addTool(new DiskOperation());
  toolbox.addTool(new RDS());
}

function setup() {
  ui = createCanvas(WIDTH, HEIGHT);
  // disable right-click context menu
  ui.elt.addEventListener("contextmenu", (e) => e.preventDefault());
  canvas = new RDSCanvas(65, 1, 574, 462);
}

function draw() {

  background(0);
  toolbox.draw();

  STATUS_MSG = 'RDSdrawJS V0.1 - (C) Paulo Geyer 2023';
  for(var i = 0; i < toolbox.tools.length; i++) {
    toolbox.tools[i].mouseOver();
  }

  toolbox.palette.draw();

  push();
  noStroke();
  fill(255);
  drawBorder(65, height-18, width-129, 17, true);
  textFont(fontIBM);
  textSize(11);
  text(STATUS_MSG, 75, height-6);
  drawBorder(width-62, height-18, 61, 17, true);
  textSize(12);
  text('ROUND', width-50, height-6);
  pop();

  // draw canvas
  canvas.draw();

  // draw tool
  if (toolbox.selectedTool.draw) {
    // draw only when mouse is inside canvas
    if(mouseX > canvas.x && mouseY < canvas.h)
      toolbox.selectedTool.draw();
  } else if(toolbox.selectedTool.name != "rds") {
    alert("it doesn't look like your tool has a draw method!");
  }

  if(cImg) {
    image(cImg, canvas.x, canvas.y);
  }
}

function keyPressed() {
  // check if current tool has a keyPressed method, call it if exists
  if(toolbox.selectedTool.keyPressed)
    toolbox.selectedTool.keyPressed();
}

function mouseReleased() {
  if(mouseX < 63 && mouseY > 223) {
    var colors = toolbox.palette.colors;
    var colorsn = colors.length;

    for(var i = 0; i < colorsn; i++) {
      var ci = colorsn-i-1;
      var bx = 6;
      var by = 250+14*i;

      // select bg color
      if(mouseX > bx &&
	 mouseX < bx+18 &&
	 mouseY > by &&
	 mouseY < by+14) {
	toolbox.palette.cur_bg = ci;
      }

      // select fg color
      if(mouseX > bx+34 &&
	 mouseX < bx+50 &&
	 mouseY > by &&
	 mouseY < by+14) {
	toolbox.palette.cur_fg = ci;
      }
    }
  }

  if(mouseX < 63 && mouseY < 223) {
    for(var i = 0; i < toolbox.tools.length; i++) {
      var tool = toolbox.tools[i];
      if(mouseX > tool.x && mouseX < tool.x+31 &&
	 mouseY > tool.y && mouseY < tool.y+31) {
	if(tool.click) {
	  tool.click();
	} else {
	  toolbox.selectTool(toolbox.tools[i]);
	}
      }
    }
  }
}

function drawBorder(x, y, w, h, bg=false, inv=false) {
  push();
  // invert colors
  if(inv) {
    var l2 = color(0,40,170);
    var l1 = color(0,125,255);
  } else {
    var l1 = color(0,40,170);
    var l2 = color(0,125,255);
  }

  fill(0, 28, 255);
  // add blue background
  if(bg)
    rect(x, y, w, h);
  stroke(l1);
  strokeWeight(2);
  line(x, y, x+w, y);
  line(x, y, x, y+h);
  stroke(l2);
  line(x, y+h, x+w, y+h);
  line(x+w, y, x+w, y+h);
  pop();
}
