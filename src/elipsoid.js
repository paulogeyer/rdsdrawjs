class Elipsoid extends Circle {
  constructor() {
    super();
    this.icon = loadImage('icons/elipsoid.png');
    this.name = 'Elipsoid';
    this.desc = 'painting tool: ELIPSOID';
    this.reset();
  }

  drawFinal() { 
    var ids = toolbox.palette.range_ids();

    // revert color order if right button is cicked
    if(mouseButton == RIGHT)
      ids = ids.reverse();

    var l = ids.length;
    push();
    canvas.canvas.noStroke();

    for(var i = 0; i < l; i++) {
      var ratio = 1-i/l;
      canvas.canvas.fill(
	toolbox.palette.colors[ids[i]][1]);
      canvas.canvas.ellipse((this.pt1x),
			    this.pt1y,
			    ratio*this.pt2x,
			    ratio*this.pt2y);
    }
    pop();
  }
}
