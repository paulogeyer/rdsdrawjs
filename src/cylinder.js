class Cylinder extends Tool {
  constructor() {
    super();
    this.icon = loadImage('icons/cylinder.png');
    this.name = 'Cylinder';
    this.desc = 'paiting tool: CYLINDER (select with right mousebutton for settings)';
    var startMouseX = -1;
    var startMouseY = -1;
    var drawing = false;
  }

  click() {
    window.alert("not implemented");
  }

  draw() {
  }
}
