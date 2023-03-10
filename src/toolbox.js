
class Toolbox {
  constructor() {
    this.tools = [];
    this.selectedTool = null;
  }

  draw() {
    fill(0, 28, 255);
    // rect(0, 0, 70, HEIGHT);
    if(this.tools.length > 0) {
      for(var i = 0; i < this.tools.length; i++) {
	image(this.tools[i].icon, this.tools[i].x, this.tools[i].y);
	if(this.tools[i] == this.selectedTool && this.selectedTool.name != "rds") {
	  stroke('red');
	  strokeWeight(2);
	  noFill();
	  rect(this.tools[i].x, this.tools[i].y, 31, 31);
	}
      }
    }
  }

  toolbaritemclick() {
    return false;
  }

  selectTool(tool) {
    this.selectedTool = tool;
  }

  addTool(tool) {
    if(!tool.hasOwnProperty('icon') || !tool.hasOwnProperty('name')) {
      alert("make sure your tool has both a name and an icon");
    }

    var toolsn = this.tools.length;
    // set tool x/y coordinates
    tool.x = 32*((toolsn+1) % 2 == 0);
    tool.y = 32*floor(toolsn/2);
    this.tools.push(tool);
    // select tool if none is selected
    if(this.selectedTool == null)
      this.selectTool(tool);
  }
}
