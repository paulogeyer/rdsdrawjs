class Plane extends FlatPlane {
  icon = loadImage('icons/plane.png');
  name = 'Plane';
  desc = 'painting tool: PLANE';

  constructor() {
    super();
  }

  drawFinal() {
    var ids = toolbox.palette.range_ids();
    if(mouseButton == RIGHT)
      ids = ids.reverse();
    var n = ids.length;
    canvas.canvas.noStroke();
    for(var i = 0; i < n; i++) {
      var t0 = i/n;
      var t1 = (i+1)/n;
      var a = this.mix(this.pt1x, this.pt1y, this.pt2x, this.pt2y, t0);
      var b = this.mix(this.pt1x, this.pt1y, this.pt2x, this.pt2y, t1);
      var c = this.mix(this.pt3x, this.pt3y, this.pt4x, this.pt4y, t1);
      var d = this.mix(this.pt3x, this.pt3y, this.pt4x, this.pt4y, t0);
      this.drawRect([a, b, c, d, a], toolbox.palette.colors[ids[i]][1]);
    }
  }

  mix(x0, y0, x1, y1, t) {
    return [x0+(x1-x0)*t, y0+(y1-y0)*t];
  }
}
