class Pyramid extends FlatPlane {
  icon = loadImage('icons/pyramid.png');
  name = 'Pyramid';
  desc = 'painting tool: PYRAMID';

  constructor() {
    super();
  }

  drawFinal() {
    canvas.canvas.loadPixels();
    var ids = toolbox.palette.range_ids();

    // revert color order if right button is cicked
    if(mouseButton == RIGHT)
      ids = ids.reverse();

    var l = ids.length;
    var maxX = this.maxX();
    var minX = this.minX();
    var midX = (minX+maxX)/2.0;
    var lX = maxX-minX;
    var maxY = this.maxY();
    var minY = this.minY();
    var midY = (minY+maxY)/2.0;
    var lY = maxY-minY;

    push();
    for(var i = 0; i < l; i++) {
      var ratio = i/(l+1);
      var c = toolbox.palette.colors[ids[i]][1];
      var coords = [[this.pt1x+(midX-this.pt1x)*ratio,
		      this.pt1y+(midY-this.pt1y)*ratio],
		     [this.pt2x+(midX-this.pt2x)*ratio,
		      this.pt2y+(midY-this.pt2y)*ratio],
		     [this.pt4x+(midX-this.pt4x)*ratio,
		      this.pt4y+(midY-this.pt4y)*ratio],
		    [this.pt3x+(midX-this.pt3x)*ratio,
		     this.pt3y+(midY-this.pt3y)*ratio],
		    [this.pt1x+(midX-this.pt1x)*ratio,
		     this.pt1y+(midY-this.pt1y)*ratio]];
      this.drawRect(coords,
	       c);
    }
    pop();
  }

  maxX() {
    return [this.pt1x, this.pt2x, this.pt3x, this.pt4x].reduce((a,b) => Math.max(a,b), -Infinity)
  }

  minX() {
    return [this.pt1x, this.pt2x, this.pt3x, this.pt4x].reduce((a,b) => Math.min(a,b), Infinity);
  }

  maxY() {
    return [this.pt1y, this.pt2y, this.pt3y, this.pt4y].reduce((a,b) => Math.max(a,b), -Infinity);
  }

  minY() {
    return [this.pt1y, this.pt2y, this.pt3y, this.pt4y].reduce((a,b) => Math.min(a,b), Infinity);
  }
}
