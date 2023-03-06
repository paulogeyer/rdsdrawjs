class Text extends Tool {
  constructor() {
    super();
    this.icon = loadImage('icons/text.png');
    this.name = 'freehand';
    this.desc = 'painting tool: TEXT (select with right mousebutton for settings)';
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
