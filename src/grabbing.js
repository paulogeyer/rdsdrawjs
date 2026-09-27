class Grabbing extends Tool {
  constructor() {
    super();
    this.icon = loadImage('icons/grabbing.png');
    this.name = 'grabbing';
    this.desc = 'GRABBING: select with right button to grab or with left one to paste - try F2 toggle...';
    this.buf = null;
    this.mode = 'paste';
    this.overwrite = 'SMART-OVERWRITE';
    this.reset();
  }

  reset() {
    this.drag = false;
    this.down = false;
    this.cut = false;
  }

  cancel() {
    if(this.drag)
      canvas.canvas.updatePixels();
    this.reset();
  }

  setMode(mode) {
    if(mode == 'paste' && !this.buf)
      mode = 'copy';
    this.mode = mode;
    STATUS_MSG = 'Grabbing toggle changed to: ' + (mode == 'copy' ? 'COPY/CUT' : 'PASTE');
  }

  draw() {
    var x = mouseX-canvas.x;
    var y = mouseY-canvas.y;
    if(this.mode == 'paste' && mouseIsPressed && mouseInCanvas() && mouseButton == RIGHT)
      STATUS_MSG = 'You are drawing with the '+(this.overwrite)+'-function';
    if(this.mode == 'copy') {
      if(mouseIsPressed && (mouseInCanvas() || this.drag)) {
        if(!this.down) {
          this.down = true;
          this.drag = true;
          this.cut = mouseButton == RIGHT;
          this.x1 = x;
          this.y1 = y;
          canvas.canvas.loadPixels();
        } else {
          canvas.canvas.updatePixels();
          canvas.canvas.noFill();
          canvas.canvas.stroke(255);
          canvas.canvas.strokeWeight(1);
          canvas.canvas.rect(this.x1, this.y1, x-this.x1, y-this.y1);
        }
      } else if(this.drag) {
        canvas.canvas.updatePixels();
        var x0 = Math.min(this.x1, x);
        var y0 = Math.min(this.y1, y);
        var w = Math.abs(x-this.x1);
        var h = Math.abs(y-this.y1);
        if(w > 1 && h > 1) {
          this.buf = canvas.canvas.get(x0, y0, w, h);
          if(this.cut) {
            pushUndo();
            canvas.canvas.noStroke();
            canvas.canvas.fill(toolbox.palette.cur_bg_color());
            canvas.canvas.rect(x0, y0, w, h);
            STATUS_MSG = 'You are drawing with the OVERWRITE-ALWAYS-function';
          }
          this.setMode('paste');
        }
        this.reset();
      }
      return;
    }

    if(mouseIsPressed && mouseInCanvas() && this.buf && !this.down) {
      this.down = true;
      if(mouseButton == RIGHT) {
        this.overwrite = 'SMART-OVERWRITE';
        STATUS_MSG = 'You are drawing with the SMART-OVERWRITE-function';
        this.pasteClear(x, y);
      } else {
        this.paste(x, y);
      }
    }
    if(!mouseIsPressed)
      this.down = false;
  }

  paste(x, y) {
    pushUndo();
    canvas.canvas.image(this.buf, x, y);
  }

  pasteClear(x, y) {
    pushUndo();
    var img = this.buf;
    img.loadPixels();
    var bg = toolbox.palette.cur_bg_color().levels;
    var g = canvas.canvas;
    g.loadPixels();
    for(var py = 0; py < img.height; py++) {
      for(var px = 0; px < img.width; px++) {
        var i = 4*(px+py*img.width);
        if(this.overwrite == 'SMART-OVERWRITE' &&
           img.pixels[i] == bg[0] && img.pixels[i+1] == bg[1] && img.pixels[i+2] == bg[2])
          continue;
        g.set(x+px, y+py, toolbox.palette.cur_bg_color());
      }
    }
    g.updatePixels();
  }

  keyPressed() {
    if(keyCode == 113)
      this.setMode(this.mode == 'paste' ? 'copy' : 'paste');
  }
}
