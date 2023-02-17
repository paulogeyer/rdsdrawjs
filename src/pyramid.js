class Pyramid extends Tool {
  constructor() {
    super();
    this.icon = loadImage('icons/pyramid.png');
    this.name = 'Pyramid';
    this.desc = 'painting tool: PYRAMID';
    var startMouseX = -1;
    var startMouseY = -1;
    var drawing = false;
  }

  draw() {
  }
}
