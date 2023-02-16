
class Rect {
  constructor() {
    this.icon = loadImage('icons/rect.png');
    this.name = 'rect tool';
    var startMouseX = -1;
    var startMouseY = -1;
    var drawing = false;
  }

  draw() {
    if(mousePressed) {
      if(startMouseX == -1){
	startMouseX = mouseX;
	startMouseY = mouseY;
	drawing = true;
	loadPixels();
      } else {
	// draw the line when the user release the mouse button
	updatePixels();
	rect(startMouseX,
	     startMouseY,
	     mouseX-startMouseX,
	     mouseY-startMouseY);
      }
    } else if(drawing) {
      drawing = false;
      startMouseX = -1;
      startMouseY = -1;
    }
  }

  click() {
    if(mouseX > this.x && mouseX < this.x+31 &&
       mouseY > this.y && mouseY < this.y+31)
      console.log("foo");
  }
}
