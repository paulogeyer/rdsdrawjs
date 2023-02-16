
var ui;
var toolbox;
var WIDTH = 640;
var HEIGHT = 480;

function preload() {
  fontIBM = loadFont('Px437_IBM_DOS_ISO8.ttf');

  toolbox = new Toolbox(ui);
  toolbox.addTool(new Rect());
  toolbox.addTool(new Rect3d());
  toolbox.addTool(new Ellipsis());
  toolbox.addTool(new Ellipsis3d());
  toolbox.addTool(new Triang());
  toolbox.addTool(new Triang3d());
}

function setup() {
  ui = createCanvas(WIDTH, HEIGHT);
}

function draw() {
  background(0);
  toolbox.draw();

  noStroke();
  fill(0, 28, 255);
  rect(0, HEIGHT-20, WIDTH, 20);
  fill(255);
  textFont(fontIBM);
  text('RDSdrawJS V0.1 - (C) Paulo Geyer 2023', width/2.0-80, height-7);
  text('ROUND', width-50, height-7);
}

function mousePressed() {
}

function mouseReleased() {
  for(var i = 0; i < toolbox.tools.length; i++) {
    var tool = toolbox.tools[i];
    if(mouseX > tool.x && mouseX < tool.x+31 &&
       mouseY > tool.y && mouseY < tool.y+31)
      toolbox.selectTool(toolbox.tools[i]);
  }
}
