class Text extends Tool {
  constructor() {
    super();
    this.icon = loadImage('icons/text.png');
    this.name = 'text';
    this.desc = 'painting tool: TEXT (type, Enter to draw, Esc to cancel)';
    this.reset();
  }

  reset() {
    this.step = 0;
    this.str = '';
    this.tx = 0;
    this.ty = 0;
    this.useBg = false;
  }

  cancel() {
    if(this.step > 0)
      canvas.canvas.updatePixels();
    this.reset();
  }

  draw() {
    if(this.step == 0) {
      if(mouseIsPressed && mouseInCanvas()) {
        this.tx = mouseX-canvas.x;
        this.ty = mouseY-canvas.y;
        this.useBg = mouseButton == RIGHT;
        this.str = '';
        this.step = 1;
        canvas.canvas.loadPixels();
      }
      return;
    }
    canvas.canvas.updatePixels();
    this.paint(this.str+'_');
  }

  paint(s) {
    canvas.canvas.noStroke();
    canvas.canvas.fill(this.useBg ? toolbox.palette.cur_bg_color()
                                  : toolbox.palette.cur_fg_color());
    canvas.canvas.textFont(fontIBM);
    canvas.canvas.textSize(16);
    canvas.canvas.textAlign(LEFT, BASELINE);
    canvas.canvas.text(s, this.tx, this.ty);
  }

  keyPressed() {
    if(this.step != 1)
      return;
    if(keyCode == 27) {
      this.cancel();
      return;
    }
    if(keyCode == 13) {
      canvas.canvas.updatePixels();
      if(this.str.length)
        this.paint(this.str);
      this.reset();
      return;
    }
    if(keyCode == 8) {
      this.str = this.str.slice(0, -1);
      return;
    }
    if(key && key.length == 1)
      this.str += key;
  }
}
