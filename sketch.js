
var ui;
var toolbox;
var WIDTH = 640;
var HEIGHT = 480;
var STATUS_MSG;
var canvas;
var cImg = undefined;
var viewScale = 1;
var viewX = 0;
var viewY = 0;
var surfaceType = 'ROUND';
var undoBuf = null;

function preload() {
  fontIBM = loadFont('VT323-Regular.ttf');

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
  ui = createCanvas(windowWidth, windowHeight);
  ui.elt.addEventListener("contextmenu", (e) => e.preventDefault());
  canvas = new RDSCanvas(65, 1, 574, 462);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function fitView() {
  viewScale = Math.min(width/WIDTH, height/HEIGHT);
  viewX = (width-WIDTH*viewScale)/2;
  viewY = (height-HEIGHT*viewScale)/2;
}

function applyPointer() {
  var elt = ui.elt;
  var rect = elt.getBoundingClientRect();
  var rx = elt.scrollWidth/width || 1;
  var ry = elt.scrollHeight/height || 1;
  var sx = (winMouseX-rect.left)/rx;
  var sy = (winMouseY-rect.top)/ry;
  mouseX = (sx-viewX)/viewScale;
  mouseY = (sy-viewY)/viewScale;
}

function draw() {
  fitView();
  applyPointer();
  background(0);
  push();
  translate(viewX, viewY);
  scale(viewScale);

  toolbox.draw();

  STATUS_MSG = 'RDSdrawJS V0.1 - (C) Paulo Geyer 2023';
  if(activeDialog && activeDialog.status)
    STATUS_MSG = activeDialog.status;
  else if(toolbox.selectedTool)
    STATUS_MSG = toolbox.selectedTool.desc;
  if(!activeDialog) {
    for(var i = 0; i < toolbox.tools.length; i++)
      toolbox.tools[i].mouseOver();
  }

  toolbox.palette.draw();
  canvas.draw();

  if(toolbox.selectedTool && toolbox.selectedTool.draw && !activeDialog)
    toolbox.selectedTool.draw();

  if(cImg) {
    drawingContext.imageSmoothingEnabled = false;
    image(cImg, canvas.x, canvas.y);
  }
  dialogDraw();

  if(!activeDialog && mouseX > WIDTH-62 && mouseX < WIDTH-1 &&
     mouseY > HEIGHT-18 && mouseY < HEIGHT-1)
    STATUS_MSG = 'click to change SURFACE TYPE - round/linear';
  push();
  noStroke();
  fill(255);
  textFont(fontIBM);
  textAlign(LEFT, BASELINE);
  drawBorder(65, HEIGHT-18, WIDTH-129, 17, true);
  textSize(16);
  text(STATUS_MSG, 75, HEIGHT-4);
  drawBorder(WIDTH-62, HEIGHT-18, 61, 17, true);
  text(surfaceType, WIDTH-58, HEIGHT-4);
  pop();
  pop();
}

function pushUndo() {
  if(!canvas || !canvas.canvas)
    return;
  canvas.canvas.loadPixels();
  undoBuf = new Uint8ClampedArray(canvas.canvas.pixels);
}

function doUndo() {
  if(!undoBuf)
    return;
  cImg = undefined;
  canvas.canvas.loadPixels();
  canvas.canvas.pixels.set(undoBuf);
  canvas.canvas.updatePixels();
  if(toolbox.selectedTool && toolbox.selectedTool.onUndo)
    toolbox.selectedTool.onUndo();
}

function keyPressed() {
  if(keyCode == 8 && (keyIsDown(CONTROL) || keyIsDown(17))) {
    doUndo();
    return;
  }
  if(activeDialog) {
    dialogKey();
    return;
  }
  if(toolbox.selectedTool && toolbox.selectedTool.keyPressed)
    toolbox.selectedTool.keyPressed();
}

function mousePressed() {
  applyPointer();
  if(activeDialog)
    return;
  if(toolbox.selectedTool && toolbox.selectedTool.mousePressed)
    toolbox.selectedTool.mousePressed();
}

function mouseReleased() {
  fitView();
  applyPointer();
  if(activeDialog) {
    dialogClick();
    return;
  }
  if(toolbox.selectedTool && toolbox.selectedTool.mouseReleasedBox && mouseInCanvas())
    toolbox.selectedTool.mouseReleasedBox();
  else if(toolbox.selectedTool && toolbox.selectedTool.boxing) {
    canvas.canvas.updatePixels();
    toolbox.selectedTool.boxing = false;
    toolbox.selectedTool.down = false;
  }
  var hit = toolbox.palette.swatchAt(mouseX, mouseY);
  if(hit) {
    if(hit.which == 'bg')
      toolbox.palette.cur_bg = hit.index;
    else
      toolbox.palette.cur_fg = hit.index;
  }

  if(mouseX > WIDTH-62 && mouseX < WIDTH-1 &&
     mouseY > HEIGHT-18 && mouseY < HEIGHT-1) {
    surfaceType = surfaceType == 'ROUND' ? 'LINEAR' : 'ROUND';
    STATUS_MSG = 'SURFACE TYPE: ' + surfaceType;
  }

  if(mouseX < 63 && mouseY < 223) {
    for(var i = 0; i < toolbox.tools.length; i++) {
      var tool = toolbox.tools[i];
      if(mouseX > tool.x && mouseX < tool.x+31 &&
         mouseY > tool.y && mouseY < tool.y+31) {
        if(mouseButton == RIGHT && tool.openSettings) {
          toolbox.selectTool(tool);
          tool.openSettings();
        } else if(tool.name == 'grabbing') {
          toolbox.selectTool(tool);
          tool.setMode(mouseButton == RIGHT ? 'copy' : 'paste');
        } else if(tool.click) {
          tool.click();
        } else {
          toolbox.selectTool(tool);
        }
      }
    }
  }
}

function drawBorder(x, y, w, h, bg=false, inv=false) {
  push();
  if(inv) {
    var l2 = color(0,40,170);
    var l1 = color(0,125,255);
  } else {
    var l1 = color(0,40,170);
    var l2 = color(0,125,255);
  }

  fill(0, 28, 255);
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
