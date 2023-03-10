class Poligon extends Tool {
  icon = loadImage('icons/poligon.png');
  name = 'Poligon';
  desc = 'painting tool: POLIGON';
  pts = [];
  step = 0;
  lastPt = [];

  constructor() {
    super();
  }

  reset() {
    this.step = 0;
    this.pts = [];
  }

  // click() {
  //   window.alert("not implemented");
  // }

  draw() {
    if(this.step == 0 && mouseIsPressed) {
      this.step = 1;
      // this.pts.push([mouseX-canvas.x, mouseY-canvas.y]);
      this.lastPt = [mouseX-canvas.x, mouseY-canvas.y];
      canvas.canvas.loadPixels();
    }

    if(this.step == 1) {
      canvas.canvas.updatePixels();
      if(mouseIsPressed) {
	var npt = [mouseX-canvas.x, mouseY-canvas.y];
	if(npt[0] != this.lastPt[0] && npt[1] != this.lastPt[1])
	  this.pts.push(npt);
	this.lastPt = npt.slice();
	this.drawPoints(this.pts);
      } else {
	var pts = this.pts.slice();
	pts.push([mouseX-canvas.x, mouseY-canvas.y]);
	// console.log(pts);
	// pts.push([mouseX-canvas.x, mouseY-canvas.y]);
	this.drawPoints(pts);
      }
    }
  }

  drawPoints(pts) {
    var n = this.pts.length;

    push();
    canvas.canvas.stroke(255);
    canvas.canvas.strokeWeight(1);
    canvas.canvas.noFill();
    canvas.canvas.beginShape();
    for(var i = 0; i < n; i++) {
      canvas.canvas.vertex(pts[i][0], pts[i][1]);
    }
    canvas.canvas.endShape();
    pop();
  }

  keyPressed() {
    // ESC key pressed
    if(keyCode==27) {
    }      

    // enter key pressed
    if(keyCode==13) {
    }
  }
}
