
var ui;
var toolbox;
var WIDTH = 640;
var HEIGHT = 480;
var STATUS_MSG;

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
  ui = createCanvas(WIDTH, HEIGHT);
  // disable right-click context menu
  ui.elt.addEventListener("contextmenu", (e) => e.preventDefault());
}

function draw() {
  background(0);
  toolbox.draw();

  STATUS_MSG = 'RDSdrawJS V0.1 - (C) Paulo Geyer 2023';
  for(var i = 0; i < toolbox.tools.length; i++) {
    toolbox.tools[i].mouseOver();
  }

  toolbox.palette.draw();

  noStroke();
  fill(255);
  drawBorder(65, height-18, width-129, 17);
  textFont(fontIBM);
  text(STATUS_MSG, width/2.0-170, height-7);
  drawBorder(width-62, height-18, 61, 17);
  text('ROUND', width-50, height-7);
}

function mousePressed() {
}

function mouseReleased() {
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

function drawBorder(x, y, w, h) {
  push();
  fill(0, 28, 255);
  rect(x, y, w, h);
  stroke(0,40,170);
  strokeWeight(2);
  line(x, y, x+w, y);
  line(x, y, x, y+h);
  stroke(0,125,255);
  line(x, y+h, x+w, y+h);
  line(x+w, y, x+w, y+h);
  pop();
}
