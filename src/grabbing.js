class Grabbing extends Tool {
  constructor() {
    super();
    this.icon = loadImage('icons/grabbing.png');
    this.name = 'grabbing';
    this.desc = 'GRABBING: right-drag to copy, left-click to paste, F2 toggles';
    this.buf = null;
    this.pasteMode = false;
    this.reset();
  }

  reset() {
    this.drag = false;
    this.down = false;
  }

  cancel() {
    if(this.drag)
      canvas.canvas.updatePixels();
    this.reset();
  }

  draw() {
    var x = mouseX-canvas.x;
    var y = mouseY-canvas.y;
    var grab = this.pasteMode ? mouseButton != RIGHT : mouseButton == RIGHT;
    if(mouseIsPressed && (mouseInCanvas() || this.drag)) {
      if(!this.down) {
        this.down = true;
        if(grab) {
          this.drag = true;
          this.x1 = x;
          this.y1 = y;
          canvas.canvas.loadPixels();
        } else if(this.buf) {
          canvas.canvas.image(this.buf, x, y);
        }
      } else if(this.drag) {
        canvas.canvas.updatePixels();
        canvas.canvas.noFill();
        canvas.canvas.stroke(255);
        canvas.canvas.strokeWeight(1);
        canvas.canvas.rect(this.x1, this.y1, x-this.x1, y-this.y1);
      }
    } else if(this.drag || this.down) {
      if(this.drag) {
        var x2 = x;
        var y2 = y;
        canvas.canvas.updatePixels();
        var x0 = Math.min(this.x1, x2);
        var y0 = Math.min(this.y1, y2);
        var w = Math.abs(x2-this.x1);
        var h = Math.abs(y2-this.y1);
        if(w > 1 && h > 1)
          this.buf = canvas.canvas.get(x0, y0, w, h);
      }
      this.reset();
    }
  }

  keyPressed() {
    if(keyCode == 113) {
      this.pasteMode = !this.pasteMode;
      STATUS_MSG = this.pasteMode
        ? 'GRABBING: left-drag copies, right-click pastes'
        : 'GRABBING: right-drag copies, left-click pastes';
    }
  }
}
