
var ui;
var toolbox;
var WIDTH = 640;
var HEIGHT = 480;
var STATUS_MSG;
var canvas;
var cImg = undefined;

function preload() {
  fontIBM = loadFont('Px437_IBM_DOS_ISO8.ttf');

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
  pixelDensity(1);
  ui = createCanvas(WIDTH, HEIGHT);
  noSmooth();
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

  if(toolbox.selectedTool && toolbox.selectedTool.draw)
    toolbox.selectedTool.draw();

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
  var hit = toolbox.palette.swatchAt(mouseX, mouseY);
  if(hit) {
    if(hit.which == 'bg')
      toolbox.palette.cur_bg = hit.index;
    else
      toolbox.palette.cur_fg = hit.index;
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

function mouseInCanvas() {
  return mouseX >= canvas.x && mouseX < canvas.x+canvas.w &&
         mouseY >= canvas.y && mouseY < canvas.y+canvas.h;
}
