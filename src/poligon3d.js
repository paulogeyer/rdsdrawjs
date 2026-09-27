class Poligon3d extends Poligon {
  icon = loadImage('icons/poligon3d.png');
  name = '3-D Poligon';
  desc = 'painting tool: 3-D POLIGON';

  constructor() {
    super();
  }

  fillShape() {
    var ids = toolbox.palette.range_ids();
    if(this.useBg)
      ids = ids.reverse();
    var n = this.pts.length;
    var cx = 0;
    var cy = 0;
    for(var i = 0; i < n; i++) {
      cx += this.pts[i][0];
      cy += this.pts[i][1];
    }
    cx /= n;
    cy /= n;
    var bands = ids.length;
    canvas.canvas.noStroke();
    for(var b = 0; b < bands; b++) {
      var t = 1-b/bands;
      canvas.canvas.fill(toolbox.palette.colors[ids[b]][1]);
      canvas.canvas.beginShape();
      for(var i = 0; i < n; i++) {
        canvas.canvas.vertex(cx+(this.pts[i][0]-cx)*t,
                             cy+(this.pts[i][1]-cy)*t);
      }
      canvas.canvas.endShape(CLOSE);
    }
  }
}
