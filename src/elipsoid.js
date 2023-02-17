class Elipsoid extends Tool {
  constructor() {
    super();
    this.icon = loadImage('icons/elipsoid.png');
    this.name = 'Elipsoid';
    this.desc = 'painting tool: ELIPSOID';
    var startMouseX = -1;
    var startMouseY = -1;
    var drawing = false;
  }

  draw() {
  }
}
