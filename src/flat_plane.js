class FlatPlane extends Tool {


  constructor() {
    super();
    this.icon = loadImage('icons/flat_plane.png');
    this.name = 'flat plane';
    this.desc = 'painting tool: FLAT PLANE';
    this.startMouseX = -1;
    this.startMouseY = -1;
    this.drawing = false;
  }

  draw() {
    if(mouseIsPressed) {
      if(this.startMouseX == -1){
	this.startMouseX = mouseX;
	this.startMouseY = mouseY;
	this.drawing = true;
	canvas.canvas.loadPixels();
      } else {
	// draw the line when the user release the mouse button
	canvas.canvas.updatePixels();
	canvas.canvas.noStroke();
	canvas.canvas.fill(
	  toolbox.palette.colors[toolbox.palette.cur_fg][1]);
	canvas.canvas.rect(this.startMouseX-canvas.x,
			   this.startMouseY,
			   mouseX-this.startMouseX,
			   mouseY-this.startMouseY);
      }
    } else if(this.drawing) {
      this.drawing = false;
      this.startMouseX = -1;
      this.startMouseY = -1;
    }
  }
}
