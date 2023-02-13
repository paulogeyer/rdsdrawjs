
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
	image(this.tools[i].icon, 2+34*(i % 3 == 0), h);
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
