class Cylinder extends Plane {
  icon = loadImage('icons/cylinder.png');
  name = 'Cylinder';
  desc = 'painting tool: CYLINDER (select with right mousebutton for settings)';

  constructor() {
    super();
    this.across = true;
  }

  reset() {
    super.reset();
    this.held = false;
    this.armed = false;
  }

  openSettings() {
    var self = this;
    openDialog({
      title: 'DIRECTION OF THE CYLINDER',
      status: 'Select direction using [SPACE] and press [ENTER] when done.',
      radios: ['perpendicular to first line', 'parallel to first line'],
      radio: this.across ? 0 : 1,
      buttons: ['CANCEL'],
      onAccept: function(d) {
        self.across = d.radio == 0;
        closeDialog();
      }
    });
  }

  draw() {
    if(this.waitUp) {
      if(!mouseIsPressed)
        this.waitUp = false;
      return;
    }
    if(this.step == 0) {
      if(mouseIsPressed && mouseInCanvas()) {
        this.pt1x = mouseX-canvas.x;
        this.pt1y = mouseY-canvas.y;
        this.step = 1;
        this.held = true;
        canvas.canvas.loadPixels();
      }
      return;
    }

    if(this.step == 1) {
      if(mouseIsPressed) {
        this.pt2x = mouseX-canvas.x;
        this.pt2y = mouseY-canvas.y;
        this.strokeLine();
      } else if(this.pt2x != -1) {
        this.step = 2;
        this.held = false;
      } else {
        this.reset();
      }
      return;
    }

    if(this.step == 2) {
      this.placeRect();
      canvas.canvas.updatePixels();
      this.paint();
      this.strokeRect();
      return;
    }
  }

  mousePressed() {
    if(this.waitUp || this.step != 2 || !mouseInCanvas())
      return;
    this.placeRect();
    canvas.canvas.updatePixels();
    this.drawFinal();
    this.reset();
    this.waitUp = true;
  }

  strokeLine() {
    canvas.canvas.updatePixels();
    canvas.canvas.stroke(255);
    canvas.canvas.strokeWeight(1);
    canvas.canvas.line(this.pt1x, this.pt1y, this.pt2x, this.pt2y);
  }

  corners() {
    var dx = this.pt2x-this.pt1x;
    var dy = this.pt2y-this.pt1y;
    var len = Math.hypot(dx, dy) || 1;
    var ux = dx/len;
    var uy = dy/len;
    var nx = -uy;
    var ny = ux;
    var mx = mouseX-canvas.x-this.pt1x;
    var my = mouseY-canvas.y-this.pt1y;
    var dist = mx*nx+my*ny;
    if(this.across) {
      return [[this.pt1x, this.pt1y],
              [this.pt2x, this.pt2y],
              [this.pt2x+nx*dist, this.pt2y+ny*dist],
              [this.pt1x+nx*dist, this.pt1y+ny*dist]];
    }
    return [[this.pt1x-nx*dist, this.pt1y-ny*dist],
            [this.pt2x-nx*dist, this.pt2y-ny*dist],
            [this.pt2x+nx*dist, this.pt2y+ny*dist],
            [this.pt1x+nx*dist, this.pt1y+ny*dist]];
  }

  placeRect() {
    var q = this.corners();
    this.pt3x = q[3][0];
    this.pt3y = q[3][1];
    this.pt4x = q[2][0];
    this.pt4y = q[2][1];
  }

  drawFinal() {
    pushUndo();
    this.paint();
  }

  paint() {
    var ids = toolbox.palette.range_ids();
    if(mouseButton == RIGHT)
      ids = ids.reverse();
    var q = this.corners();
    var dx = this.across ? q[3][0]-q[0][0] : this.pt2x-this.pt1x;
    var dy = this.across ? q[3][1]-q[0][1] : this.pt2y-this.pt1y;
    var len = Math.hypot(dx, dy) || 1;
    paintLinearPoly(canvas.canvas, q, dx/len, dy/len, ids,
      (typeof surfaceType != 'undefined' && surfaceType == 'ROUND') ? 'tube' : null);
  }

  strokeRect() {
    var q = this.corners();
    canvas.canvas.stroke(255);
    canvas.canvas.strokeWeight(1);
    this.drawRect([q[0], q[1], q[2], q[3], q[0]], false);
  }
}
