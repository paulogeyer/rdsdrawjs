class FlatPlane extends Tool {
  constructor() {
    super();
    this.icon = loadImage('icons/flat_plane.png');
    this.name = 'flat plane';
    this.desc = 'painting tool: FLAT PLANE';
    this.pt1x = -1;
    this.pt1y = -1;
    this.pt2x = -1;
    this.pt2y = -1;
    this.drawing = false;
    this.step = 0;
  }

  draw() {
    if(this.step == 0) {
      if(mouseIsPressed) {
	this.pt1x = mouseX;
	this.pt1y = mouseY;
	this.drawing = true;
	this.step = 1;
	canvas.canvas.loadPixels();
      }
    } else if (this.step == 1) {
      if(mouseIsPressed) {
	// draw the line when the user release the mouse button
	canvas.canvas.updatePixels();
	// canvas.canvas.noStroke();
	canvas.canvas.strokeWeight(2);
	canvas.canvas.stroke(
	  toolbox.palette.colors[toolbox.palette.cur_fg][1]);
	canvas.canvas.line(this.pt1x-canvas.x,
			   this.pt1y,
			   mouseX-canvas.x,
			   mouseY);
	this.pt2x = mouseX;
	this.pt2y = mouseY;

	// canvas.canvas.rect(this.startMouseX-canvas.x,
	// 		   this.startMouseY,
	// 		   mouseX-this.startMouseX,
	// 		   mouseY-this.startMouseY);
      } else {
	this.step = 2;
      }
    } else if (this.step == 2) {
      var pt3x = mouseX+this.pt2x-canvas.x-this.pt1x-canvas.x;
      var pt3y = mouseY+this.pt2y-this.pt1y-canvas.y;
      canvas.canvas.updatePixels();
      canvas.canvas.beginShape();
      canvas.canvas.noFill();
      canvas.canvas.vertex(this.pt1x-canvas.x, this.pt1y-canvas.y);
      canvas.canvas.vertex(this.pt2x-canvas.x, this.pt2y);
      canvas.canvas.vertex(mouseX-canvas.x, mouseY-canvas.y);
      canvas.canvas.vertex(pt3x, pt3y);
      canvas.canvas.endShape();
    }

    // } else if (this.drawing && this.step == 1) {
    //   var pt3x = this.pt2x-canvas.x-this.pt1x-canvas.x;
    //   var pt3y = this.pt2y-this.pt1y-canvas.y;
    //   canvas.canvas.updatePixels();
    //   canvas.canvas.beginShape();
    //   canvas.canvas.vertex(this.pt1x-canvas.x, this.pt1y-canvas.y);
    //   canvas.canvas.vertex(this.pt2x-canvas.x, this.pt2y);
    //   canvas.canvas.vertex(mouseX-canvas.x, mouseY-canvas.y);
    //   canvas.canvas.vertex(pt3x, pt3y);
    //   canvas.canvas.endShape();
    // } else if(this.drawing) {
    //   this.drawing = false;
    //   this.step = 0;
    //   this.pt1x = -1;
    //   this.pt1y = -1;
    //   this.pt2x = -1;
    //   this.pt2y = -1;
    // }
  }
}
