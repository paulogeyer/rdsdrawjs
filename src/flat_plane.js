class FlatPlane extends Tool {
  constructor() {
    super();
    this.icon = loadImage('icons/flat_plane.png');
    this.name = 'flat plane';
    this.desc = 'painting tool: FLAT PLANE';
    this.reset();
  }

  reset() {
    this.pt1x = -1;
    this.pt1y = -1;
    this.pt2x = -1;
    this.pt2y = -1;
    this.pt3x = -1;
    this.pt3y = -1;
    this.step = 0;
  }

  draw() {
    if(this.step == 0) {
      if(mouseIsPressed) {
	this.pt1x = mouseX-canvas.x;
	this.pt1y = mouseY-canvas.y;
	this.step = 1;
	canvas.canvas.loadPixels();
      }
    } else if (this.step == 1) {
      if(mouseIsPressed) {
	this.pt2x = mouseX-canvas.x;
	this.pt2y = mouseY-canvas.y;
	// draw the line when the user release the mouse button
	canvas.canvas.updatePixels();
	// canvas.canvas.noStroke();
	canvas.canvas.strokeWeight(2);
	canvas.canvas.stroke(255);
	canvas.canvas.line(this.pt1x,
			   this.pt1y,
			   this.pt2x,
			   this.pt2y);
      } else {
	this.step = 2;
	canvas.canvas.loadPixels();
      }
    } else if (this.step == 2) {
      if(mouseIsPressed) {
	canvas.canvas.beginShape();
	this.drawRect([[this.pt1x, this.pt1y],
		       [this.pt2x, this.pt2y],
		       [mouseX-canvas.x, mouseY-canvas.y],
		       [this.pt3x, this.pt3y],
		       [this.pt1x, this.pt1y]],
		      true);
	this.step = 3;
      } else {
	this.pt3x = mouseX-this.pt2x+this.pt1x-canvas.x;
	this.pt3y = mouseY-this.pt2y+this.pt1y-canvas.y;
	canvas.canvas.updatePixels();
	this.drawRect([[this.pt1x, this.pt1y],
		       [this.pt2x, this.pt2y],
		       [mouseX-canvas.x, mouseY-canvas.y],
		       [this.pt3x, this.pt3y],
		       [this.pt1x, this.pt1y]],
		      true);
      }
    } else if (this.step == 3) {
      if(!mouseIsPressed) {
	this.drawRect([[this.pt1x, this.pt1y],
		       [this.pt2x, this.pt2y],
		       [mouseX-canvas.x, mouseY-canvas.y],
		       [this.pt3x, this.pt3y],
		       [this.pt1x, this.pt1y]]);
	this.reset();
      }
    }
  }

  drawRect(pts, fill=false) {
    push();

    if(fill) {
      canvas.canvas
	.stroke(toolbox.palette.colors[toolbox.palette.cur_fg][1]);
      canvas.canvas
	.fill(toolbox.palette.colors[toolbox.palette.cur_fg][1]);
    } else {
      canvas.canvas.noFill();
    }

    canvas.canvas.beginShape();
    for(var i = 0; i < pts.length; i++)
      canvas.canvas.vertex(pts[i][0], pts[i][1]);
    canvas.canvas.endShape();

    pop();
  }
}
