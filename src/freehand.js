class Freehand extends Tool {
  constructor() {
    super();
    this.icon = loadImage('icons/freehand.png');
    this.name = 'freehand';
    this.desc = 'painting tool: FREHAND DRAWING (select with right mousebutton for settings)';
    var startMouseX = -1;
    var startMouseY = -1;
    var drawing = false;
  }

  draw() {
  }
}
