
var ui;
var toolbox;
var WIDTH = 640;
var HEIGHT = 480;

function preload() {
  toolbox = new Toolbox(ui);
  toolbox.addTool(new Rect());
}

function setup() {
  ui = createCanvas(WIDTH, HEIGHT);
  toolbox = new Toolbox(ui);
  toolbox.addTool(new Rect());
}

function draw() {
  background(0);
  toolbox.draw();
}
