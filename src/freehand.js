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
    var drawing = this.previousMouseX != -1;
    if(mouseIsPressed && (drawing || mouseInCanvas())) {
      var x = mouseX-canvas.x;
      var y = mouseY-canvas.y;
      if(!drawing) {
        this.previousMouseX = x;
        this.previousMouseY = y;
      } else {
        if(mouseButton == RIGHT)
          canvas.canvas.stroke(toolbox.palette.colors[toolbox.palette.cur_bg][1]);
        else
          canvas.canvas.stroke(toolbox.palette.colors[toolbox.palette.cur_fg][1]);
        canvas.canvas.strokeWeight(1);
        canvas.canvas.line(this.previousMouseX, this.previousMouseY, x, y);
        this.previousMouseX = x;
        this.previousMouseY = y;
      }
    } else {
      this.previousMouseX = -1;
      this.previousMouseY = -1;
    }
  }
}
