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
	canvas.canvas
	  .stroke(toolbox.palette.colors[toolbox.palette.cur_fg][1]);
	canvas.canvas
	  .fill(toolbox.palette.colors[toolbox.palette.cur_fg][1]);
	canvas.canvas.vertex(this.pt1x, this.pt1y);
	canvas.canvas.vertex(this.pt2x, this.pt2y);
	canvas.canvas.vertex(mouseX-canvas.x, mouseY-canvas.y);
	canvas.canvas.vertex(this.pt3x, this.pt3y);
	canvas.canvas.vertex(this.pt1x, this.pt1y);
	canvas.canvas.endShape();
	this.step = 3;
      } else {
	this.pt3x = mouseX-this.pt2x+this.pt1x-canvas.x;
	this.pt3y = mouseY-this.pt2y+this.pt1y-canvas.y;
	canvas.canvas.updatePixels();
	canvas.canvas.beginShape();
	canvas.canvas.noFill();
	canvas.canvas.vertex(this.pt1x, this.pt1y);
	canvas.canvas.vertex(this.pt2x, this.pt2y);
	canvas.canvas.vertex(mouseX-canvas.x, mouseY-canvas.y);
	canvas.canvas.vertex(this.pt3x, this.pt3y);
	canvas.canvas.vertex(this.pt1x, this.pt1y);
	canvas.canvas.endShape();
      }
    } else if (this.step == 3) {
      if(!mouseIsPressed) {
	this.reset();
      }
    }
  }
}
