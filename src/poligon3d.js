class Poligon3d extends Poligon {
  icon = loadImage('icons/poligon3d.png');
  name = '3-D Poligon';
  desc = 'painting tool: 3D-POLIGON';
  peak = null;
  held = false;

  constructor() {
    super();
  }

  reset() {
    super.reset();
    this.peak = null;
    this.held = false;
  }

  draw() {
    if(this.waitUp) {
      if(!mouseIsPressed)
        this.waitUp = false;
      return;
    }
    if(this.step < 2) {
      super.draw();
      return;
    }
    canvas.canvas.updatePixels();
    this.strokeShape(this.pts);
    if(this.step == 2) {
      STATUS_MSG = 'Click on highest/lowest point or press [ANYKEY] for automatic point selection';
      if(!mouseIsPressed)
        this.held = false;
      else if(!this.held && mouseInCanvas()) {
        this.held = true;
        this.peak = [mouseX-canvas.x, mouseY-canvas.y];
        this.step = 3;
      }
      return;
    }
    STATUS_MSG = 'Now set gradient filling direction of height.';
    var aim = this.aim();
    canvas.canvas.stroke(255);
    canvas.canvas.strokeWeight(1);
    canvas.canvas.line(aim[0], aim[1], aim[2], aim[3]);
    if(!mouseIsPressed)
      this.held = false;
    else if(!this.held && mouseInCanvas()) {
      this.held = true;
      this.commit();
    }
  }

  keyPressed() {
    if(keyCode == 27) {
      this.cancel();
      return;
    }
    if(this.step == 1) {
      if(this.pts.length >= 3) {
        this.step = 2;
        this.held = true;
      }
      return;
    }
    if(this.step == 2) {
      this.peak = null;
      this.held = true;
      this.step = 3;
      return;
    }
    if(this.step == 3)
      this.commit();
  }

  center() {
    var minx = this.pts[0][0], maxx = minx, miny = this.pts[0][1], maxy = miny;
    for(var i = 1; i < this.pts.length; i++) {
      minx = Math.min(minx, this.pts[i][0]);
      maxx = Math.max(maxx, this.pts[i][0]);
      miny = Math.min(miny, this.pts[i][1]);
      maxy = Math.max(maxy, this.pts[i][1]);
    }
    return [(minx+maxx)/2, (miny+maxy)/2];
  }

  aim() {
    var c = this.peak || this.center();
    var x = mouseInCanvas() ? mouseX-canvas.x : c[0]+1;
    var y = mouseInCanvas() ? mouseY-canvas.y : c[1];
    return [c[0], c[1], x, y];
  }

  commit() {
    if(this.pts.length < 3)
      return;
    canvas.canvas.updatePixels();
    this.fillShape();
    this.reset();
    this.waitUp = mouseIsPressed;
  }

  fillShape() {
    pushUndo();
    var ids = toolbox.palette.range_ids();
    if(this.useBg)
      ids = ids.reverse();
    var apex = this.peak || this.center();
    var aim = this.aim();
    var c = this.center();
    var dx = aim[2]-aim[0];
    var dy = aim[3]-aim[1];
    if((apex[0]-c[0])*dx+(apex[1]-c[1])*dy < 0)
      ids = ids.slice().reverse();
    var n = ids.length;
    var g = canvas.canvas;
    g.noStroke();
    for(var b = 0; b < n; b++) {
      var ratio = b/(n+1);
      g.fill(toolbox.palette.colors[ids[b]][1]);
      g.beginShape();
      for(var i = 0; i < this.pts.length; i++) {
        g.vertex(this.pts[i][0]+(apex[0]-this.pts[i][0])*ratio,
                 this.pts[i][1]+(apex[1]-this.pts[i][1])*ratio);
      }
      g.endShape(CLOSE);
    }
  }
}
