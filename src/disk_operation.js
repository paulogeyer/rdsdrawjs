class DiskOperation extends Tool {
  constructor() {
    super();
    this.icon = loadImage('icons/disk_operation.png');
    this.name = 'disk operation';
    this.desc = 'DISK OPERATION: load/save image';
    var startMouseX = -1;
    var startMouseY = -1;
    var drawing = false;
  }

  click() {
    window.alert("not implemented");
  }
}
