class FlatPlane extends Tool {
  constructor() {
    super();
    this.icon = loadImage('icons/flat_plane.png');
    this.name = 'flat plane';
    this.desc = 'painting tool: FLAT PLANE';
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
}
