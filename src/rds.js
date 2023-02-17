class RDS extends Tool {
  constructor() {
    super();
    this.icon = loadImage('icons/rds.png');
    this.name = 'rds';
    this.desc = 'RDS GENERATION: make a 3D-Image';
    var startMouseX = -1;
    var startMouseY = -1;
    var drawing = false;
  }

  draw() {
  }
}
