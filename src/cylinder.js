class Cylinder extends Plane {
  icon = loadImage('icons/cylinder.png');
  name = 'Cylinder';
  desc = 'painting tool: CYLINDER';

  reset() {
    super.reset();
    this.held = false;
  }

  draw() {
    if(this.step == 0) {
      if(mouseIsPressed && mouseInCanvas()) {
        this.pt1x = mouseX-canvas.x;
        this.pt1y = mouseY-canvas.y;
        this.step = 1;
        this.held = true;
        canvas.canvas.loadPixels();
      }
    } else if(this.step == 1) {
      if(mouseIsPressed) {
        this.pt2x = mouseX-canvas.x;
        this.pt2y = mouseY-canvas.y;
        canvas.canvas.updatePixels();
        canvas.canvas.stroke(255);
        canvas.canvas.strokeWeight(2);
        canvas.canvas.line(this.pt1x, this.pt1y, this.pt2x, this.pt2y);
      } else if(this.pt2x != -1) {
        this.step = 2;
        this.held = false;
      } else {
        this.reset();
      }
    } else if(this.step == 2) {
      canvas.canvas.updatePixels();
      canvas.canvas.stroke(255);
      canvas.canvas.strokeWeight(2);
      canvas.canvas.line(this.pt1x, this.pt1y, this.pt2x, this.pt2y);
      if(!mouseIsPressed)
        this.held = false;
      else if(!this.held && mouseInCanvas()) {
        this.held = true;
        this.step = 3;
      }
    } else if(this.step == 3) {
      this.pt4x = mouseX-canvas.x;
      this.pt4y = mouseY-canvas.y;
      this.pt3x = this.pt4x-this.pt2x+this.pt1x;
      this.pt3y = this.pt4y-this.pt2y+this.pt1y;
      canvas.canvas.updatePixels();
      if(!mouseIsPressed) {
        this.held = false;
        canvas.canvas.stroke(255);
        canvas.canvas.strokeWeight(2);
        this.drawRect([[this.pt1x, this.pt1y],
                       [this.pt2x, this.pt2y],
                       [this.pt4x, this.pt4y],
                       [this.pt3x, this.pt3y],
                       [this.pt1x, this.pt1y]],
                      false);
      } else if(!this.held) {
        canvas.canvas.noStroke();
        this.drawFinal();
        this.reset();
      } else {
        canvas.canvas.stroke(255);
        canvas.canvas.strokeWeight(2);
        this.drawRect([[this.pt1x, this.pt1y],
                       [this.pt2x, this.pt2y],
                       [this.pt4x, this.pt4y],
                       [this.pt3x, this.pt3y],
                       [this.pt1x, this.pt1y]],
                      false);
      }
    }
  }
}
