class Poligon extends Tool {
  constructor() {
    super();
    this.icon = loadImage('icons/poligon.png');
    this.name = 'Poligon';
    this.desc = 'painting tool: POLIGON';
    var startMouseX = -1;
    var startMouseY = -1;
    var drawing = false;
  }

  draw() {
  }
}
