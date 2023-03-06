class Plane extends Tool {
  constructor() {
    super();
    this.icon = loadImage('icons/plane.png');
    this.name = 'Plane';
    this.desc = 'paiting tool: PLANE (select with right mousebutton for settings)';
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
