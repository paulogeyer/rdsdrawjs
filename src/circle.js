class Circle extends Tool {
  icon = loadImage('icons/circle.png');
  name = 'circle';
  desc = 'painting tool: CIRCLE';

  constructor() {
    super();
    this.reset();
  }

  reset() {
    this.pt1x = -1;
    this.pt1y = -1;
    this.drawing = false;
  }

  draw() {
    if(mouseIsPressed) {
      if(this.pt1x == -1){
	this.pt1x = mouseX-canvas.x;
	this.pt1y = mouseY;
	this.drawing = true;
	canvas.canvas.loadPixels();
      } else {
	this.pt2x = 2*(mouseX-canvas.x-this.pt1x);
	this.pt2y = 2*(mouseY-this.pt1y);

	// draw the line when the user release the mouse button
	canvas.canvas.updatePixels();
	canvas.canvas.stroke(255);
	canvas.canvas.strokeWeight(1);
	canvas.canvas.noFill();
	canvas.canvas.ellipse(this.pt1x,
			      this.pt1y,
			      this.pt2x,
			      this.pt2y);
      }
    } else if(this.drawing) {
      canvas.canvas.updatePixels();
      this.drawFinal();
      this.reset();
    }
  }

  drawFinal() {
    push();
    canvas.canvas.noStroke();

    if(mouseButton == RIGHT) {
      canvas.canvas.fill(
	toolbox.palette.colors[toolbox.palette.cur_bg][1]);
    } else {
      canvas.canvas.fill(
	toolbox.palette.colors[toolbox.palette.cur_fg][1]);
    }

    canvas.canvas.ellipse(this.pt1x,
			  this.pt1y,
			  (this.pt2x),
			  (this.pt2y));
    pop();
  }
}
