class Grabbing extends Tool {
  constructor() {
    super();
    this.icon = loadImage('icons/grabbing.png');
    this.name = 'freehand';
    this.desc = 'GRABBING: select with right button to grab or with left one to paste - try F2 toggle...';
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
