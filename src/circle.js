
class Circle extends Tool {
  constructor() {
    super();
    this.icon = loadImage('icons/circle.png');
    this.name = 'circle';
    this.desc = 'painting tool: CIRCLE';
    var startMouseX = -1;
    var startMouseY = -1;
    var drawing = false;
  }

  draw() {
  }
}
