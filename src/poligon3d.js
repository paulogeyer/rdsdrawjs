class Poligon3d extends Tool {
  constructor() {
    super();
    this.icon = loadImage('icons/poligon3d.png');
    this.name = '3-D Poligon';
    this.desc = 'paiting tool: 3-D POLIGON';
    var startMouseX = -1;
    var startMouseY = -1;
    var drawing = false;
  }

  draw() {
  }
}
