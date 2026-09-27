class Text extends Tool {
  constructor() {
    super();
    this.icon = loadImage('icons/text.png');
    this.name = 'text';
    this.desc = 'painting tool: TEXT (select with right mousebutton for settings)';
    this.fonts = ['Sans', 'Triplx', 'Euro', 'TriScr', 'Script', 'Compl'];
    this.fontI = 0;
    this.sizeN = 3;
    this.thick = 0;
    this.reset();
  }

  reset() {
    this.step = 0;
    this.str = '';
    this.tx = 0;
    this.ty = 0;
    this.useBg = false;
  }

  cancel() {
    if(this.step > 0)
      canvas.canvas.updatePixels();
    this.reset();
  }

  openSettings() {
    var self = this;
    var snap = {fontI: this.fontI, sizeN: this.sizeN, thick: this.thick};
    openDialog({
      title: 'TEXT',
      group: 'FONT NAME',
      status: 'Select fontname, size and thickness, press [ENTER] when done.',
      radios: this.fonts,
      radio: this.fontI,
      fields: [
        {heading: 'FONTSIZE:'},
        {label: 'Size (0...9):', value: String(this.sizeN), boxed: true},
        {label: 'Thickn. (0...9):', value: String(this.thick), boxed: true}
      ],
      buttons: ['CANCEL'],
      onKey: function(d) {
        if(keyCode == 38)
          self.sizeN = Math.min(9, self.sizeN+1);
        if(keyCode == 40)
          self.sizeN = Math.max(0, self.sizeN-1);
        if(keyCode == 39)
          self.thick = Math.min(9, self.thick+1);
        if(keyCode == 37)
          self.thick = Math.max(0, self.thick-1);
        d.fields[1].value = String(self.sizeN);
        d.fields[2].value = String(self.thick);
      },
      onDigit: function(f, key, fi) {
        var n = Number(key);
        if(fi == 0)
          self.sizeN = n;
        else
          self.thick = n;
        f.value = String(n);
      },
      onAccept: function(d) {
        self.fontI = d.radio;
        closeDialog();
        STATUS_MSG = 'Enter text:';
      },
      onCancel: function() {
        self.fontI = snap.fontI;
        self.sizeN = snap.sizeN;
        self.thick = snap.thick;
      }
    });
  }

  draw() {
    if(this.step == 0) {
      STATUS_MSG = 'Enter text:';
      if(mouseIsPressed && mouseInCanvas()) {
        this.tx = mouseX-canvas.x;
        this.ty = mouseY-canvas.y;
        this.useBg = mouseButton == RIGHT;
        this.str = '';
        this.step = 1;
        pushUndo();
        canvas.canvas.loadPixels();
      }
      return;
    }
    canvas.canvas.updatePixels();
    this.paint(this.str+'_');
  }

  onUndo() {
    this.step = 0;
    this.str = '';
  }

  paint(s) {
    var g = canvas.canvas;
    var font = BGI_FONTS[this.fonts[this.fontI]];
    var scales = [[1,2],[3,5],[2,3],[3,4],[1,1],[4,3],[5,3],[2,1],[5,2],[3,1]];
    var sc = scales[this.sizeN];
    var k = sc[0]/sc[1];
    var c = this.useBg ? toolbox.palette.cur_bg_color() : toolbox.palette.cur_fg_color();
    g.stroke(c);
    g.strokeWeight(Math.max(1, this.thick));
    g.noFill();
    var x = this.tx;
    for(var i = 0; i < s.length; i++) {
      var code = s.charCodeAt(i);
      var glyph = font.glyphs[code];
      if(!glyph) {
        x += 8*k;
        continue;
      }
      var px = x;
      var py = this.ty;
      for(var j = 0; j < glyph.ops.length; j++) {
        var op = glyph.ops[j];
        var nx = x+op[1]*k;
        var ny = this.ty+op[2]*k;
        if(op[0] == 3)
          g.line(px, py, nx, ny);
        px = nx;
        py = ny;
      }
      x += glyph.w*k;
    }
  }

  keyPressed() {
    if(this.step != 1)
      return;
    if(keyCode == 27) {
      this.cancel();
      return;
    }
    if(keyCode == 13) {
      canvas.canvas.updatePixels();
      if(this.str.length) {
        pushUndo();
        this.paint(this.str);
      }
      this.reset();
      return;
    }
    if(keyCode == 8) {
      this.str = this.str.slice(0, -1);
      return;
    }
    if(key && key.length == 1)
      this.str += key;
  }
}
