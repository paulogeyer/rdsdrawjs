class Freehand extends Tool {
  constructor() {
    super();
    this.icon = loadImage('icons/freehand.png');
    this.name = 'freehand';
    this.desc = 'painting tool: FREHAND DRAWING (select with right mousebutton for settings)';

    this.previousMouseX = -1;
    this.previousMouseY = -1;
  }

  draw() {
    //if the mouse is pressed
    if(mouseIsPressed){
      //check if they previousX and Y are -1. set them to the current
      //mouse X and Y if they are.
      if (this.previousMouseX == -1){
	this.previousMouseX = mouseX;
	this.previousMouseY = mouseY;
      }
      //if we already have values for previousX and Y we can draw a line from 
      //there to the current mouse location
      else {
	push();
	if(mouseButton == RIGHT) {
	  canvas.canvas
	    .stroke(toolbox.palette.colors[toolbox.palette.cur_bg][1]);
	} else {
	  canvas.canvas
	    .stroke(toolbox.palette.colors[toolbox.palette.cur_fg][1]);
	}
	canvas.canvas
	  .strokeWeight(30);
	canvas.canvas
	  .line(this.previousMouseX-canvas.x,
		this.previousMouseY,
		mouseX-canvas.x,
		mouseY);
	this.previousMouseX = mouseX;
	this.previousMouseY = mouseY;
	pop();
      }
    }
    //if the user has released the mouse we want to set the previousMouse values 
    //back to -1.
    //try and comment out these lines and see what happens!
    else{
      this.previousMouseX = -1;
      this.previousMouseY = -1;
    }
  }
}
