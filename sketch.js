
var ui;
var toolbox;
var WIDTH = 640;
var HEIGHT = 480;

function preload() {
  toolbox = new Toolbox(ui);
  toolbox.addTool(new Rect());
  toolbox.addTool(new Rect3d());
  toolbox.addTool(new Ellipsis());
  toolbox.addTool(new Ellipsis3d());
}

function setup() {
  ui = createCanvas(WIDTH, HEIGHT);
}

function draw() {
  background(0);
  toolbox.draw();
}
