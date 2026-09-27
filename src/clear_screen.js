class ClearScreen extends Tool {
  constructor() {
    super();
    this.icon = loadImage('icons/clear_screen.png');
    this.name = 'clear screen';
    this.desc = 'CLEAR SCREEN: fills the whole screen with the current background color';
    var startMouseX = -1;
    var startMouseY = -1;
    var drawing = false;
  }

  click() {
    if(toolbox.selectedTool && toolbox.selectedTool.reset)
      toolbox.selectedTool.reset();
    cImg = undefined;
    canvas.canvas.background(toolbox.palette.colors[toolbox.palette.cur_bg][1]);
  }
}
