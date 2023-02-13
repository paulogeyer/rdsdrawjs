
class Toolbox {
  constructor() {
    this.tools = [];
    this.selectedTool = null;
  }

  draw() {
    fill(0, 28, 255);
    rect(0, 0, 70, HEIGHT);
    if(this.tools.length > 0) {
      var h = 1;
      for(var i = 0; i < this.tools.length; i++) {
	                          // restart width after two tools
	image(this.tools[i].icon, 2+34*((i+1) % 2 == 0), h);
	// update height after two tools are draw
	if(((i+1) % 2) == 0) {
	  h += 32;
	}
      }
    }
  }

  toolbarItemClick() {
    return false;
  }

  selectTool(tool) {
    this.selectedTool = tool;
  }

  addTool(tool) {
    if(!tool.hasOwnProperty('icon') || !tool.hasOwnProperty('name')) {
      alert("make sure your tool has both a name and an icon");
    }

    this.tools.push(tool);
    if(this.selectedTool == null)
      this.selectTool(tool);
  }

}
