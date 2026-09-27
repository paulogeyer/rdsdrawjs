class Circle extends Tool {
  icon = loadImage('icons/circle.png');
  name = 'circle';
  desc = 'painting tool: CIRCLE';

  constructor() {
    super();
    this.reset();
  }

  reset() {
    this.pt1x = -1;
    this.pt1y = -1;
    this.pt2x = undefined;
    this.pt2y = undefined;
    this.drawing = false;
  }

  cancel() {
    if(this.drawing)
      canvas.canvas.updatePixels();
    this.reset();
  }

  keyPressed() {
    if(keyCode == 27 && this.drawing)
      this.cancel();
  }

  draw() {
    if(this.waitUp) {
      if(!mouseIsPressed)
        this.waitUp = false;
      return;
    }
    if(mouseIsPressed && (this.drawing || mouseInCanvas())) {
      if(this.pt1x == -1) {
        this.pt1x = mouseX-canvas.x;
        this.pt1y = mouseY-canvas.y;
        this.drawing = true;
        canvas.canvas.loadPixels();
      } else {
        this.setSpan();
        canvas.canvas.updatePixels();
        canvas.canvas.stroke(255);
        canvas.canvas.strokeWeight(1);
        canvas.canvas.noFill();
        canvas.canvas.ellipse(this.pt1x, this.pt1y,
                              Math.abs(this.pt2x), Math.abs(this.pt2y));
      }
    } else if(this.drawing) {
      canvas.canvas.updatePixels();
      if(this.pt2x != undefined)
        this.drawFinal();
      this.reset();
      this.waitUp = mouseIsPressed;
    }
  }

  setSpan() {
    var dx = mouseX-canvas.x-this.pt1x;
    var dy = mouseY-canvas.y-this.pt1y;
    var d = 2*Math.hypot(dx, dy);
    this.pt2x = d;
    this.pt2y = d;
  }

  drawFinal() {
    pushUndo();
    canvas.canvas.noStroke();
    if(mouseButton == RIGHT)
      canvas.canvas.fill(toolbox.palette.colors[toolbox.palette.cur_bg][1]);
    else
      canvas.canvas.fill(toolbox.palette.colors[toolbox.palette.cur_fg][1]);
    canvas.canvas.ellipse(this.pt1x, this.pt1y,
                          Math.abs(this.pt2x), Math.abs(this.pt2y));
  }
}
