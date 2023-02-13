
class Toolbox {
  constructor() {
    this.tools = [];
    this.selectedTool = null;
  }

  draw() {
    fill(0, 28, 255);
    rect(0, 0, 70, HEIGHT);
    if(this.tools.length > 0) {
      for(var i = 0; i < this.tools.length; i++) {
	image(this.tools[i].icon, 0, 0);
      }
    }
  }

  toolbarItemClick() {
    return false;
  }

  addToolIcon(icon, name) {
    // nothing yet
    return false;
  }

  selectTool(name) {
    return false;
  }

  addTool(tool) {
    if(!tool.hasOwnProperty('icon') || !tool.hasOwnProperty('name')) {
      alert("make sure your tool has both a name and an icon");
    }

    this.tools.push(tool);
    this.addToolIcon(tool.icon, tool.name);
    if(this.selectedTool == null)
      this.selectTool(tool.name);
  }

}
