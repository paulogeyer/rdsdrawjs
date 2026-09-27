class Plane extends FlatPlane {
  icon = loadImage('icons/plane.png');
  name = 'Plane';
  desc = 'painting tool: PLANE (select with right mousebutton for settings)';

  constructor() {
    super();
    this.across = false;
    this.anyDir = false;
    this.finishOnClick = true;
  }

  draw() {
    super.draw();
    if(this.step > 0)
      STATUS_MSG = 'You are drawing with the PLANE-function';
  }

  mousePressed() {
    if(this.waitUp || this.step != 2 || !mouseInCanvas())
      return;
    this.pt4x = mouseX-canvas.x;
    this.pt4y = mouseY-canvas.y;
    this.pt3x = this.pt4x-this.pt2x+this.pt1x;
    this.pt3y = this.pt4y-this.pt2y+this.pt1y;
    this.lockX = this.pt4x;
    this.lockY = this.pt4y;
    canvas.canvas.updatePixels();
    this.drawFinal();
    this.reset();
    this.waitUp = true;
  }

  openSettings() {
    var self = this;
    openDialog({
      title: 'GRADIENT FILLING DIRECTION',
      status: 'Select direction using [SPACE] and press [ENTER] when done.',
      radios: ['allow any direction', 'only parallel to border (90 steps)'],
      radio: this.anyDir ? 0 : 1,
      buttons: ['CANCEL'],
      onAccept: function(d) {
        self.anyDir = d.radio == 0;
        closeDialog();
      }
    });
  }

  axis() {
    if(this.anyDir) {
      var cx = (this.pt1x+this.pt2x+this.pt3x+this.pt4x)/4;
      var cy = (this.pt1y+this.pt2y+this.pt3y+this.pt4y)/4;
      var ax = (this.lockX != null ? this.lockX : this.pt4x)-cx;
      var ay = (this.lockY != null ? this.lockY : this.pt4y)-cy;
      return [ax, ay];
    }
    return [this.pt1x-this.pt2x, this.pt1y-this.pt2y];
  }

  drawFinal() {
    pushUndo();
    this.paint();
  }

  paint() {
    var ids = toolbox.palette.range_ids();
    if(mouseButton == RIGHT)
      ids = ids.reverse();
    var a = this.axis();
    var len = Math.hypot(a[0], a[1]) || 1;
    paintLinearPoly(canvas.canvas, [
      [this.pt1x, this.pt1y],
      [this.pt2x, this.pt2y],
      [this.pt4x, this.pt4y],
      [this.pt3x, this.pt3y]
    ], a[0]/len, a[1]/len, ids);
  }

  mix(x0, y0, x1, y1, t) {
    return [x0+(x1-x0)*t, y0+(y1-y0)*t];
  }
}
