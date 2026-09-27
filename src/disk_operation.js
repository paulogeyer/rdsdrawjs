class DiskOperation extends Tool {
  constructor() {
    super();
    this.icon = loadImage('icons/disk_operation.png');
    this.name = 'disk operation';
    this.desc = 'DISK OPERATION: left click saves, right click loads';
  }

  click() {
    if(mouseButton == RIGHT)
      this.loadImageFile();
    else
      this.saveImageFile();
  }

  saveImageFile() {
    var elt = canvas.canvas.elt || canvas.canvas.canvas;
    var a = document.createElement('a');
    a.href = elt.toDataURL('image/png');
    a.download = 'rdsdraw.png';
    a.click();
  }

  loadImageFile() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png,image/*';
    input.onchange = function() {
      if(!input.files || !input.files[0])
        return;
      var url = URL.createObjectURL(input.files[0]);
      loadImage(url, function(img) {
        canvas.canvas.image(img, 0, 0, canvas.w, canvas.h);
        URL.revokeObjectURL(url);
      });
    };
    input.click();
  }
}
