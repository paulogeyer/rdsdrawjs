class Poligon extends Tool {
  icon = loadImage('icons/poligon.png');
  name = 'Poligon';
  desc = 'painting tool: POLIGON';
  pts = [];
  step = 0;
  pressed = false;
  useBg = false;

  constructor() {
    super();
  }

  reset() {
    this.step = 0;
    this.pts = [];
    this.pressed = false;
    this.useBg = false;
  }

  cancel() {
    if(this.step > 0)
      canvas.canvas.updatePixels();
    this.reset();
  }

  draw() {
    if(this.waitUp) {
      if(!mouseIsPressed)
        this.waitUp = false;
      return;
    }
    if(this.step == 0) {
      if(mouseIsPressed && mouseInCanvas()) {
        this.step = 1;
        this.pts = [[mouseX-canvas.x, mouseY-canvas.y]];
        this.useBg = mouseButton == RIGHT;
        this.pressed = true;
        canvas.canvas.loadPixels();
      }
      return;
    }

    STATUS_MSG = "Click on the polygon's corners, press [ANYKEY] to continue";
    canvas.canvas.updatePixels();
    var preview = this.pts.slice();
    preview.push([mouseX-canvas.x, mouseY-canvas.y]);
    this.strokeShape(preview);

    if(mouseIsPressed && mouseInCanvas()) {
      if(!this.pressed) {
        var npt = [mouseX-canvas.x, mouseY-canvas.y];
        var last = this.pts[this.pts.length-1];
        if(last[0] != npt[0] || last[1] != npt[1])
          this.pts.push(npt);
        this.pressed = true;
      }
    } else {
      this.pressed = false;
    }
  }

  strokeShape(pts) {
    canvas.canvas.stroke(255);
    canvas.canvas.strokeWeight(1);
    canvas.canvas.noFill();
    canvas.canvas.beginShape();
    for(var i = 0; i < pts.length; i++)
      canvas.canvas.vertex(pts[i][0], pts[i][1]);
    canvas.canvas.endShape();
  }

  fillShape() {
    pushUndo();
    var c = this.useBg ? toolbox.palette.cur_bg_color() : toolbox.palette.cur_fg_color();
    canvas.canvas.noStroke();
    canvas.canvas.fill(c);
    canvas.canvas.beginShape();
    for(var i = 0; i < this.pts.length; i++)
      canvas.canvas.vertex(this.pts[i][0], this.pts[i][1]);
    canvas.canvas.endShape(CLOSE);
  }

  keyPressed() {
    if(this.step != 1)
      return;
    if(keyCode == 27) {
      this.cancel();
      return;
    }
    if(this.pts.length >= 3) {
      canvas.canvas.updatePixels();
      this.fillShape();
      this.reset();
      this.waitUp = mouseIsPressed;
    }
  }
}
