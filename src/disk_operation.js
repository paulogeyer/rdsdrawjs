class DiskOperation extends Tool {
  constructor() {
    super();
    this.icon = loadImage('icons/disk_operation.png');
    this.name = 'disk operation';
    this.desc = 'DISK OPERATION: load/save image';
    this.filename = 'image';
    this.naming = false;
    this.boxed = false;
    this.boxing = false;
    this.pending = null;
  }

  click() {
    toolbox.selectTool(this);
    this.openDialog();
  }

  openSettings() {
    this.openDialog();
  }

  openDialog() {
    var self = this;
    openDialog({
      title: 'LOAD/SAVE TARGA IMAGE',
      status: 'Enter name of TARGA-image and click on LOAD/SAVE',
      lines: ['(.TGA will be added)'],
      checks: [{
        label: 'use boxed loading/saving function',
        on: this.boxed,
        toggle: function(on) { self.boxed = on; }
      }],
      fields: [{label: 'FILENAME: ', value: this.filename}],
      buttons: ['LOAD', 'SAVE', 'PICK', 'CANCEL'],
      onKey: function(d) {
        if(keyCode == 8)
          self.filename = self.filename.slice(0, -1);
        else if(key && key.length == 1 && key != ' ' && self.filename.length < 8)
          self.filename += key;
        d.fields[0].value = self.filename;
      },
      onButton: function(name) {
        closeDialog();
        if(name == 'SAVE')
          self.beginSave(false);
        else
          self.loadImageFile();
      }
    });
  }

  draw() {
    if(!this.boxing || !mouseIsPressed)
      return;
    if(!this.down) {
      this.down = true;
      this.x1 = mouseX-canvas.x;
      this.y1 = mouseY-canvas.y;
      canvas.canvas.loadPixels();
    }
    canvas.canvas.updatePixels();
    canvas.canvas.noFill();
    canvas.canvas.stroke(255);
    canvas.canvas.strokeWeight(1);
    canvas.canvas.rect(this.x1, this.y1, mouseX-canvas.x-this.x1, mouseY-canvas.y-this.y1);
  }

  beginSave(rds) {
    this.pending = rds ? 'rds' : 'depth';
    if(this.boxed) {
      this.boxing = true;
      this.down = false;
      STATUS_MSG = 'Select range of picture to save.';
      return;
    }
    this.writeTGA(0, 0, canvas.w, canvas.h);
  }

  mouseReleasedBox() {
    if(!this.boxing || !this.down)
      return;
    var x2 = mouseX-canvas.x;
    var y2 = mouseY-canvas.y;
    canvas.canvas.updatePixels();
    var x0 = Math.max(0, Math.min(this.x1, x2));
    var y0 = Math.max(0, Math.min(this.y1, y2));
    var w = Math.min(canvas.w-x0, Math.abs(x2-this.x1));
    var h = Math.min(canvas.h-y0, Math.abs(y2-this.y1));
    var mode = this.boxing;
    this.boxing = false;
    this.down = false;
    if(w < 2 || h < 2)
      return;
    if(mode == 'load' && this.pendingImg) {
      pushUndo();
      canvas.canvas.image(this.pendingImg, x0, y0, w, h);
      this.pendingImg = null;
      STATUS_MSG = 'Loading...';
    } else {
      this.writeTGA(x0, y0, w, h);
    }
  }

  writeTGA(x, y, w, h) {
    var src = this.pending == 'rds' && cImg ? cImg : canvas.canvas;
    saveTGAImage(src, x, y, w, h, this.filename);
  }

  loadImageFile() {
    var input = document.createElement('input');
    var self = this;
    input.type = 'file';
    input.accept = '.tga,image/png,image/*';
    input.onchange = function() {
      if(!input.files || !input.files[0])
        return;
      var file = input.files[0];
      var reader = new FileReader();
      reader.onload = function() {
        var buf = new Uint8Array(reader.result);
        if(file.name.toLowerCase().endsWith('.tga') || buf[2] == 2 || buf[2] == 3) {
          self.takeImage(self.tgaImage(buf));
          return;
        }
        var url = URL.createObjectURL(file);
        loadImage(url, function(img) {
          URL.revokeObjectURL(url);
          self.takeImage(img);
        });
      };
      reader.readAsArrayBuffer(file);
    };
    input.click();
  }

  tgaImage(buf) {
    var type = buf[2];
    var bpp = buf[16];
    var gray = (type == 3 && bpp == 8) || (type == 2 && bpp == 8);
    if(!(type == 2 && bpp == 24) && !gray)
      return null;
    var w = buf[12]|(buf[13]<<8);
    var h = buf[14]|(buf[15]<<8);
    var img = createImage(w, h);
    img.loadPixels();
    var o = 18+(buf[0]||0);
    for(var row = h-1; row >= 0; row--) {
      for(var col = 0; col < w; col++) {
        var i = 4*(col+row*w);
        if(gray) {
          var v = buf[o++];
          img.pixels[i] = v;
          img.pixels[i+1] = v;
          img.pixels[i+2] = v;
        } else {
          img.pixels[i+2] = buf[o++];
          img.pixels[i+1] = buf[o++];
          img.pixels[i] = buf[o++];
        }
        img.pixels[i+3] = 255;
      }
    }
    img.updatePixels();
    return img;
  }

  takeImage(img) {
    if(!img)
      return;
    if(this.boxed) {
      this.pendingImg = img;
      this.boxing = 'load';
      this.down = false;
      STATUS_MSG = 'Select range to load picture in.';
      return;
    }
    pushUndo();
    canvas.canvas.image(img, 0, 0, canvas.w, canvas.h);
    STATUS_MSG = 'Loading...';
  }
}

function saveTGAImage(src, x, y, w, h, filename) {
  src.loadPixels();
  var sw = src.width;
  var bytes = new Uint8Array(18+w*h*3);
  bytes[2] = 2;
  bytes[12] = w&255;
  bytes[13] = (w>>8)&255;
  bytes[14] = h&255;
  bytes[15] = (h>>8)&255;
  bytes[16] = 24;
  var o = 18;
  for(var row = h-1; row >= 0; row--) {
    for(var col = 0; col < w; col++) {
      var i = 4*((x+col)+(y+row)*sw);
      bytes[o++] = src.pixels[i+2];
      bytes[o++] = src.pixels[i+1];
      bytes[o++] = src.pixels[i];
    }
  }
  var blob = new Blob([bytes], {type: 'image/x-tga'});
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = String(filename || 'image').replace(/\.tga$/i, '')+'.tga';
  a.click();
  STATUS_MSG = 'IMAGE SUCCESSFULLY SAVED';
}
